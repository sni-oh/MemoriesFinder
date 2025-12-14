import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
        proxy: {
            '/cf': {
                target: 'https://d2pbdl8x41rdu4.cloudfront.net',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/cf/, "")
            }
        }
    }
})