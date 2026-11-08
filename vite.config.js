import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const base = process.env.VITE_BASE_PATH || '/'
const backendTarget = process.env.VITE_BACKEND_URL || 'http://localhost:4000'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
        rewrite: (p) => (p.startsWith('/api/v1/') ? p : p.replace(/^\/api\//, '/api/v1/')),
      },
      '/uploads': {
        target: backendTarget,
        changeOrigin: true,
      },
      '/b': {
        target: backendTarget,
        changeOrigin: true,
      },
    },
  },
})
