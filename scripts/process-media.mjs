// One-off build-time script: converts the raw source photos in
// `Barbearia/` and `Cortes/` into optimized WebP files under `public/media/`.
// Run with: npm run process-media
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const SRC_BARBEARIA = path.join(root, "Barbearia");
const SRC_CORTES = path.join(root, "Cortes");
const OUT_BARBEARIA = path.join(root, "public/media/barbearia");
const OUT_CORTES = path.join(root, "public/media/cortes");
const OUT_EQUIPA = path.join(root, "public/media/equipa");

const WEBP_OPTS = { quality: 82, effort: 5 };

async function convert(inputFile, outputFile, maxWidth) {
  const image = sharp(inputFile).rotate();
  const meta = await image.metadata();
  const width = Math.min(maxWidth, meta.width ?? maxWidth);
  await image.resize({ width, withoutEnlargement: true }).webp(WEBP_OPTS).toFile(outputFile);
  console.log("wrote", outputFile);
}

// Team headshots: small circular Instagram-style PNGs (~171px, alpha corners).
// Composited onto the card's own charcoal so the transparent corners blend in
// seamlessly, then upscaled+sharpened — kept at a modest display size (circular
// frame, not a full-bleed crop) so the limited source resolution doesn't show.
async function processHeadshot(inputFile, outputFile, targetSize) {
  await sharp(inputFile)
    .resize({ width: targetSize, height: targetSize, kernel: sharp.kernel.lanczos3 })
    .flatten({ background: "#1b1917" })
    .sharpen({ sigma: 0.7 })
    .webp({ quality: 88, effort: 5 })
    .toFile(outputFile);
  console.log("wrote", outputFile);
}

async function main() {
  await mkdir(OUT_BARBEARIA, { recursive: true });
  await mkdir(OUT_CORTES, { recursive: true });
  await mkdir(OUT_EQUIPA, { recursive: true });

  const barbearia = [
    ["1ewr.webp", "barbearia-interior-1.webp"],
    ["650386680_18193181758351090_2038574195090665862_n.jpg", "barbearia-equipa-acao.webp"],
    ["asdasd.webp", "barbearia-filosofia-elo.webp"],
    ["sadasd.webp", "barbearia-logotipo-neon.webp"],
    ["images.jpg", "barbearia-equipa-grupo.webp"],
    ["unnamed.webp", "barbearia-fachada.webp"],
    ["unnamed (14).webp", "barbearia-formacao.webp"],
    ["imagem boa.webp", "barbearia-interior-2.webp"],
  ];
  for (const [inFile, outFile] of barbearia) {
    await convert(path.join(SRC_BARBEARIA, inFile), path.join(OUT_BARBEARIA, outFile), 1000);
  }

  const cortesFiles = [
    "unnamed (1).webp",
    "unnamed (2).webp",
    "unnamed (3).webp",
    "unnamed (4).webp",
    "unnamed (5).webp",
    "unnamed (6).webp",
    "unnamed (7).webp",
    "unnamed (8).webp",
    "unnamed (9).webp",
    "unnamed (10).webp",
    "unnamed (11).webp",
    "unnamed (12).webp",
    "unnamed (13).webp",
    "unnamed (15).webp",
    "unnamed (16).webp",
  ];
  let i = 1;
  for (const file of cortesFiles) {
    const outFile = `cortes-${String(i).padStart(2, "0")}.webp`;
    await convert(path.join(SRC_CORTES, file), path.join(OUT_CORTES, outFile), 800);
    i += 1;
  }

  // Individual headshots supplied directly (replacing the earlier crops from
  // the group photo). Diogo confirmed; Tomás/Tom mapping pending confirmation
  // — see team.js.
  await processHeadshot(path.join(SRC_BARBEARIA, "D42FF8BD-145E-4465-A05D-44FACE5F832A.png"), path.join(OUT_EQUIPA, "diogo.webp"), 400);
  await processHeadshot(path.join(SRC_BARBEARIA, "D0703274-4BB1-42EC-AC76-513E78D9E835.png"), path.join(OUT_EQUIPA, "headshot-d0703274.webp"), 400);
  await processHeadshot(path.join(SRC_BARBEARIA, "0.png"), path.join(OUT_EQUIPA, "headshot-0.webp"), 400);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
