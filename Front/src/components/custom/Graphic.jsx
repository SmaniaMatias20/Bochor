import { useState, useEffect, useMemo, useRef } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Brush } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { CardStatistics } from './CardStatistics';
import { LoadingSpinner } from './Spinner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../shadcn/card';
import { ChartContainer } from '../shadcn/chart';

export function Graphic({
    titulo,
    data,
    idEquipo,
    parametros,
    estado,
    handleGenerateReport,
    zoomRange: propZoomRange = [0, 0] // Zoom fijo pasado por prop, con valor por defecto
}) {
    const [visibleLines, setVisibleLines] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ message: '', type: '' });
    const isDataLoaded = useRef(false);
    const [error, setError] = useState(null);
    const [zoomRange, setZoomRange] = useState(propZoomRange);

    // Generar chartConfig con colores aleatorios y usar useMemo para evitar recalcular innecesariamente
    const chartConfig = useMemo(() => {
        return parametros.reduce((config, parametro) => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            config[parametro] = {
                label: parametro.charAt(0).toUpperCase() + parametro.slice(1),
                color: `#${randomColor.padStart(6, '0')}`,
            };
            return config;
        }, {});
    }, []);

    // Establecer la visibilidad inicial de las líneas
    useEffect(() => {
        const initialVisibleLines = Object.keys(chartConfig).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setVisibleLines(initialVisibleLines);
    }, [chartConfig]);

    useEffect(() => {
        if (isDataLoaded.current) return;

        const delay = setTimeout(() => {
            if (data.length > 0) {
                setFilteredData(data);
                setLoading(false);
            } else {
                setToast({ message: 'No se encontraron datos válidos.', type: 'error' });
                setLoading(false);
            }

            isDataLoaded.current = true;
        }, 1000);

        return () => clearTimeout(delay);
    }, [data]);

    const closeToast = () => {
        setToast({ message: '', type: '' });
    };

    const filteredDataForZoom = zoomRange[0] === 0 && zoomRange[1] === 0 ? filteredData : filteredData.slice(zoomRange[0], zoomRange[1]);

    const toggleLineVisibility = (key) => {
        setVisibleLines((prevState) => ({
            ...prevState,
            [key]: !prevState[key], // Alternar la visibilidad de la línea
        }));
    };

    const toggleAllLinesVisibility = () => {
        const allVisible = Object.values(visibleLines).every((isVisible) => isVisible);
        const newVisibility = Object.keys(chartConfig).reduce((acc, key) => {
            acc[key] = !allVisible;  // Si todas están visibles, las ocultamos. Si alguna está oculta, las mostramos todas
            return acc;
        }, {});
        setVisibleLines(newVisibility);
    };

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente
                }}
            >
                <div style={{ transform: 'scale(1.5)' }}>
                    <LoadingSpinner size="100px" />
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Mostrar contenido solo si no hay error */}
            {!error ? (
                <>
                    <Card className="m-10 bg-white shadow-xl rounded-lg overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between border-b p-8 bg-sky-900">
                            {/* Primer div (Título y Descripción) en el extremo izquierdo */}
                            <div>
                                <CardTitle className="text-xl font-semibold text-white">{titulo}</CardTitle>
                                <CardDescription className="text-gray-50">DMD Compresores S.A.I.C</CardDescription>
                            </div>

                            {/* Cartel con el estado de la prueba en el extremo derecho */}
                            <div className="flex items-center space-x-4">
                                {/* Mostrar el botón de generar informe solo cuando el estado sea 'realizada' */}
                                {estado === "realizada" && (
                                    <div className="flex items-center">
                                        <button
                                            onClick={handleGenerateReport}
                                            className="bg-white text-sky-900 px-3 py-4 text-sm font-bold rounded-xl"
                                        >
                                            Generar Informe
                                        </button>
                                    </div>
                                )}
                                <span
                                    className={`px-3 py-4 text-sm font-bold rounded-xl ${estado === "realizada"
                                        ? "bg-green-500 text-white"
                                        : estado === "en proceso"
                                            ? "bg-yellow-500 text-white animate-pulse duration-900 ease-in-out"
                                            : "bg-gray-500 text-white"
                                        }`}
                                >
                                    {estado === "realizada" ? "Realizada" : estado === "en proceso" ? "En Proceso" : "Pendiente"}
                                </span>
                            </div>

                        </CardHeader>
                        <CardContent className="p-4">
                            <ChartContainer config={chartConfig} className="bg-gray-50 p-4 rounded-md">
                                <LineChart
                                    data={filteredDataForZoom} // Usamos los datos filtrados aquí
                                    margin={{
                                        left: 12,
                                        right: 12,
                                        top: 20,
                                        bottom: 20,
                                    }}
                                >
                                    <CartesianGrid vertical={false} stroke="#999999" strokeDasharray="3 3" strokeOpacity={0.9} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={true}
                                        strokeWidth={2}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                        stroke="#111111"
                                    />
                                    <YAxis
                                        stroke="#111111"
                                        strokeWidth={2}
                                        tickLineStrokeWidth={1.5}
                                        tickFormatter={(value) => `${value}`}
                                        tick={{
                                            fontSize: 14,
                                            fontFamily: 'Arial, sans-serif',
                                            fontWeight: 'bold',
                                            fill: '#444444',
                                        }}
                                    />
                                    <Tooltip
                                        content={({ payload }) => {
                                            if (!payload || payload.length === 0) return null;
                                            const dataPoint = payload[0].payload;
                                            const date = dataPoint.fecha;

                                            return (
                                                <div className="bg-white p-4 rounded-md shadow-md max-w-xs">
                                                    <div className="text-sm text-gray-500">{date}</div>
                                                    {payload.map((entry, index) => (
                                                        <div key={index} style={{ color: entry.color }} className="text-lg">
                                                            <span className="font-medium">{entry.name}</span>: {entry.value}
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        }}
                                    />
                                    {Object.keys(chartConfig).map((key) => {
                                        if (visibleLines[key]) {
                                            const { label, color } = chartConfig[key];
                                            return (
                                                <Line
                                                    key={key}
                                                    dataKey={key}
                                                    type="linear"
                                                    stroke={color}
                                                    strokeWidth={3}
                                                    dot={false}
                                                />
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Agregar el Brush para hacer zoom */}
                                    <Brush
                                        dataKey="month" // Asegúrate de que este key esté presente en los datos
                                        startIndex={zoomRange[4]}
                                        endIndex={zoomRange[4]}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                        <div className="flex flex-wrap items-center gap-4 px-4 pt-4 bg-sky-900">
                            {/* Botón único para alternar entre mostrar/ocultar todas las líneas */}
                            <button
                                onClick={toggleAllLinesVisibility}
                                className={`text-white p-2 rounded-md font-bold ${Object.values(visibleLines).every(v => v) ? 'bg-red-500' : 'bg-green-500'}`}
                            >
                                {Object.values(visibleLines).every(v => v) ? 'Ocultar' : 'Mostrar'}
                            </button>
                            {/* Checkboxes para cada línea */}
                            {Object.keys(chartConfig).map((key) => (
                                <div
                                    key={key}
                                    className="flex flex-col items-start w-full sm:w-auto sm:flex-row sm:justify-start justify-center mb-2 sm:mb-0"
                                >
                                    <input
                                        type="checkbox"
                                        id={`line-toggle-${key}`}
                                        checked={visibleLines[key]}
                                        onChange={() => toggleLineVisibility(key)}
                                        className="mr-2 font-bold"
                                    />
                                    <label
                                        htmlFor={`line-toggle-${key}`}
                                        className="text-sm text-white font-bold"
                                    >
                                        {chartConfig[key].label.replace(/_/g, ' ')}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Información adicional del equipo */}
                        <CardFooter className="flex-col items-start gap-2 text-sm p-4 bg-sky-900">
                            <div className="flex gap-2 font-medium leading-none text-white">
                                Id del Equipo - {idEquipo}
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="flex gap-2 text-sm text-white">
                                <div>Parámetros:</div>
                                <div>{parametros.join(' | ')}</div>
                            </div>
                        </CardFooter>
                    </Card>

                    <CardStatistics parametros={parametros} chartData={filteredDataForZoom} />
                </>
            ) : null} {/* Si hay un error, no renderizamos nada */}
        </>
    );
}
