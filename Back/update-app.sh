#!/bin/bash

# Definir los nombres de las imágenes
IMAGES=("mesvirtual/bochor-frontend:latest" "mesvirtual/bochor-backend:latest")

# Recorrer todas las imágenes y hacer un pull de cada una
for IMAGE in "${IMAGES[@]}"; do
  echo "Haciendo pull de la imagen: $IMAGE"
  docker pull $IMAGE
done

# Parar los contenedores en ejecución
echo "Parando los contenedores en ejecución..."
docker-compose down

# Volver a construir los contenedores y arrancarlos
echo "Reconstruyendo y arrancando los contenedores..."
docker-compose up -d --build

# Verificar el estado de los contenedores
docker-compose ps
