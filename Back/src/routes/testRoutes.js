const express = require("express");
const Router = express.Router();
const Test = require("../models/testModel");
const testInstance = new Test();
const middleware = require('../middleware/Auth.Jwt');



Router.get('/getTests', async (req, res) => {
    try {
        const data = await testInstance.getTests();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching pruebas" });
    }
});

Router.get('/getTests/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const data = await testInstance.getTestById(id);

        if (!data) {
            return res.status(404).json({ error: `Prueba con idPrueba ${id} no encontrada` });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching prueba by ID" });
    }
});




Router.post("/createTest", async (req, res) => {

    const { idestacion, idequipo } = req.body;

    try {
        const result = await testInstance.createTest(idestacion, idequipo);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);


    }
});



Router.delete('/deleteTest/:id', middleware.tokenAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await testInstance.deleteTestById(id);

        if (!result) {
            return res.status(404).json({ error: `Prueba con idPrueba ${id} no encontrada` });
        }
        res.status(200).json({ message: `Prueba con idPrueba ${id} eliminada exitosamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar la prueba" });
    }
});

Router.get('/getColumns', async (req, res) => {
    try {
        const columnNames = await testInstance.fetchColumnNames();
        res.json({ columnas: columnNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching column names" });
    }
});

Router.put('/updateStatus', async (req, res) => {
    const { idPrueba, estado } = req.body;
    if (!idPrueba || !estado) {
        return res.status(400).json({ error: 'Faltan parámetros: idPrueba o estado' });
    }

    try {
        const updatedTest = await testInstance.updateTestStatus(idPrueba, estado);

        if (!updatedTest) {
            return res.status(404).json({ error: `Prueba con idPrueba ${idPrueba} no encontrada` });
        }
        res.status(200).json({ message: 'Estado de prueba actualizado con éxito', test: updatedTest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estado de la prueba' });
    }
});

module.exports = Router;