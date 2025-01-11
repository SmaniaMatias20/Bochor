#!/bin/bash

# Ruta al archivo docker-compose.yml
COMPOSE_FILE="$(pwd)/docker-compose.yml"

# Verificar si el archivo docker-compose.yml existe
if [ ! -f "$COMPOSE_FILE" ]; then
  echo "Error: El archivo docker-compose.yml no se encuentra en el directorio actual."
  exit 1
fi

# Actualizar imágenes desde Docker Hub
echo "Descargando las últimas imágenes..."
docker-compose -f "$COMPOSE_FILE" pull

# Reiniciar los contenedores con las nuevas imágenes
echo "Reiniciando los contenedores..."
docker-compose -f "$COMPOSE_FILE" up -d --remove-orphans

# Limpiar imágenes antiguas no utilizadas
echo "Eliminando imágenes antiguas..."
docker image prune -f

echo "Actualización completada exitosamente."

