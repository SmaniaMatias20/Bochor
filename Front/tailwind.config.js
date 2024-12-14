module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',  // Asegúrate de que estos archivos estén siendo analizados para purgar estilos no utilizados.
    './public/index.html',          // Incluye también el archivo HTML principal de tu proyecto.
  ],
  darkMode: 'media',  // Usa 'media' para activar el modo oscuro basado en las preferencias del sistema.
  theme: {
    extend: {
      colors: {
        customBlue: '#1e3a8a',  // Color azul personalizado
        customGray: '#f7fafc',  // Color gris personalizado
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],  // Fuente personalizada
      },
    },
  },
  variants: {
    extend: {
      opacity: ['responsive', 'hover', 'focus', 'active'],  // Extiende las variantes para manejar opacidad en diferentes estados
    },
  },
  plugins: [
    require('@tailwindcss/forms'),  // Añade plugin para estilos de formularios
    require('@tailwindcss/typography'),  // Añade plugin para estilos de tipografía
  ],
};
