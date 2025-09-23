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
          
          // Add critical CSS preload
          const criticalCSS = `<link rel="preload" as="style" href="/src/styles/critical.css" fetchpriority="high">`;
          
          htmlContent = htmlContent.replace(
            '<head>',
            `<head>\n  ${preloadLinks}\n  ${criticalCSS}`
          );
          
          bundle[htmlFile].source = htmlContent;
        }
      }
    }
  ],
  build: {
    // Aggressive optimization for performance
    rollupOptions: {
      output: {
        // Better chunk splitting for caching
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          // Router and navigation
          if (id.includes('react-router')) {
            return 'router';
          }
          // Heavy UI libraries
          if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('recharts')) {
            return 'ui-heavy';
          }
          // Utility libraries
          if (id.includes('date-fns') || id.includes('clsx') || id.includes('class-variance-authority')) {
            return 'utils';
          }
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('react-helmet')) {
            return 'forms';
          }
          // Analytics and external services
          if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights') || id.includes('@emailjs')) {
            return 'external-services';
          }
          // Everything else in vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
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
    // Advanced minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        unsafe: true,
        unsafe_math: true,
        unsafe_methods: true,
        hoist_funs: true,
        hoist_vars: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    // Optimize bundle size
    assetsInlineLimit: 2048, // Inline smaller images
    chunkSizeWarningLimit: 500, // Warn for chunks > 500KB
    sourcemap: false, // Disable sourcemaps in production
    cssCodeSplit: true, // Split CSS for better caching
    // Enable modern builds
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
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
  // Server configuration for development
  server: {
    // Enable HTTP/2 in development
    https: false,
    // Optimize HMR
    hmr: {
      overlay: false,
    },
  },
})