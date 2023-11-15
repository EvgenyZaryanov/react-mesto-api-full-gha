import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dist/',
  plugins: [react()]
});

// eslint-disable-next-line no-undef
module.exports = {
  root: './',
  build: {
    outDir: 'dist'
  },
  publicDir: 'assets'
};
