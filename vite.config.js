import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@assets': path.resolve(process.cwd(), 'src/assets'),
      '@components': path.resolve(process.cwd(), 'src/components'),
      '@data': path.resolve(process.cwd(), 'src/data'),
      '@hooks': path.resolve(process.cwd(), 'src/hooks'),
      '@sections': path.resolve(process.cwd(), 'src/sections'),
      '@styles': path.resolve(process.cwd(), 'src/styles'),
      '@utils': path.resolve(process.cwd(), 'src/utils'),
    },
  },
});
