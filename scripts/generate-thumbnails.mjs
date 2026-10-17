import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const thumbnailsDir = path.join(publicDir, "thumbnails");

if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

// Mapping slug to original image in public/
const projects = [
  { slug: "kari-kambing-cb-sp-ektreun", image: "Mockup Kari Kambing.png" },
  { slug: "smartumkm", image: "Mockup Smart UMKM.png" },
  { slug: "kopi-gayo", image: "Mockup Kopi Gayo.png" },
  { slug: "sahamiq", image: "Mockup Sahamiq (2).png" },
  { slug: "chatku", image: "Mockup Chatku (1).png" },
  { slug: "dashboard-monitoring-desa", image: "Mockup Monthlab.png" },
  { slug: "baked-goods", image: "Mocukup_Ulvoria_v2 (1).png" },
  { slug: "resto", image: "Resto.png" },
  { slug: "arunika-finance", image: "Pulsa.png" },
  { slug: "time-management", image: "SIM.png" },
  { slug: "ticket-booking", image: "bioskop.png" },
  { slug: "Donasi", image: "Donasi.png" },
];

console.log("Generating thumbnails in public/thumbnails/ ...");

async function run() {
  for (const p of projects) {
    const inputPath = path.join(publicDir, p.image);
    const outputPath = path.join(thumbnailsDir, `${p.slug}.webp`);

    if (!fs.existsSync(inputPath)) {
      console.warn(`[SKIP] File not found: ${inputPath}`);
      continue;
    }

    try {
      const info = await sharp(inputPath)
        .resize(640, null, {
          kernel: sharp.kernel.lanczos3,
          withoutEnlargement: true,
        })
        .webp({ quality: 85, effort: 4 })
        .toFile(outputPath);

      const oldSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
      const newSize = (info.size / 1024).toFixed(1);
      console.log(`[OK] ${p.slug}.webp (${info.width}x${info.height}) : ${oldSize}KB -> ${newSize}KB`);
    } catch (err) {
      console.error(`[ERROR] Failed to process ${p.slug}:`, err);
    }
  }
  console.log("Done generating all thumbnails!");
}

run();
