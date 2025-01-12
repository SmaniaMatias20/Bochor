#!/bin/bash

# Definir el nombre de las imágenes en Docker Hub
BACK_IMAGE="mesvirtual/bochor-back:latest"
FRONT_IMAGE="mesvirtual/bochor-front:latest"

# Iniciar sesión en Docker Hub (si es necesario, puedes agregar tus credenciales aquí)
echo "Iniciando sesión en Docker Hub..."
docker login -u "tu_usuario" -p "tu_contraseña"

# Hacer el Pull de las imágenes más recientes
echo "Haciendo pull de las imágenes..."
docker pull $BACK_IMAGE
docker pull $FRONT_IMAGE

# Detener los contenedores antiguos
echo "Deteniendo contenedores antiguos..."
docker stop bochor-back
docker stop bochor-front

# Eliminar los contenedores antiguos (opcional)
echo "Eliminando contenedores antiguos..."
docker rm bochor-back
docker rm bochor-front

# Ejecutar los nuevos contenedores con las imágenes más recientes
echo "Ejecutando contenedores con las nuevas imágenes..."
docker run -d --name bochor-back -p 3000:3000 $BACK_IMAGE
docker run -d --name bochor-front -p 80:80 $FRONT_IMAGE

# Mostrar el estado de los contenedores
echo "Contenedores en ejecución:"
docker ps
