import sharp from "sharp";

const root = "C:/Users/migue/OneDrive/Documents/Claude Code/ELO 28 barber&co- Original";
const SRC = `${root}/Barbearia/imagem boa.webp`;
const OUT = `${root}/public/media/og-image.jpg`;

const W = 1200;
const H = 630;

const overlaySvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0C0C0D" stop-opacity="0.15"/>
      <stop offset="55%" stop-color="#0C0C0D" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0C0C0D" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <rect x="60" y="${H - 210}" width="164" height="164" rx="4" fill="none" stroke="#F3EFE8" stroke-width="2"/>
  <text x="142" y="${H - 148}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="46" letter-spacing="1" fill="#F3EFE8">ELO28</text>
  <text x="142" y="${H - 112}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="600" font-size="12" letter-spacing="2.5" fill="#F3EFE8">BARBER &amp; CO.</text>
  <text x="248" y="${H - 150}" font-family="Georgia, 'Times New Roman', serif" font-weight="600" font-size="34" fill="#F3EFE8">O elo não se corta. Cria-se.</text>
  <text x="248" y="${H - 112}" font-family="Arial, sans-serif" font-weight="500" font-size="17" letter-spacing="0.5" fill="#C9AB7C">RIO DE MOURO · VALE MOURÃO</text>
</svg>
`);

await sharp(SRC)
  .rotate()
  .resize({ width: W, height: H, fit: "cover", position: "attention" })
  .composite([{ input: overlaySvg, top: 0, left: 0 }])
  .jpeg({ quality: 88 })
  .toFile(OUT);

console.log("wrote", OUT);
