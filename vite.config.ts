import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': '/client/',
      '@models/': '/models/',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  test: {
    setupFiles: ['./client/test/setup.ts'],
  },
})
