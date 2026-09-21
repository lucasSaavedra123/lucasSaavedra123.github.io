// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: reemplazar por el dominio final cuando exista.
  site: 'https://PLACEHOLDER-dominio-final.com',
  trailingSlash: 'never',
  integrations: [sitemap()],
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }
  }
});