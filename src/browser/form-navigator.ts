import puppeteer, { type Browser, type Page } from "@cloudflare/puppeteer";
import type { Env } from "../types";

// ─── PM Kisan Status Info ────────────────────────────────────────────
export interface StatusInfo {
  found: boolean;
  status: string;
  lastPayment: string | null;
  amount: string | null;
  summaryHindi: string;
}

// ─── PM Kisan Form Navigator ─────────────────────────────────────────
// Automates the PM Kisan Yojana registration form using Puppeteer
// via Cloudflare Browser Rendering.
export class PMKisanNavigator {
  private env: Env;
  private browser: Browser | null = null;
  private page: Page | null = null;

  // PM Kisan URLs
  private static readonly BASE_URL = "https://pmkisan.gov.in";
  private static readonly REGISTRATION_URL = "https://pmkisan.gov.in/registrationformnew.aspx";
  private static readonly STATUS_URL = "https://pmkisan.gov.in/beneficiarystatus.aspx";

  // Timeouts
  private static readonly NAV_TIMEOUT = 30_000;
  private static readonly SELECTOR_TIMEOUT = 10_000;
  private static readonly DROPDOWN_LOAD_TIMEOUT = 5_000;

  constructor(env: Env) {
    this.env = env;
  }

  // ─── Launch Browser ────────────────────────────────────────────────
  async launch(): Promise<void> {
    this.browser = await puppeteer.launch(this.env.BROWSER);
    this.page = await this.browser.newPage();

    // Set viewport to standard desktop
    await this.page.setViewport({ width: 1280, height: 900 });

    // Set user agent to avoid headless detection
    await this.page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Set Hindi language preference
    await this.page.setExtraHTTPHeaders({
      "Accept-Language": "hi-IN,hi;q=0.9,en-IN;q=0.8,en;q=0.7",
    });
  }

  // ─── Navigate to Registration Form ────────────────────────────────
  async navigateToRegistration(): Promise<void> {
    if (!this.page) throw new Error("Browser not launched");

    await this.page.goto(PMKisanNavigator.REGISTRATION_URL, {
      waitUntil: "networkidle0",
      timeout: PMKisanNavigator.NAV_TIMEOUT,
    });

    // Wait for the form to be visible
    await this.page.waitForSelector("form", {
      timeout: PMKisanNavigator.SELECTOR_TIMEOUT,
    });
  }

  // ─── Fill a Form Field ─────────────────────────────────────────────
  async fillFormField(
    fieldName: string,
    value: string,
    fieldType: string
  ): Promise<void> {
    if (!this.page) throw new Error("Browser not launched");

    // Map our field names to actual form selectors
    const selector = this.getFieldSelector(fieldName);

    switch (fieldType) {
      case "text":
        await this.fillTextField(selector, value);
        break;
      case "dropdown":
        await this.selectDropdownOption(selector, value, fieldName);
        break;
      case "radio":
        await this.selectRadioOption(selector, value);
        break;
      case "checkbox":
        await this.toggleCheckbox(selector);
        break;
      default:
        await this.fillTextField(selector, value);
    }

    // Small delay to let any dependent fields load
    await this.page.waitForTimeout(500);
  }

  // ─── Extract Form Fields from Page ─────────────────────────────────
  async extractFormFields(): Promise<Array<{ name: string; label: string; type: string; value: string }>> {
    if (!this.page) throw new Error("Browser not launched");

    return await this.page.evaluate(() => {
      const fields: Array<{ name: string; label: string; type: string; value: string }> = [];

      // Get all input fields
      document.querySelectorAll("input, select, textarea").forEach((el) => {
        const input = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const label = document.querySelector(`label[for="${input.id}"]`)?.textContent?.trim()
          || input.getAttribute("placeholder")
          || input.name
          || "";

        fields.push({
          name: input.name || input.id || "",
          label,
          type: input.tagName === "SELECT" ? "dropdown" : (input as HTMLInputElement).type || "text",
          value: input.value || "",
        });
      });

      return fields;
    });
  }

  // ─── Extract Page Text ─────────────────────────────────────────────
  async extractPageText(): Promise<string> {
    if (!this.page) throw new Error("Browser not launched");

    return await this.page.evaluate(() => {
      // Get visible text, excluding scripts and styles
      const body = document.body.cloneNode(true) as HTMLElement;
      body.querySelectorAll("script, style, noscript").forEach(el => el.remove());
      return body.innerText.substring(0, 3000); // Limit for AI processing
    });
  }

  // ─── Take Screenshot ───────────────────────────────────────────────
  async takeScreenshot(): Promise<Uint8Array> {
    if (!this.page) throw new Error("Browser not launched");

    const buffer = await this.page.screenshot({
      type: "png",
      fullPage: false,
    });

    return new Uint8Array(buffer);
  }

  // ─── Check Application Status ──────────────────────────────────────
  async checkApplicationStatus(identifier: string): Promise<StatusInfo> {
    if (!this.page) throw new Error("Browser not launched");

    await this.page.goto(PMKisanNavigator.STATUS_URL, {
      waitUntil: "networkidle0",
      timeout: PMKisanNavigator.NAV_TIMEOUT,
    });

    // Enter the identifier (Aadhaar or Account Number)
    const inputSelector = 'input[type="text"]';
    await this.page.waitForSelector(inputSelector, {
      timeout: PMKisanNavigator.SELECTOR_TIMEOUT,
    });
    await this.page.type(inputSelector, identifier, { delay: 50 });

    // Click submit button
    const submitButton = await this.page.$('input[type="submit"], button[type="submit"]');
    if (submitButton) {
      await submitButton.click();
      await this.page.waitForNavigation({
        waitUntil: "networkidle0",
        timeout: PMKisanNavigator.NAV_TIMEOUT,
      }).catch(() => { /* may not navigate */ });
    }

    // Wait for results
    await this.page.waitForTimeout(2000);

    // Extract status info
    const pageText = await this.extractPageText();

    // Parse status from page text
    const hasPayment = pageText.toLowerCase().includes("payment") ||
                       pageText.includes("भुगतान");
    const hasRecord = !pageText.toLowerCase().includes("no record") &&
                      !pageText.includes("कोई रिकॉर्ड नहीं");

    if (hasRecord) {
      return {
        found: true,
        status: hasPayment ? "active" : "pending",
        lastPayment: null, // Would need more specific parsing
        amount: null,
        summaryHindi: hasPayment
          ? `Aapka PM Kisan account active hai. Aapko payment mil rahi hai. Page par aur details dikhaayi de rahi hain.`
          : `Aapka application mil gaya hai, lekin abhi payment pending hai. Thoda intezaar kariye.`,
      };
    }

    return {
      found: false,
      status: "not_found",
      lastPayment: null,
      amount: null,
      summaryHindi: "Is Aadhaar number se koi record nahi mila. Kya aapne sahi number diya hai? Ya phir aapne abhi tak apply nahi kiya hai.",
    };
  }

  // ─── Click Submit Button ───────────────────────────────────────────
  async clickSubmit(): Promise<void> {
    if (!this.page) throw new Error("Browser not launched");

    const submitButton = await this.page.$(
      'input[type="submit"], button[type="submit"], .btn-submit, #btnSubmit'
    );

    if (submitButton) {
      await submitButton.click();
      await this.page.waitForNavigation({
        waitUntil: "networkidle0",
        timeout: PMKisanNavigator.NAV_TIMEOUT,
      }).catch(() => { /* may not navigate */ });
    } else {
      throw new Error("Submit button not found on page");
    }
  }

  // ─── Close Browser ─────────────────────────────────────────────────
  async close(): Promise<void> {
    if (this.page) {
      await this.page.close().catch(() => {});
      this.page = null;
    }
    if (this.browser) {
      await this.browser.close().catch(() => {});
      this.browser = null;
    }
  }

  // ─── Private: Map field name to CSS selector ───────────────────────
  private getFieldSelector(fieldName: string): string {
    // These selectors are specific to the PM Kisan registration form
    // They may need adjustment based on actual form structure
    const selectorMap: Record<string, string> = {
      aadhaar: '#ctl00_ContentPlaceHolder1_txtAadhar, input[name*="Aadhar"], input[name*="aadhaar"], #txtAadhar',
      fullName: '#ctl00_ContentPlaceHolder1_txtFarmerName, input[name*="FarmerName"], input[name*="name"], #txtFarmerName',
      state: '#ctl00_ContentPlaceHolder1_ddlState, select[name*="State"], #ddlState',
      district: '#ctl00_ContentPlaceHolder1_ddlDistrict, select[name*="District"], #ddlDistrict',
      subDistrict: '#ctl00_ContentPlaceHolder1_ddlSubDistrict, select[name*="SubDistrict"], #ddlSubDistrict',
      village: '#ctl00_ContentPlaceHolder1_ddlVillage, select[name*="Village"], #ddlVillage',
      bankAccount: '#ctl00_ContentPlaceHolder1_txtBankAcNo, input[name*="BankAc"], input[name*="account"], #txtBankAcNo',
      ifscCode: '#ctl00_ContentPlaceHolder1_txtIFSC, input[name*="IFSC"], input[name*="ifsc"], #txtIFSC',
    };

    return selectorMap[fieldName] || `[name*="${fieldName}"], [id*="${fieldName}"]`;
  }

  // ─── Private: Fill a text input ────────────────────────────────────
  private async fillTextField(selector: string, value: string): Promise<void> {
    if (!this.page) throw new Error("Browser not launched");

    // Try each selector in the comma-separated list
    const selectors = selector.split(",").map(s => s.trim());

    for (const sel of selectors) {
      try {
        await this.page.waitForSelector(sel, {
          timeout: PMKisanNavigator.SELECTOR_TIMEOUT,
        });

        // Clear existing value
        await this.page.click(sel, { clickCount: 3 });
        await this.page.keyboard.press("Backspace");

        // Type the new value with human-like delay
        await this.page.type(sel, value, { delay: 30 });
        return;
      } catch {
        continue; // Try next selector
      }
    }

    throw new Error(`Could not find text field: ${selector}`);
  }

  // ─── Private: Select a dropdown option ─────────────────────────────
  private async selectDropdownOption(
    selector: string,
    value: string,
    fieldName: string
  ): Promise<void> {
    if (!this.page) throw new Error("Browser not launched");

    const selectors = selector.split(",").map(s => s.trim());

    for (const sel of selectors) {
      try {
        await this.page.waitForSelector(sel, {
          timeout: PMKisanNavigator.SELECTOR_TIMEOUT,
        });

        // Get available options
        const options = await this.page.evaluate((s) => {
          const select = document.querySelector(s) as HTMLSelectElement;
          if (!select) return [];
          return Array.from(select.options).map(o => ({
            value: o.value,
            text: o.textContent?.trim() || "",
          }));
        }, sel);

        // Find matching option (case-insensitive, partial match)
        const match = options.find(
          o =>
            o.text.toLowerCase() === value.toLowerCase() ||
            o.text.toLowerCase().includes(value.toLowerCase()) ||
            o.value.toLowerCase() === value.toLowerCase()
        );

        if (match) {
          await this.page.select(sel, match.value);

          // Wait for dependent dropdowns to load (e.g., state → district)
          if (["state", "district", "subDistrict"].includes(fieldName)) {
            await this.page.waitForTimeout(PMKisanNavigator.DROPDOWN_LOAD_TIMEOUT);
          }
          return;
        }

        throw new Error(`Option "${value}" not found in dropdown`);
      } catch (e) {
        if (sel === selectors[selectors.length - 1]) throw e;
        continue;
      }
    }
  }

  // ─── Private: Select a radio option ────────────────────────────────
  private async selectRadioOption(selector: string, value: string): Promise<void> {
    if (!this.page) throw new Error("Browser not launched");

    const radioSelector = `${selector}[value="${value}"], input[type="radio"][value="${value}"]`;
    await this.page.waitForSelector(radioSelector, {
      timeout: PMKisanNavigator.SELECTOR_TIMEOUT,
    });
    await this.page.click(radioSelector);
  }

  // ─── Private: Toggle checkbox ──────────────────────────────────────
  private async toggleCheckbox(selector: string): Promise<void> {
    if (!this.page) throw new Error("Browser not launched");

    const selectors = selector.split(",").map(s => s.trim());

    for (const sel of selectors) {
      try {
        await this.page.waitForSelector(sel, {
          timeout: PMKisanNavigator.SELECTOR_TIMEOUT,
        });
        await this.page.click(sel);
        return;
      } catch {
        continue;
      }
    }
  }
}
