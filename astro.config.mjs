// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // URL pública del sitio: necesaria para sitemap, canonical y SEO.
  site: 'https://leafcode.org',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});