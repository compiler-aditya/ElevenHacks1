/**
 * Generate Audio Assets for VANI using ElevenLabs APIs
 *
 * Generates:
 * - Sound effects (welcome chime, navigation, success, error)
 * - Hold music (bansuri loop)
 *
 * Run with: npm run generate-audio or npx tsx scripts/generate-audio-assets.ts
 */

const API_BASE = "https://api.elevenlabs.io/v1";
const API_KEY = process.env.ELEVENLABS_API_KEY;

if (!API_KEY) {
  console.error("Error: ELEVENLABS_API_KEY environment variable not set");
  process.exit(1);
}

const headers = {
  "xi-api-key": API_KEY!,
  "Content-Type": "application/json",
};

interface AudioAsset {
  name: string;
  type: "sfx" | "music";
  prompt: string;
  duration?: number;
  filename: string;
}

const ASSETS: AudioAsset[] = [
  {
    name: "Welcome Chime",
    type: "sfx",
    prompt: "Gentle Indian temple bell chime, warm welcoming tone, single ring, peaceful",
    filename: "welcome-chime.mp3",
  },
  {
    name: "Navigation Sound",
    type: "sfx",
    prompt: "Soft page turn sound, paper rustling, gentle whoosh, digital interface",
    filename: "nav-sound.mp3",
  },
  {
    name: "Success Fanfare",
    type: "sfx",
    prompt: "Celebratory Indian music with tabla and sitar, short victorious fanfare, happy completion jingle",
    filename: "success-fanfare.mp3",
  },
  {
    name: "Error Tone",
    type: "sfx",
    prompt: "Gentle error notification tone, soft concerned sound, not alarming, supportive",
    filename: "error-tone.mp3",
  },
  {
    name: "Field Complete",
    type: "sfx",
    prompt: "Quick positive ding sound, checkbox tick, satisfying completion ping",
    filename: "field-complete.mp3",
  },
  {
    name: "Thinking/Loading",
    type: "sfx",
    prompt: "Gentle thinking sound, soft bubbles, digital processing, calming",
    filename: "thinking.mp3",
  },
  {
    name: "Hold Music",
    type: "music",
    prompt: "Indian bansuri flute meditation music, gentle peaceful loop, 85 BPM, soothing background",
    duration: 15,
    filename: "hold-music.mp3",
  },
];

async function generateSFX(asset: AudioAsset): Promise<Buffer> {
  console.log(`  🔊 Generating SFX: ${asset.name}...`);

  const resp = await fetch(`${API_BASE}/sound-generation`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      text: asset.prompt,
      duration_seconds: asset.duration || 2,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`SFX generation failed for ${asset.name}: ${err}`);
  }

  return Buffer.from(await resp.arrayBuffer());
}

async function generateMusic(asset: AudioAsset): Promise<Buffer> {
  console.log(`  🎵 Generating Music: ${asset.name}...`);

  const resp = await fetch(`${API_BASE}/music/generate`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      prompt: asset.prompt,
      duration_seconds: asset.duration || 15,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Music generation failed for ${asset.name}: ${err}`);
  }

  return Buffer.from(await resp.arrayBuffer());
}

async function main() {
  const fs = await import("fs/promises");
  const path = await import("path");

  console.log("╔══════════════════════════════════════╗");
  console.log("║   VANI — Audio Asset Generator       ║");
  console.log("╚══════════════════════════════════════╝\n");

  // Create output directory
  const outputDir = path.join(process.cwd(), "public", "audio");
  await fs.mkdir(outputDir, { recursive: true });

  for (const asset of ASSETS) {
    try {
      let audio: Buffer;

      if (asset.type === "sfx") {
        audio = await generateSFX(asset);
      } else {
        audio = await generateMusic(asset);
      }

      const outPath = path.join(outputDir, asset.filename);
      await fs.writeFile(outPath, audio);
      console.log(`  ✅ Saved: ${asset.filename} (${(audio.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ❌ Failed: ${asset.name} — ${err}`);
    }
  }

  console.log("\n╔══════════════════════════════════════╗");
  console.log("║      Audio Assets Generated!         ║");
  console.log("╚══════════════════════════════════════╝");
  console.log(`\nFiles saved to: ${outputDir}`);
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
