import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/admin-api': {
        target: 'https://l5h8zbg5-5123.inc1.devtunnels.ms',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin-api/, ''),
      }
    }
  }
})
