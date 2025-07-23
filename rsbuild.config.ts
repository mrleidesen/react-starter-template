import path from 'path';

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
        filter: (url, resourcePath) => {
          const srcPath = path.resolve(__dirname, 'src');
          const publicPath = path.resolve(__dirname, 'public');
          // 对于绝对路径 (e.g., /images/foo.png)，通常指向 public 目录，不应由 cssLoader 处理。
          if (url.startsWith('/')) {
            return false;
          }

          // 对于非相对路径 (e.g., data URIs, http links), cssLoader 默认也不会处理它们。
          // 我们只关心相对路径的本地文件。
          if (!url.startsWith('.')) {
            return false;
          }

          // 获取包含 url() 的 CSS 文件的目录
          const resourceDirectory = path.dirname(resourcePath);

          // 解析出被引用资源的绝对路径
          const absoluteAssetPath = path.resolve(resourceDirectory, url);

          // 检查资源是否在 src 目录下
          if (absoluteAssetPath.startsWith(srcPath)) {
            // 在 src 内，需要 cssLoader 处理
            return true;
          }

          // 检查资源是否在 public 目录下
          if (absoluteAssetPath.startsWith(publicPath)) {
            // 在 public 内，不需要 cssLoader 处理
            return false;
          }

          // 默认情况：对于其他路径（例如 node_modules），让 cssLoader 处理
          return true;
        },
      },
    },
  },
  output: {
    legalComments: 'none',
  },
});
