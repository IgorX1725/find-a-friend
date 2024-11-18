import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@controllers': path.resolve(__dirname, 'src/controllers'),
      '@use-cases': path.resolve(__dirname, 'src/use-cases'),
    },
  },
})
