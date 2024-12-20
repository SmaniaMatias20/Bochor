// StatisticsTable.js
import React from 'react';

export function StatisticsTable({ parametros, statsData }) {
    return (
        <div className="hidden lg:block m-10">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-sky-900">
                        <th className="text-white text-center p-4">Parámetro</th>
                        <th className="text-white text-center p-4">Mínimo</th>
                        <th className="text-white text-center p-4">Fecha mínimo</th>
                        <th className="text-white text-center p-4">Máximo</th>
                        <th className="text-white text-center p-4">Fecha máximo</th>
                        <th className="text-white text-center p-4">Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    {parametros.map((parametro, index) => {
                        // Verificar que las estadísticas para el parámetro están definidas
                        const stats = statsData[parametro];

                        if (!stats) {
                            return (
                                <tr key={index} className="border-b">
                                    <td className="p-4 text-center" colSpan="6">
                                        <strong>Datos no disponibles</strong>
                                    </td>
                                </tr>
                            );
                        }

                        return (
                            <tr key={index} className="border-b">
                                <td className="p-4 text-center">{parametro.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</td>
                                <td className="p-4 text-center">{stats.min}</td>
                                <td className="p-4 text-center">{stats.minDate}</td>
                                <td className="p-4 text-center">{stats.max}</td>
                                <td className="p-4 text-center">{stats.maxDate}</td>
                                <td className="p-4 text-center">{stats.avg}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
