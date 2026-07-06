// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Static single-page island app. The build output (dist/) is served either by the
// Fastify sync server (server/) or by any static host (e.g. GitHub Pages).
export default defineConfig({
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // In `astro dev`, proxy the API/auth calls to the local Fastify server so
      // cloud sync works end-to-end during development. Without the server
      // running, these calls fail quietly and the app stays in local-only mode.
      proxy: {
        '/api': 'http://127.0.0.1:8787',
        '/auth': 'http://127.0.0.1:8787',
      },
    },
  },
});
