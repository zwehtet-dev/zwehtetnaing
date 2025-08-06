import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue({
    script: {
      defineModel: true,
      propsDestructure: true
    }
  })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@headlessui/vue', '@iconify/vue'],
          i18n: ['vue-i18n']
        },
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    cssCodeSplit: true,
    minify: 'esbuild',
    // Asset optimization
    assetsInlineLimit: 4096, // 4kb
    reportCompressedSize: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  css: {
    devSourcemap: true,
    // CSS optimization
    postcss: {
      plugins: [
        // Add autoprefixer and other PostCSS plugins if needed
      ]
    }
  },
  // Asset optimization
  assetsInclude: ['**/*.woff2', '**/*.woff'],
  server: {
    port: 3000,
    open: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
    exclude: []
  }
})