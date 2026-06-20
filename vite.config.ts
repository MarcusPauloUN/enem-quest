import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@game': path.resolve(__dirname, 'src/game'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@content': path.resolve(__dirname, 'src/content'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },
  optimizeDeps: {
    include: ['phaser'],
  },
  assetsInclude: ['**/*.json'],
})
