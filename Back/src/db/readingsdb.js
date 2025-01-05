const pg = require("pg");
require('dotenv').config();

const { Pool } = pg;

const db = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

// Manejo de errores en la conexión
db.on('error', (err) => {
    console.error('Error en el Pool de conexión:', err);
});

module.exports = { db };
