import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  base: '/echarts-local/', // Base path for GitHub Pages
  build: {
    sourcemap: 'hidden',
    chunkSizeWarningLimit: 2000, // Increase limit to 2000KB to silence ECharts warning
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'echarts': ['echarts'],
          'monaco': ['@monaco-editor/react'],
          'ui-vendor': ['@radix-ui/react-slot', '@radix-ui/react-tabs', '@radix-ui/react-popover', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react']
        }
      }
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths()
  ],
})
