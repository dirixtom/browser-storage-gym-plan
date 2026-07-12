import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Scoped to tests/dom/** only — pure-logic tests live under tests/unit/ and
// run via `node --test` instead (see package.json's test:unit script). This
// keeps the two runners from ever picking up each other's files.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  test: {
    environment: 'jsdom',
    include: ['tests/dom/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/dom/setup.ts'],
  },
});
