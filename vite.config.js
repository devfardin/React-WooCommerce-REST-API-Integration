import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler'],
        ],
      },
    }),
  ],

  build: {
    minify: false,     // ❌ disables JS minification (reduces malware false-positives)
    sourcemap: false,  // ❌ removes .map files (often detected as malware)
    chunkSizeWarningLimit: 2000,
  },

  server: {
    proxy: {
      '/wp-json': {
        target: 'http://e-commerce.local',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
