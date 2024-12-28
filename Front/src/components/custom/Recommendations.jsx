import React from 'react';
import { FaStar } from 'react-icons/fa'; // Importa el ícono
import redes from "../../img/redes.png";
import liderazgo from "../../img/liderazgo.png";
import recomendacion from "../../img/recomendacion.png";

const Recommendations = () => {
    return (
        <div className="flex flex-col items-center px-4 py-8">
            {/* Título con ícono */}
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8 flex items-center justify-center space-x-2">
                <span>Recomendaciones</span>
                <FaStar className="text-yellow-500" size={24} />
            </h2>

            {/* Contenedor de imágenes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {/* Recomendación 1 */}
                <div className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                        src={redes}
                        alt="Recommendation 1"
                        className="w-full h-auto object-cover rounded-xl"
                    />
                </div>
                {/* Recomendación 2 */}
                <div className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                        src={liderazgo}
                        alt="Recommendation 2"
                        className="w-full h-auto object-cover rounded-xl"
                    />
                </div>
                {/* Recomendación 3 */}
                <div className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                        src={recomendacion}
                        alt="Recommendation 3"
                        className="w-full h-auto object-cover rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default Recommendations;
