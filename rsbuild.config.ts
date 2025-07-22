import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './index.html',
  },
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  resolve: {
    alias: {
      '@': './src/',
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
    },
  },
  tools: {
    cssLoader: {
      url: {
        filter: (url) => {
          // FIXME: 根据需要调整
          // 如果 url 在 src 目录下，则进行编译
          // 否则是 public 不编译
          return url.includes('src') || url.includes('@');
        },
      },
    },
  },
});
