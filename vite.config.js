import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // IMPORTANT: Replace 'repo-name' with your actual repository name
  // e.g., if your repo is 'https://github.com/user/my-app', base should be '/my-app/'
  base: '/shopee-to-threads/',
})
