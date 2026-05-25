import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    lightningcss: {
      // Force LightningCSS to transpile modern range syntax (width<=768px)
      // BACK to legacy max-width syntax for older Safari compatibility (iPhone 7, etc.)
      // Features.MediaRangeSyntax = 128
      include: 128
    }
  },
  server: {
    allowedHosts: true
  }
})
