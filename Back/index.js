const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./src/routes/routes.js");
require('dotenv').config();

app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (!error) {
    console.log("Servidor corriendo en el puerto " + PORT);
    return;
  }

  console.log("Error iniciando el servidor: " + error);
});
