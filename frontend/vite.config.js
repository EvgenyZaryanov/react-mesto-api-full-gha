import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/react-mesto-auth/',
  root: './',
  build: {
    outDir: 'dist'
  },
  publicDir: 'assets',
  plugins: [react()]
});
