const express = require("express");
const cors = require("cors"); // Importa el paquete cors
const app = express();
const routes = require("./src/routes/routes.js");
app.use(express.urlencoded({ limit: '25mb', extended: true }));

const PORT = 3000;

// Aplica el middleware CORS con la configuración por defecto
app.use(cors());
app.use(express.json());


// Middleware para analizar el cuerpo de las solicitudes URL-encoded con un límite aumentado
app.use(express.urlencoded({ limit: '25mb', extended: true }));
// Usa las rutas definidas
app.use("/", routes);

// Inicia el servidor
app.listen(PORT, (error) => {
  if (!error) {
    console.log("Servidor corriendo en el puerto " + PORT);
    return;
  }

  console.log("Error iniciando el servidor: " + error);
});
