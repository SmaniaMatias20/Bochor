const express = require("express");
const Router = express.Router();
const User = require("../models/userModel");
const userInstance = new User();


Router.get("/", (req, res) => {
  res.status(200).send("Conexion exitosa");
});

module.exports = Router;
