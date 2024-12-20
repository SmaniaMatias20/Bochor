const express = require("express");
const Router = express.Router();
const Station = require("../models/stationModel");
const stationInstance = new Station();
const middleware = require('../middleware/Auth.Jwt');

Router.post("/generatePdf", async (req, res) => {
  try {
    const { idEstacion, idEquipo, idPrueba, stats, fechaInicio, fechaFin } = req.body;

    if (!idEstacion || !idEquipo || !idPrueba) {
      return res.status(400).json({ error: "Se requiere idEstacion, idEquipo y idPrueba para generar el PDF" });
    }

    const station = new Station(idEstacion);
    const data = await station.fetchAllDataById(idPrueba);

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No se encontraron datos para esta estación" });
    }
    const startDate = fechaInicio || "2024-11-26 11:19hs";
    const endDate = fechaFin || "2024-11-26 20:30hs";
    const updatedPrueba = await station.insertPdfIntoPrueba(idPrueba, idEstacion, idEquipo, startDate, endDate, stats);

    res.status(200).json({
      message: 'PDF generado e insertado correctamente en la base de datos.',
      prueba: updatedPrueba
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando o insertando el PDF" });
  }
});


Router.get("/getById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await stationInstance.fetchAllDataById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

Router.get("/getLastById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await stationInstance.fetchLastDataById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = Router;