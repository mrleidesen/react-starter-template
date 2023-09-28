import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: [
          'react',
          'react-dom',
          'ky',
          '@tanstack/react-query',
          'react-router-dom',
          'dayjs',
          'valtio',
        ].reduce(
          (soFar, current) => ({
            ...soFar,
            [current.replace(/\//, '-')]: [current],
          }),
          {}
        ),
      },
    },
  },
});
