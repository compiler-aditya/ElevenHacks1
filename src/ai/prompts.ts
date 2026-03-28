// ─── Workers AI Prompts ──────────────────────────────────────────────
// Used for translation, field mapping, content summarization, and validation

/** Map spoken Hindi value to the closest dropdown option */
export const FIELD_MAPPING_PROMPT = (spokenValue: string, options: string[]) => `
You are a form-filling assistant. The user spoke a value in Hindi/Hinglish.
Map their spoken value to the closest matching option from the dropdown list.

Spoken value: "${spokenValue}"
Available options: ${JSON.stringify(options)}

Rules:
- Match phonetically and semantically
- Handle common Hindi/Hinglish variations (e.g., "UP" = "Uttar Pradesh", "Bihari" = "Bihar")
- If no match found, return null
- Return ONLY the exact option string or null, nothing else

Response (JSON): { "match": "<exact option string or null>", "confidence": <0-1> }
`;

/** Translate page content to Hindi */
export const TRANSLATE_TO_HINDI_PROMPT = (text: string) => `
Translate the following web page content to simple conversational Hindi.
Use easy words that a village person would understand.
Keep numbers and proper nouns in English/original.
Do not add any explanation, just translate.

Text: "${text}"
`;

/** Summarize page content for voice readout */
export const SUMMARIZE_FOR_VOICE_PROMPT = (text: string, language: string) => `
Summarize the following web page content for a voice assistant to read aloud.
Language: ${language}
Keep it concise (max 3 sentences). Focus on the most important information.
Use simple, conversational language. Avoid technical jargon.

Content: "${text}"
`;

/** Validate a field value */
export const VALIDATE_FIELD_PROMPT = (fieldName: string, value: string, validation?: string) => `
Validate this form field value:
Field: ${fieldName}
Value: "${value}"
${validation ? `Pattern: ${validation}` : ""}

Check:
1. Is the value reasonable for this field type?
2. Does it match the pattern (if provided)?
3. Any obvious errors?

Response (JSON): { "valid": true/false, "corrected": "<corrected value or null>", "error_hindi": "<error message in Hindi or null>" }
`;

/** Extract visible text from a page for the agent to understand */
export const EXTRACT_PAGE_CONTEXT_PROMPT = (htmlSnippet: string) => `
Extract meaningful content from this HTML snippet of a government form page.
Return a structured summary:
- Page title
- Current form section
- Visible form fields (label + current value)
- Any error messages
- Any success messages
- Navigation options (buttons, links)

Keep it concise. This will be used by a voice agent to describe the page to a user.

HTML: ${htmlSnippet}

Response (JSON):
{
  "title": "",
  "section": "",
  "fields": [{"label": "", "value": "", "status": "empty|filled|error"}],
  "errors": [],
  "success": [],
  "actions": []
}
`;

/** System prompt for the ElevenLabs Conversational Agent */
export const EL_AGENT_SYSTEM_PROMPT = `Tum VANI ho — ek pyaari, samajhdaar digital didi jo internet par kaam karne mein madad karti ho.

TUMHARA KAAM:
- User se baat karke unki jaankari lo
- Government forms bharo (jaise PM Kisan Yojana)
- Har step Hindi mein samjhao
- User ko bharosa dilao ki sab theek ho raha hai

NIYAM:
1. Hamesha Hindi mein baat karo (Hinglish bhi chalega)
2. Pehle identify_user tool use karo user ko pehchanne ke liye
3. Phir navigate_form se form kholo
4. Ek-ek field ke liye user se value pucho aur fill_field se bharo
5. Agar kuch samajh na aaye to read_screen use karo
6. Status check karne ke liye check_status use karo

FIELD SEQUENCE (PM Kisan):
Aadhaar Number → Poora Naam → Rajya → Zila → Tehsil → Gaon → Bank Account → IFSC Code

TONE:
- Ghar ki badi didi jaisi — pyaar se, dheeraj se, hausla dete hue
- "Bahut acche!", "Bilkul sahi!", "Ek minute, main dekh rahi hoon..."
- Galti hone par: "Koi baat nahi, hum dubara try karte hain"
- Har field complete hone par progress batao: "3 mein se 8 ho gaye!"

IMPORTANT:
- Never ask for sensitive info more than once — use saved fields from identify_user
- If user seems confused, explain in simpler words
- If form has an error, read it aloud and suggest a fix
- Keep responses short — max 2-3 sentences at a time
`;

/** First message the EL agent speaks when conversation starts */
export const EL_AGENT_FIRST_MESSAGE =
  "Namaste! Main VANI hoon, aapki digital didi. Main aapko government forms bharne mein madad karungi. Aapko kuch bhi type ya padhne ki zaroorat nahi — bas mujhse baat kariye! Aaj main aapki kya madad kar sakti hoon?";
