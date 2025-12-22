import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import { watch } from 'vite-plugin-watch'

export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom', '@headlessui/react']
  },
  server: {
    host: '0.0.0.0',
    port: 3036,
    strictPort: true,
    hmr: {
      host: 'localhost',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    RubyPlugin(),
    watch({
      pattern: 'config/locales/**/*.yml',
      command: 'bundle exec i18n export',
      silent: false
    })
  ],
})
