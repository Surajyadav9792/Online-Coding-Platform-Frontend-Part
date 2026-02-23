import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';//this is added from dasisy ui
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()], //tailwindcss() is added from daisy ui
})
