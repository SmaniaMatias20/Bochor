import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Apuntar al archivo index.html
    },
  },
  server: {
    proxy: {
      '/textures': {
        target: 'https://www.solarsystemscope.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/textures/, ''),
      },
    },
  },
});
