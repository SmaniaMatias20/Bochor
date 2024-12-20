const { db } = require("../db/readingsdb.js");
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const logoPath = path.join(__dirname, '../logoDefinitivo.webp');


class Station {
  constructor(StationId) {
    this.StationId = StationId;
  }

  async insertPdfIntoPrueba(idPrueba, idEstacion, idEquipo, fechaInicio, fechaFin, stats) {
    try {
      const pdfBuffer = await this.generatePdf(idEstacion, idPrueba, idEquipo, fechaInicio, fechaFin, stats);
      const res = await db.query(
        'UPDATE tdb.prueba SET informe = $1 WHERE idprueba = $2 RETURNING *',
        [pdfBuffer, idPrueba]
      );

      if (res.rowCount === 0) {
        throw new Error('No se encontró la prueba con el idPrueba proporcionado');
      }

      console.log(`Informe (PDF) insertado con éxito para idPrueba ${idPrueba}`);
      return res.rows[0];

    } catch (err) {
      console.error("Error al insertar el informe PDF:", err);
      throw err;
    }
  }

  async generatePdf(idEstacion, idPrueba, idEquipo, fechaInicio, fechaFin, stats) {
    const htmlContent = this.createHtmlContent(idEstacion, idPrueba, idEquipo, fechaInicio, fechaFin, stats);
    const pdfPath = await this.generatePdfFromHtml(htmlContent);
    const pdfBuffer = fs.readFileSync(pdfPath);
    fs.unlinkSync(pdfPath);

    return pdfBuffer;
  }




  createHtmlContent(idEstacion, idPrueba, idEquipo, fechaInicio, fechaFin, stats) {
    const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
    const estacion = idEstacion;
    const prueba = idPrueba;
    const equipo = idEquipo;
    let tableRows = '';

    for (const [parametro, values] of Object.entries(stats)) {
      tableRows += `
        <tr>
            <td><strong>${parametro.charAt(0).toUpperCase() + parametro.slice(1).replace('_', ' ')}</strong></td>
            <td>${values.min}</td>
            <td>${values.minDate || "N/A"}</td> <!-- Aquí se puede incluir la fecha del mínimo si tienes los datos -->
            <td>${values.max}</td>
            <td>${values.maxDate || "N/A"}</td> <!-- Aquí se puede incluir la fecha del máximo si tienes los datos -->
            <td>${values.avg}</td>
        </tr>
        `;
    }
    const html = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informe de prueba realizada</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: 'Roboto', sans-serif;
        color: #333;
        font-size: 14px;
        line-height: 1.6;
        padding: 0;
      }

      h1 {
        text-align: center;
        font-size: 26px;
        font-weight: 700;
        color: #333;
        margin-top: 20px;
        text-transform: uppercase;
        border-bottom: 2px solid #ddd;
        padding-bottom: 10px;
      }

      h2 {
        font-size: 18px;
        font-weight: 500;
        color: #666;
        margin-top: 10px;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      /* Header con logo e información */
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 5px;
        margin-bottom: 20px;
        text-align: center;
      }

      .logo-container {
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo {
        width: 70px;
        height: auto;
      }

      .header-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }

      .header-info p {
        margin: 5px 0;
        font-size: 16px;
        font-weight: 500;
      }

      .header-info .separator {
        margin: 0 10px;
        color: #aaa;
      }

      /* Detalles generales */
      .details {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        font-size: 16px;
        font-weight: 500;
        justify-content: center;
      }

      .details p {
        margin-bottom: 10px;
      }

      .details span {
        color: #333;
      }

      .separator {
        margin: 0 5px;
        color: #ccc;
      }

      /* Fechas */
      .dates {
        display: flex;
        margin-top: 20px;
        font-size: 14px;
        color: #555;
        justify-content: center;
      }

      .dates p {
        margin-bottom: 8px;
        font-weight: 500;
      }

      /* Tabla principal */
      table {
        width: 100%;
        margin-top: 30px;
        border-collapse: collapse;
        font-size: 12px;
        text-align: left;
        overflow: hidden;
      }

      table, th, td {
        border: 1px solid #ddd;
      }

      th, td {
        padding: 10px;
      }

      th {
        background-color: #0288d1; /* Sky-900 color */
        color: white;
        text-align: center;
      }

      td {
        text-align: center;
      }

      td, th {
        border-radius: 4px;
      }

      /* Media Query para el PDF */
      @media print {
        @page {
          size: A4;
          margin: 20mm;
        }

        body {
          padding: 0;
        }

        .container {
          padding: 0;
          margin: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header con logo e información -->
      <div class="header">
        <div class="logo-container">
          <img src="data:image/webp;base64,${logoBase64}" alt="Logo" class="logo">
        </div>
        <h1><u>Informe de prueba realizada</u></h1>
      </div>
      
      <!-- Detalles de la prueba -->
        <div class="details">
          <p><strong>Prueba:</strong> ${prueba || "N/A"}</p>
          <span class="separator">|</span>
          <p><strong>Equipo:</strong> ${equipo || "N/A"}</p>
          <span class="separator">|</span>
          <p><strong>Estación:</strong> ${estacion || "N/A"}</p>
        </div>

        <div class="dates">
          <p><strong>Fecha Inicio:</strong> ${fechaInicio || "N/A"}</p>
          <span class="separator">|</span>
          <p><strong>Fecha Fin:</strong> ${fechaFin || "N/A"}</p>
        </div>

      <!-- Tabla con parámetros -->
      <table>
        <thead>
          <tr>
            <th>Parámetro</th>
            <th>Mínimo</th>
            <th>Fecha Mínimo</th>
            <th>Máximo</th>
            <th>Fecha Máximo</th>
            <th>Promedio</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  </body>
</html>
`;

    return html;
  }

  async generatePdfFromHtml(htmlContent) {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        timeout: 0,
      });

      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

      const pdfPath = path.join(__dirname, `reporte_estacion_${this.StationId}.pdf`);
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        scale: 0.9,
        margin: { top: '10mm', bottom: '10mm', left: '5mm', right: '5mm' },
        printBackground: true
      });

      return pdfPath;
    } catch (error) {
      console.error("Error al crear el PDF:", error);
      throw new Error(`Error al crear el PDF: ${error.message}`);
    } finally {
      if (browser) await browser.close();
    }
  }


  async fetchAllData() {
    try {
      const res = await db.query(
        "SELECT * FROM tdb.tdb WHERE id_estacion = $1",
        [this.StationId]
      );
      return res.rows;
    } catch (err) {
      console.error("Error fetching lecturas:", err);
      throw err;
    }
  }

  async fetchLastData() {
    try {
      const res = await db.query(
        "SELECT * FROM tdb.tdb WHERE id=(SELECT max(id) FROM tdb) AND id_estacion = $1",
        [this.StationId]
      );
      return res.rows;
    } catch (err) {
      console.error("Error fetching lecturas:", err);
      throw err;
    }
  }

  async fetchDataByMinutes(minutes) {
    try {
      const res = await db.query(
        `SELECT * FROM tdb.tdb 
       WHERE fecha < (SELECT max(fecha) FROM tdb.tdb) 
         AND fecha > (SELECT max(fecha) FROM tdb.tdb) - INTERVAL '${minutes}' MINUTE 
         AND id_estacion = $1`,
        [this.StationId]
      );
      return res.rows;
    } catch (err) {
      console.error("Error fetching lecturas:", err);
      throw err;
    }
  }

  async fetchAllDataById(id) {
    try {
      const lastRecordRes = await db.query(
        `
        SELECT t.fecha
        FROM tdb.tdb t
        WHERE t.idPrueba = $1
        ORDER BY t.fecha DESC
        LIMIT 1;
        `,
        [id]
      );

      if (lastRecordRes.rows.length === 0) {
        console.log("No records found for this station.");
        return [];
      }

      const lastRecordDate = lastRecordRes.rows[0].fecha;
      const fourHoursAgo = new Date(lastRecordDate.getTime() - 4 * 60 * 60 * 1000);
      const res = await db.query(
        `
        SELECT DISTINCT ON (DATE_TRUNC('second', t.fecha))
          t.caudal, t.t_tab_potencia, t.fecha, t.idequipo, t.t_aire_entrada, t.t_motor, t.t_lubricante
        FROM
          tdb.tdb t
        WHERE
          t.idPrueba = $1
          AND t.fecha >= $2  -- Filtramos los registros desde 4 horas antes del último
          AND MOD(EXTRACT(EPOCH FROM DATE_TRUNC('second', t.fecha)), 5) = 0
        ORDER BY
          DATE_TRUNC('second', t.fecha), t.fecha;  -- Ordenamos primero por el truncado a segundo y luego por la fecha completa
        `,
        [id, fourHoursAgo]
      );

      return res.rows;
    } catch (err) {
      console.error("Error fetching all data:", err);
    }
  }

  async fetchLastDataById(id) {
    try {
      const res = await db.query(
        `
        SELECT t.caudal, t.t_tab_potencia, t.t_lubricante, t.t_aire_entrada, t.t_motor, t.fecha, p.idequipo
        FROM tdb.tdb t
        JOIN tdb.prueba p ON t.idprueba = p.idprueba
        WHERE t.idPrueba = $1
        ORDER BY t.fecha DESC
        LIMIT 10;  -- Ahora traemos los últimos 10 registros
        `,
        [id]
      );

      return res.rows;
    } catch (err) {
      console.error("Error fetching last data:", err);
      throw err;
    }
  }

}
module.exports = Station;
