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
          '/1.jpg',
          '/2.jpg', 
          '/3.jpg',
          '/4.jpg',
          '/logo.jpg',
          '/lcsg.png'
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
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})