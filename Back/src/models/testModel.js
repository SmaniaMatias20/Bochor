const { db, dbSat } = require("../db/readingsdb");
require('dotenv').config();


class test {
    constructor(testId) {
        this.testId = testId;
    }


    async getTests() {
        try {
            const res = await db.query(
                'SELECT * FROM tdb.prueba'
            );
            return res.rows;
        } catch (err) {
            console.error("Error fetching lecturas:", err);
            throw err;
        }
    }

    async getTestById(id) {
        try {
            const res = await db.query(
                'SELECT * FROM tdb.prueba WHERE idPrueba = $1',
                [id]
            );
            return res.rows[0];
        } catch (err) {
            console.error("Error fetching prueba by idPrueba:", err);
            throw err;
        }
    }


    async createTest(idestacion, idequipo) {
        if (!idestacion) {
            throw new Error("Ingresar id de la estacion");
        }
        if (!idequipo) {
            throw new Error("Ingresar id del equipo");
        }
        const idestacionInt = parseInt(idestacion, 10);

        if (isNaN(idestacionInt)) {
            throw new Error("El id de la estación debe ser un número válido");
        }

        try {
            const res = await db.query(
                `INSERT INTO tdb.prueba (idequipo, idestacion, estado) 
                VALUES ($1, $2, $3)`,
                [idequipo, idestacionInt, "pendiente"]
            );

            return "Prueba creada con éxito";
        } catch (error) {
            throw new Error(error);
        }
    }



    async updateTestStatus(idPrueba, status) {
        try {
            const res = await db.query(
                'UPDATE tdb.prueba SET estado = $1 WHERE idPrueba = $2 RETURNING *',
                [status, idPrueba]
            );

            if (res.rowCount === 0) {
                return null;
            }

            return res.rows[0];
        } catch (err) {
            console.error("Error updating test status:", err);
            throw err;
        }
    }

    async deleteTestById(idPrueba) {
        try {
            const res = await db.query(
                'DELETE FROM tdb.prueba WHERE idPrueba = $1 RETURNING *',
                [idPrueba]
            );

            if (res.rowCount === 0) {
                return null;
            }
            return res.rows[0];
        } catch (err) {
            console.error("Error deleting prueba by idPrueba:", err);
            throw err;
        }
    }


    async fetchColumnNames() {
        try {
            const query = `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'prueba' AND table_schema = 'tdb';
      `;
            const res = await db.query(query);
            const columnNames = res.rows.map(row => row.column_name);
            return columnNames;
        } catch (err) {
            console.error("Error fetching column names:", err);
            throw new Error("Error fetching column names");
        }
    }

}

module.exports = test;
