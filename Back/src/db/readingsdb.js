const pg = require("pg");
require('dotenv').config();

const { Pool } = pg;

// Configuración del Pool de conexión DB-TDB
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


// Configuración del Pool de conexión DB-SAT
// const dbSat = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DBSAT,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// Manejo de errores en la conexión
// dbSat.on('error', (err) => {
//     console.error('Error en el Pool de conexión:', err);
// });

//module.exports = { db, dbSat };
