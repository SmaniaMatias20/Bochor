# Usar una imagen base de Node.js con soporte para multi-arquitectura
FROM --platform=linux/arm64 node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --omit=dev --legacy-peer-deps

# Copiar el resto del código
COPY . .

# Asegurarse de usar variables de entorno
ENV NODE_ENV=production

# Exponer el puerto que usa el backend
EXPOSE 3000

# Comando para ejecutar la aplicación en producción
CMD ["npm", "start"]
