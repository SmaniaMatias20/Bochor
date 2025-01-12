#!/bin/bash

# Definir el nombre de las imágenes en Docker Hub
BACKEND_IMAGE="mesvirtual/bochor-back:latest"
FRONTEND_IMAGE="mesvirtual/bochor-front:latest"

# Iniciar sesión en Docker Hub (si es necesario, puedes agregar tus credenciales aquí)
echo "Iniciando sesión en Docker Hub..."
docker login -u "tu_usuario" -p "tu_contraseña"

# Hacer el Pull de las imágenes más recientes
echo "Haciendo pull de las imágenes..."
docker pull $BACKEND_IMAGE
docker pull $FRONTEND_IMAGE

# Detener los contenedores antiguos
echo "Deteniendo contenedores antiguos..."
docker stop bochor-backend
docker stop bochor-frontend

# Eliminar los contenedores antiguos (opcional)
echo "Eliminando contenedores antiguos..."
docker rm bochor-backend
docker rm bochor-frontend

# Ejecutar los nuevos contenedores con las imágenes más recientes
echo "Ejecutando contenedores con las nuevas imágenes..."
docker run -d --name bochor-backend -p 3000:3000 $BACKEND_IMAGE
docker run -d --name bochor-frontend -p 80:80 $FRONTEND_IMAGE

# Mostrar el estado de los contenedores
echo "Contenedores en ejecución:"
docker ps
