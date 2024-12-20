const express = require("express");
const Router = express.Router();
const User = require("../models/userModel");
const userInstance = new User();


Router.get("/", (req, res) => {
  res.status(200).send("Conexion exitosa");
});

Router.post("/createUser", async (req, res) => {
  const { usuario, password, rol } = req.body;

  try {
    const result = await userInstance.register(usuario.replace(/\s+/g, ''), password, rol);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

Router.post("/login", async (req, res) => {

  const { username, password } = req.body;
  try {
    const result = await userInstance.login(username.replace(/\s+/g, ''), password);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

Router.delete("/deleteUser/:id", async (req, res) => {

  const { id } = req.params;
  try {
    const result = await userInstance.delete(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


Router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await userInstance.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

Router.put("/updateUser/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  updatedUser.usuario = updatedUser.usuario ? updatedUser.usuario.replace(/\s+/g, '') : '';
  if (!userId) {
    return res.status(400).send("El ID del usuario es obligatorio.");
  }

  if (!updatedUser) {
    return res.status(400).send("Los datos del usuario son obligatorios.");
  }
  try {
    const result = await userInstance.updateUserById(userId, updatedUser);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

Router.get("/getTableColumns", async (req, res) => {
  try {
    const columns = await userInstance.getTableColumns();
    res.status(200).json(columns);
  } catch (error) {
    res.status(400).send("Error al obtener las columnas: " + error.message);
  }
});





module.exports = Router;


//MQTT