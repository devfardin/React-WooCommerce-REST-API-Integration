import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
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
  erver: {
    proxy: {
      '/wp-json': {
        target: 'http://e-commerce.local',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
