// Generate OG image using Node.js built-in APIs
// Creates a 1200x630 PNG with dark background, logo, and text

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const merkRoot = join(projectRoot, "..");

// We'll create an SVG and convert it to a simple approach
// Since we don't have sharp/canvas installed, create an SVG-based OG image
// Actually, let's use a different approach: create the image using Next.js OG image generation

// For now, let's create a simple HTML file that can be screenshot'd,
// or better yet, let's check if sharp is available
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.log("sharp not available, trying alternative...");
  // Create a minimal PNG using raw buffer manipulation
  // This is a fallback approach
  sharp = null;
}

if (sharp) {
  const logoPath = join(merkRoot, "logo", "merkaba_digital.png");
  const outputPath = join(projectRoot, "public", "og-image.png");

  const logo = await sharp(logoPath)
    .resize({ height: 300, withoutEnlargement: true })
    .toBuffer();

  const logoMeta = await sharp(logo).metadata();
  const logoW = logoMeta.width;
  const logoH = logoMeta.height;
  const logoX = Math.round((1200 - logoW) / 2);
  const logoY = Math.round((630 - logoH) / 2) - 60;

  const textSvg = `<svg width="1200" height="630">
    <text x="600" y="${logoY + logoH + 70}"
      text-anchor="middle"
      font-family="Helvetica, Arial, sans-serif"
      font-size="36"
      fill="white">Generative Engine Optimization</text>
  </svg>`;

  const result = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 11, g: 14, b: 26, alpha: 1 },
    },
  })
    .composite([
      { input: logo, top: logoY, left: logoX },
      { input: Buffer.from(textSvg), top: 0, left: 0 },
    ])
    .png()
    .toFile(outputPath);

  console.log("OG image saved to", outputPath);
} else {
  // Fallback: create SVG-based image and save as SVG, or use a minimal PNG approach
  // Since neither sharp nor canvas is available, create the image via an alternative

  // Try using the Python approach
  const { execSync } = await import("child_process");
  try {
    execSync("python3 " + join(__dirname, "generate-og.py"), { stdio: "inherit" });
  } catch {
    console.error("Could not generate OG image. Please run manually:");
    console.error("  python3 scripts/generate-og.py");
    console.error("  OR install sharp: npm install sharp && node scripts/generate-og.mjs");
  }
}
