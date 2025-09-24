import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Exclude test files from production build
      exclude: /\.test\.(js|jsx|ts|tsx)$/,
    }),
    tsconfigPaths(),
    // Critical resource preloader
    {
      name: 'critical-resource-preloader',
      generateBundle(options, bundle) {
        // Only preload the most critical images for LCP
        const criticalImages = [
          '/la-coiffure-salon-logo.png',
          '/logo.jpg'
        ];
        
        const htmlFile = Object.keys(bundle).find(fileName => fileName.endsWith('.html'));
        if (htmlFile && bundle[htmlFile]) {
          let htmlContent = bundle[htmlFile].source;
          
          // Add preload links for critical resources only
          const preloadLinks = criticalImages
            .map(src => `<link rel="preload" as="image" href="${src}" fetchpriority="high">`)
            .join('\n  ');
          
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
    // Optimized build configuration
    rollupOptions: {
      output: {
        // Simplified chunk splitting for better performance
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['framer-motion', 'lucide-react'],
          'vendor': ['clsx', 'class-variance-authority']
        },
        // Optimize chunk and asset names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    // Enhanced minification for better performance and stability
    minify: 'esbuild',
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none',
      target: 'es2020',
      format: 'esm',
      treeShaking: true,
    },
    // Optimize bundle size and images
    assetsInlineLimit: 1024, // Inline smaller images (reduced from 2048)
    chunkSizeWarningLimit: 500, // Warn for chunks > 500KB
    sourcemap: false, // Disable sourcemaps in production
    cssCodeSplit: true, // Split CSS for better caching
    // Enable modern builds
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    // Image optimization during build
    assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp'],
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ],
    // Force pre-bundling of slow dependencies
    force: true,
  },
  // Enable experimental features for better performance
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      // Optimize asset URLs
      if (hostType === 'js') {
        return { js: `/${filename}` };
      }
      return { relative: true };
    },
  },
  // Server configuration for development - localhost optimized
  server: {
    // Fix localhost issues
    host: '0.0.0.0', // Allow external connections
    port: 5173,
    strictPort: true,
    // Enable HTTP/2 in development
    https: false,
    // Optimize HMR for localhost
    hmr: {
      overlay: false,
      port: 5173,
      host: 'localhost',
    },
    // Prevent black screen on updates
    watch: {
      usePolling: false,
      interval: 100,
    },
    // Fix localhost connection issues
    cors: true,
    // Force localhost to work properly
    force: true,
  },
})