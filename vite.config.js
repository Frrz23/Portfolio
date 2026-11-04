import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Site root must be '/' because the production URL is the custom domain
  // (aryankhatiwada.com.np), not the /Portfolio/ GitHub Pages subpath.
  base: '/',
})
