# Seleccionar la plataforma correcta para ARM64
FROM --platform=linux/arm64/v8 node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir con NGINX
FROM nginx:alpine

# Copiar archivos de la compilación al directorio NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de NGINX
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
