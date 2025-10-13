import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Fresco-2k25/',  // 👈 your repo name here
  plugins: [react()],
})
