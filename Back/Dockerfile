# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto que usa el backend
EXPOSE 5000

# Definir la variable de entorno
ENV NODE_ENV=production

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
