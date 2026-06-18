// Iconos de marca (Simple Icons) para la nube 3D de tecnologías.
// Importamos solo los que usamos para no inflar el bundle.
import {
  siJavascript,
  siTypescript,
  siReact,
  siPostgresql,
  siTailwindcss,
  siMongodb,
  siAstro,
  siGooglesearchconsole,
} from "simple-icons";

export type TechIcon = {
  title: string;
  path: string; // path "d" del SVG (viewBox 0 0 24 24)
  hex: string; // color de marca, sin '#'
};

// AWS ya no está en Simple Icons (retirado por política de marca):
// usamos un glifo propio: la "sonrisa" característica de AWS + un servidor/nube.
const awsPath =
  "M3 3h18v2H3V3zm0 16h18v2H3v-2zm9-13a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0h2a5 5 0 0 0-5-5zm-8.5 9.5c2.3 1.6 5.4 2.5 8.5 2.5s6.2-.9 8.5-2.5l-.9-1.2c-2.1 1.4-4.9 2.2-7.6 2.2s-5.5-.8-7.6-2.2l-.9 1.2z";

export const techIcons: Record<string, TechIcon> = {
  JavaScript: { title: siJavascript.title, path: siJavascript.path, hex: siJavascript.hex },
  TypeScript: { title: siTypescript.title, path: siTypescript.path, hex: siTypescript.hex },
  React: { title: siReact.title, path: siReact.path, hex: siReact.hex },
  PostgreSQL: { title: siPostgresql.title, path: siPostgresql.path, hex: siPostgresql.hex },
  AWS: { title: "AWS", path: awsPath, hex: "FF9900" },
  Tailwind: { title: siTailwindcss.title, path: siTailwindcss.path, hex: siTailwindcss.hex },
  MongoDB: { title: siMongodb.title, path: siMongodb.path, hex: siMongodb.hex },
  Astro: { title: siAstro.title, path: siAstro.path, hex: siAstro.hex },
  SEO: { title: "SEO", path: siGooglesearchconsole.path, hex: "4285F4" },
};
