import React from 'react';
import redes from "../../img/redes.png";
import liderazgo from "../../img/liderazgo.png";
import recomendacion from "../../img/recomendacion.png";

const Recommendations = () => {
    return (
        <div className="flex justify-center space-x-4">
            <div className="w-1/4 border-2 border-gray-300 rounded-xl">
                <img
                    src={redes}
                    alt="Recommendation 1"
                    className="w-full h-auto rounded-xl"
                />
            </div>
            <div className="w-1/4 border-2 border-gray-300 rounded-xl">
                <img
                    src={liderazgo}
                    alt="Recommendation 2"
                    className="w-full h-auto rounded-xl"
                />
            </div>
            <div className="w-1/4 border-2 border-gray-300 rounded-xl">
                <img
                    src={recomendacion}
                    alt="Recommendation 3"
                    className="w-full h-auto rounded-xl"
                />
            </div>
        </div>
    );
};

export default Recommendations;
