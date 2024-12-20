const { db, dbSat } = require("../db/readingsdb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

class user {
  constructor(userId) {
    this.userId = userId;
  }

  async register(username, password, role) {
    if (!username) {
      throw new Error("Ingresar usuario");
    }
    if (!password) {
      throw new Error("Ingresar contrasenia");
    }
    if (!role) {
      throw new Error("Ingresar rol");
    }

    const existingUser = await dbSat.query(
      `SELECT * FROM usuarios.usuarios WHERE usuario=$1`,
      [username]
    );
    if (existingUser.rows.length > 0) {
      throw new Error("Usuario duplicado");
    }

    try {
      const hash = await bcrypt.hash(password, 10);
      const fechaSubida = new Date().toISOString();
      const res = await dbSat.query(
        `INSERT INTO usuarios.usuarios (usuario, password, rol, fecha_subida, "autorizacionTDB", "autorizacionSAT") VALUES ($1, $2, $3, $4, $5, $6)`, // Comillas dobles para "autorizacionTDB"
        [username, hash, role, fechaSubida, true, false]
      );
      return "usuario creado con exito";
    } catch (error) {
      throw new Error(error);
    }
  }





  async login(username, password) {
    if (!password) {
      throw new Error("Contraseña no ingresada");
    }

    if (!username) {
      throw new Error("Nombre de usuario no ingresado");
    }

    try {
      const result = await dbSat.query(
        `SELECT usuario, password, rol, "autorizacionTDB" FROM usuarios.usuarios WHERE usuario=$1`,
        [username]
      );
      if (result.rows.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      const hashedPass = result.rows[0].password;
      if (!hashedPass) {
        throw new Error("Contraseña no encontrada en la base de datos");
      }
      const isMatch = await bcrypt.compare(password, hashedPass);
      if (!isMatch) {
        throw new Error("Usuario o contraseña incorrectos");
      }
      const autorizacionTDB = result.rows[0].autorizacionTDB;
      if (!autorizacionTDB) {
        throw new Error("El usuario no tiene autorización para TDB");
      }
      const token = jwt.sign(
        { username, role: result.rows[0].rol },
        process.env.TOKEN_SECRET,
        { expiresIn: "8h" }
      );

      return {
        token,
        username,
        role: result.rows[0].rol,
        autorizacion: autorizacionTDB
      };
    } catch (err) {
      if (err.message === "Usuario no encontrado") {
        throw new Error("Usuario no encontrado. Verifique sus credenciales.");
      } else if (err.message === "Contraseña no encontrada en la base de datos") {
        throw new Error("Error interno: No se pudo recuperar la contraseña.");
      } else if (err.message === "El usuario no tiene autorización para TDB") {
        throw new Error("El usuario no tiene autorización para TDB");
      } else if (err.message === "Usuario o contraseña incorrectos") {
        throw new Error("Usuario o contraseña incorrectos");
      } else {
        throw new Error("Error desconocido al intentar iniciar sesión.");
      }
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Usuario con id no encontrado");
    }
    try {
      const res = await dbSat.query(
        `DELETE FROM usuarios.usuarios WHERE id = ${id} AND "autorizacionTDB" = true`
      );
      if (res.rowCount <= 0) {
        throw new Error("Usuario no encontrado o no está autorizado en TDB");
      }
      return "Usuario eliminado con exito";
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllUsers() {
    try {
      const res = await dbSat.query(`SELECT id, usuario, rol, "autorizacionTDB", password FROM usuarios.usuarios`);
      if (res.rows.length === 0) {
        throw new Error("No hay usuarios registrados.");
      }
      return res.rows;
    } catch (error) {
      throw new Error("Error al obtener los usuarios: " + error.message);
    }
  }

  async updateUserById(userId, updatedUser) {


    if (!userId) {
      throw new Error("Se debe especificar el ID del usuario.");
    }

    if (!updatedUser || Object.keys(updatedUser).length === 0) {
      throw new Error("No se proporcionaron datos para actualizar.");
    }

    if (updatedUser.password && updatedUser.password !== '******') {
      updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
    }

    const setClauses = Object.keys(updatedUser)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");

    const values = [...Object.values(updatedUser), userId];
    const query = `
      UPDATE usuarios.usuarios
      SET ${setClauses}
      WHERE id = $${values.length}
      RETURNING *`;

    try {
      const result = await dbSat.query(query, values);
      if (result.rows.length === 0) {
        throw new Error("Usuario no encontrado.");
      }

      return "Usuario actualizado con éxito";
    } catch (error) {
      throw new Error("Error al actualizar el usuario: " + error.message);
    }
  }


  async getTableColumns() {
    try {
      const query = `
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = 'usuarios'  -- El esquema que usas
            AND table_name = 'usuarios'     -- La tabla de la que quieres obtener las columnas
            AND column_name IN ('id', 'usuario', 'password', 'rol',  'autorizacionTDB'); -- Solo las columnas que te interesan
        `;

      const result = await dbSat.query(query);
      if (result.rows.length === 0) {
        throw new Error("No se encontraron columnas específicas para la tabla 'usuarios'.");
      }
      return result.rows.map(row => row.column_name);
    } catch (error) {
      console.error("Error al obtener las columnas:", error);
      throw error;
    }
  }

}

module.exports = user;
