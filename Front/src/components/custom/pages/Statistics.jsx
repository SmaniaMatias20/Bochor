import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Graphic } from "../Graphic";
import { useAxiosInstance } from "../../../hooks/axiosInstance";
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/use-toast';
import CustomToast from '../CustomToast';

export function Statistics() {
    const location = useLocation();
    let { estado } = useParams();
    const axiosInstance = useAxiosInstance();
    let { formData, idprueba } = location.state || {};
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { toast, showToast } = useToast();
    const realizada = "realizada"


    const generatePdf = async (idestacion, idequipo, idprueba, statsForPost, hoursOn) => {
        try {
            // Función para formatear la fecha
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');

                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            };

            // Realizar la solicitud para generar el PDF
            const pdfResponse = await axiosInstance.post('/station/generatePdf', {
                idEstacion: idestacion,
                idEquipo: idequipo,
                idPrueba: idprueba,
                stats: statsForPost,
                fechaFin: `${formatDate(new Date())}hs`,
                fechaInicio: hoursOn
            });

            // Limpiar los datos almacenados en localStorage
            localStorage.removeItem('paramStats');
            localStorage.removeItem('horaEncendido');

            return true;

        } catch (error) {
            // Manejar errores de la solicitud de generación del PDF
            showToast("Hubo un error al generar el PDF. Intente nuevamente.", 'error');
            console.error(error);
        }
    };

    const handleGenerateReport = async () => {
        const storedStats = localStorage.getItem('paramStats');
        const hoursOn = localStorage.getItem('horaEncendido');
        if (storedStats) {
            // Si los datos están disponibles, parseamos el JSON
            const stats = JSON.parse(storedStats);

            // Transformar los datos de la manera que tu backend espera para el POST
            const statsForPost = {
                caudal: stats.caudal,
                potencia: stats.potencia,
                lubricante: stats.lubricante,
                entrada_aire: stats.entrada_aire,
                motor: stats.motor
            };

            // Realizamos la primera solicitud para obtener el estado de la prueba
            const response = await axiosInstance.get(`/test/getTests/${idprueba}`);
            const { idestacion, idequipo } = response.data;

            // Verificamos que los valores necesarios estén presentes
            if (!idestacion || !idequipo) {
                showToast("Datos incompletos para generar el PDF.");
            }

            const createPDF = await generatePdf(idestacion, idequipo, idprueba, statsForPost, hoursOn);

            if (createPDF) {
                showToast("Informe creado exitosamente.", "success");
            } else {
                showToast("Hubo un error al generar el PDF. Intente nuevamente.", 'error');
            }
        }
    };


    const fetchData = async () => {

        // Realizamos la solicitud para verificar el estado de la prueba
        if (estado !== 'realizada') {
            try {
                // Realizamos la primera solicitud para obtener el estado de la prueba
                const response = await axiosInstance.get(`/test/getTests/${idprueba}`);

                // Verificamos que el estado de la prueba sea 'realizada'
                if (response.data.estado === 'realizada') {
                    estado = 'realizada';

                    // Notificar éxito
                    showToast(`Prueba finalizada. Id de prueba: ${idprueba}`, 'success');

                    // Navegar después de un tiempo
                    setTimeout(() => {
                        navigate('/Tests');
                    }, 2000);

                    return; // Terminamos la ejecución aquí si la prueba está 'realizada'
                }

                // Si la prueba no está 'realizada', obtenemos los últimos datos asociados
                const dataResponse = await axiosInstance.get(`/station/getLastById/${idprueba}`);
                const fetchedData = dataResponse.data;

                // Verificar que los datos fueron obtenidos correctamente
                if (!fetchedData || fetchedData.length === 0) {
                    throw new Error("No se encontraron datos para este ID de prueba.");
                }

                // Actualizamos el estado de los datos
                setData(fetchedData);

            } catch (err) {
                // Capturamos cualquier error y mostramos el mensaje adecuado
                console.error("Error al obtener los datos:", err);
                setError(err.message || "Hubo un error al obtener los datos.");
                showToast(err.message || "Hubo un error al procesar la solicitud.", 'error');
            }
        }

    };

    // Función de polling recursivo
    const pollData = async () => {
        if (idprueba && estado !== realizada) {
            await fetchData();

            setTimeout(() => pollData(), 1500);
        }
    };

    useEffect(() => {
        if (estado === realizada) return;

        pollData();
        return () => {
            setError(null);
            setData([]);
        };
    }, [estado, idprueba, axiosInstance]);


    const formatFecha = (fecha) => {
        const dateObj = new Date(fecha);
        if (isNaN(dateObj.getTime())) return "Fecha inválida";
        const day = String(dateObj.getUTCDate()).padStart(2, '0');
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        const year = dateObj.getUTCFullYear();
        const hours = String(dateObj.getUTCHours()).padStart(2, '0');
        const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    };

    let formattedData = [];
    if (estado === realizada) {
        const dataPrueba = Object.values(formData || {});
        formattedData = dataPrueba.map(item => ({
            caudal: item.caudal,
            potencia: item.t_tab_potencia,
            lubricante: item.t_lubricante,
            entrada_aire: item.t_aire_entrada,
            motor: item.t_motor,
            fecha: formatFecha(item.fecha),
            idequipo: item.idequipo,
        }));
    } else {
        if (data.length > 0) {
            formattedData = data.map(item => ({
                caudal: item.caudal,
                potencia: item.t_tab_potencia,
                lubricante: item.t_lubricante,
                entrada_aire: item.t_aire_entrada,
                motor: item.t_motor,
                fecha: formatFecha(item.fecha),
                idequipo: item.idequipo
            }));
        } else {
            formattedData = [{
                caudal: "N/A",
                potencia: "N/A",
                lubricante: "N/A",
                entrada_aire: "N/A",
                motor: "N/A",
                fecha: "N/A",
                idequipo: "Desconocido"
            }];
        }
    }

    const cleanData = (rawData) => {
        return rawData.filter((item) => {
            return (
                item &&
                item.caudal !== 'N/A' &&
                item.potencia !== 'N/A' &&
                item.fecha !== 'N/A' &&
                item.lubricante !== 'N/A' &&
                item.entrada_aire !== 'N/A' &&
                item.motor !== 'N/A' &&
                item.caudal !== null &&
                item.potencia !== null &&
                item.lubricante !== null &&
                item.entrada_aire !== null &&
                item.motor !== null &&
                item.fecha !== null
            );
        });
    };

    const dataFinal = cleanData(formattedData).map((item) => ({
        caudal: item.caudal,
        potencia: item.potencia,
        fecha: item.fecha,
        idequipo: item.idequipo,
        lubricante: item.lubricante,
        entrada_aire: item.entrada_aire,
        motor: item.motor,
    }));

    const parametros = Object.keys(formattedData[0] || {}).filter(key => key !== 'fecha' && key !== 'idequipo');


    return (
        <>
            <CustomToast message={toast.message} type={toast.type} />

            <Graphic
                titulo={"Gráfico Genérico - TDB"}
                idEquipo={formattedData[0]?.idequipo || "Desconocido"}
                data={dataFinal}
                parametros={parametros}
                estado={estado}
                handleGenerateReport={handleGenerateReport}
            />
        </>
    );
}
