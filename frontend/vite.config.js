import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    global: 'window',
  },
  server: {
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: 'http://localhost:9999',
        ws: true,
        changeOrigin: true,
        secure: false,
      },
      '/ws-chat': {
        target: 'http://localhost:9999',
        ws: true,
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
