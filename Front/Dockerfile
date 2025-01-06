# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json* ./ 

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación con Vite
RUN npm run build

# Etapa 2: Servir la aplicación con NGINX
FROM nginx:alpine

# Copiar los archivos de construcción al directorio de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de NGINX
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para acceder al servidor
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
