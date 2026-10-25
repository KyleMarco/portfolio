import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/react-redux-crud-posts/',
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
  },
})
