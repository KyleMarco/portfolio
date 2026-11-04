import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    lib: {
      entry: {
        index: resolve(projectRoot, 'src/shared/ui/library.ts'),
        router: resolve(projectRoot, 'src/shared/ui/LinkButton/index.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: 'index',
    },
    rolldownOptions: {
      external: [
        '@tanstack/react-virtual',
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router-dom',
      ],
    },
  },
});
