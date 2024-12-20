const express = require("express");
const router = express.Router();
const { publishMessage } = require("../utils/mqttClient");
const { db } = require("../db/readingsdb.js");

router.post("/encender", async (req, res) => {
    const { idequipo, idestacion, idprueba } = req.body;

    if (!idequipo || !idestacion || !idprueba) {
        return res.status(400).json({ error: "Faltan datos para publicar en el subtema." });
    }

    try {
        const resUpdate = await db.query(
            'UPDATE tdb.prueba SET estado = $1 WHERE idPrueba = $2 RETURNING *',
            ['en proceso', idprueba]
        );

        if (resUpdate.rowCount === 0) {
            return res.status(400).json({ error: "No se encontró la prueba para actualizar el estado." });
        }

        const message = {
            idequipo: idequipo,
            idestacion: idestacion,
            idprueba: idprueba,
            estado: 'en proceso'
        };

        publishMessage(`identificacion_TDB/informacion`, JSON.stringify(message));

        res.status(200).json({
            status: "Máquina encendida",
            updatedTest: resUpdate.rows[0]
        });

    } catch (err) {
        console.error("Error al publicar en el subtema o actualizar el estado:", err);
        res.status(500).json({ error: "Error al procesar la solicitud." });
    }
});







router.post("/apagar", async (req, res) => {
    const { idequipo, idestacion, idprueba, estado } = req.body;

    if (!idequipo || !idestacion || !idprueba || !estado) {
        return res.status(400).json({ error: "Faltan datos para publicar en el subtema." });
    }

    try {
        // Actualizar el estado de la prueba a "en proceso"
        const resUpdate = await db.query(
            'UPDATE tdb.prueba SET estado = $1 WHERE idPrueba = $2 RETURNING *',
            ['realizada', idprueba]
        );

        // Verificamos si se ha actualizado algún registro
        if (resUpdate.rowCount === 0) {
            return res.status(400).json({ error: "No se encontró la prueba para actualizar el estado." });
        }

        // Crear el objeto con los datos, ahora con el estado actualizado
        const message = {
            idequipo: idequipo,
            idestacion: idestacion,
            idprueba: idprueba,
            estado: 'realizada' // Usamos el estado actualizado
        };

        // Publicar el objeto en el subtema `informacion` dentro del tópico `identificacion_TDB`
        publishMessage(`identificacion_TDB/informacion`, JSON.stringify(message));

        res.status(200).json({ status: "Máquina apagada" });
    } catch (err) {
        console.error("Error al publicar en el subtema:", err);
        res.status(500).json({ error: "Error al publicar en el subtema." });
    }
});


module.exports = router;
