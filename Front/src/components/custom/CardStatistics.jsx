"use client";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../shadcn/card";
import { StatisticsTable } from './TableStatistics';

export const description = "A linear line chart";

export function CardStatistics({ parametros, chartData }) {

    // Calcular los valores de Mínimo, Máximo y Promedio para cada parámetro
    const calculateMinMaxAvg = (data, param) => {
        const values = data.map((item) => item[param]);

        // Encontrar los valores mínimo y máximo
        const min = Math.min(...values);
        const max = Math.max(...values);

        // Calcular el promedio
        const avg = (values.reduce((acc, curr) => acc + curr, 0) / values.length).toFixed(2);

        // Encontrar las fechas en las que se alcanza el valor mínimo y máximo
        const minDate = data.find((item) => item[param] === min)?.fecha;
        const maxDate = data.find((item) => item[param] === max)?.fecha;

        return { min, max, avg, minDate, maxDate };
    };

    // Si no hay datos de chartData, usamos los datos predeterminados
    const safeData = chartData.length > 0 ? chartData : [];

    // Estado para almacenar las estadísticas
    const [statsData, setStatsData] = useState({});

    useEffect(() => {
        // Calcular las estadísticas para todos los parámetros
        const newStats = parametros.reduce((acc, parametro) => {
            acc[parametro] = calculateMinMaxAvg(safeData, parametro);
            return acc;
        }, {});

        // Actualizar el estado con las estadísticas
        setStatsData(newStats);

        // Guardar las estadísticas en el localStorage
        localStorage.setItem('paramStats', JSON.stringify(newStats));
    }, [parametros, safeData]); // Este efecto se ejecuta cuando cambian los parámetros o los datos del gráfico

    return (
        <>
            {/* Vista en Móvil (por defecto, con tarjetas) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10 lg:hidden">
                {/* Iterando sobre los parámetros (Caudal, Potencia y Temperatura) */}
                {parametros.map((parametro, index) => {
                    // Recuperamos las estadísticas desde el estado
                    const stats = statsData[parametro] || calculateMinMaxAvg(safeData, parametro);

                    return (
                        <div key={index}>
                            {/* Una sola carta para cada parámetro */}
                            <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <CardHeader className="border-b p-4 bg-sky-900">
                                    <CardTitle className="text-xl text-center font-semibold text-white">
                                        {parametro.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="text-xl text-gray-600">
                                        {/* Mínimo */}
                                        <div className="mb-2">
                                            <strong>Mínimo:</strong> {stats.min}{" "}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Fecha min:</strong> {stats.minDate}{" "}
                                        </div>
                                        {/* Máximo */}
                                        <div className="mb-2">
                                            <strong>Máximo:</strong> {stats.max}{" "}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Fecha max:</strong> {stats.maxDate}{" "}
                                        </div>
                                        {/* Promedio */}
                                        <div>
                                            <strong>Promedio:</strong> {stats.avg}{" "}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
            </div>

            {/* Vista en PC (usando tabla) */}
            <StatisticsTable parametros={parametros} statsData={statsData} />
        </>
    );
}
