import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // Custom plugin for image optimization
    {
      name: 'image-optimization',
      generateBundle(options, bundle) {
        // Add preload hints for critical images
        const criticalImages = [
          '/la-coiffure-powai-ash-brown-highlights.jpg',
          '/la-coiffure-powai-grey-bob-haircut.jpg',
          '/la-coiffure-thane-balayage-highlights-curly-hair.jpg',
          '/la-coiffure-thane-men-haircut-and-beard.jpg',
          '/logo.jpg',
          '/la-coiffure-salon-logo.png'
        ];
        
        // Find the HTML file in the bundle
        const htmlFile = Object.keys(bundle).find(fileName => fileName.endsWith('.html'));
        if (htmlFile && bundle[htmlFile]) {
          let htmlContent = bundle[htmlFile].source;
          
          // Add preload links for critical images
          const preloadLinks = criticalImages
            .map(src => `<link rel="preload" as="image" href="${src}">`)
            .join('\n  ');
          
          // Insert preload links in the head
          htmlContent = htmlContent.replace(
            '<head>',
            `<head>\n  ${preloadLinks}`
          );
          
          bundle[htmlFile].source = htmlContent;
        }
      }
    }
  ],
  build: {
    // Optimize chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react']
        },
        // Optimize asset filenames for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    // Enable compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Optimize images
    assetsInlineLimit: 4096, // Inline small images as base64
    chunkSizeWarningLimit: 1000
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})