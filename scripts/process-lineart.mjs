// Procesa el line-art: líneas negras/blanco -> líneas blancas sobre transparente.
// Uso: node scripts/process-lineart.mjs
import sharp from "sharp";

const SRC = "public/Gemini_Generated_Image_iy8r6qiy8r6qiy8r.png";
const OUT = "public/profile-lineart.png";

const img = sharp(SRC).ensureAlpha();
const { width, height } = await img.metadata();

// 1) Trabajamos en escala de grises para decidir alpha por luminosidad.
//    En el original: líneas ~negras (oscuras), fondo ~blanco (claro).
const raw = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { data, info } = raw;
const ch = info.channels; // 4 (RGBA)
const out = Buffer.alloc(info.width * info.height * 4);

for (let i = 0; i < info.width * info.height; i++) {
  const r = data[i * ch];
  const g = data[i * ch + 1];
  const b = data[i * ch + 2];
  // Luminosidad 0..255 (0 = línea negra, 255 = fondo blanco)
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  // Alpha = oscuridad de la línea: cuanto más oscuro el pixel original,
  // más opaca la línea blanca resultante. Suaviza los bordes (antialias).
  const darkness = 255 - lum; // 0 fondo, 255 línea
  out[i * 4] = 255; // R blanco
  out[i * 4 + 1] = 255; // G blanco
  out[i * 4 + 2] = 255; // B blanco
  out[i * 4 + 3] = darkness; // A = intensidad de la línea
}

await sharp(out, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 5 }) // recorta margen transparente sobrante
  .png()
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`OK -> ${OUT} (${meta.width}x${meta.height})`);
