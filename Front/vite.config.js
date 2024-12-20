// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Definición de configuración Vite
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src' // Alias para la carpeta src
    }
  }
});
