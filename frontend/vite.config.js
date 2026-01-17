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
    host: '0.0.0.0',  // Allow access from other devices on the network
    port: 5173,
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
