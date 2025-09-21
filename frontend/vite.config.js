import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { copyFileSync, existsSync } from "fs";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'framer-motion']
        }
      }
    }
  },
  plugins: [
    tsconfigPaths(), 
    react(),
    // Plugin to copy _redirects file to dist
    {
      name: 'copy-redirects',
      writeBundle() {
        const redirectsPath = resolve(__dirname, 'public', '_redirects');
        const distPath = resolve(__dirname, 'dist', '_redirects');
        
        if (existsSync(redirectsPath)) {
          copyFileSync(redirectsPath, distPath);
          console.log('✅ _redirects file copied to dist/');
        }
      }
    }
  ],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true
  },
  base: "/"
});