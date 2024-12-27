import React from 'react';
import mision from "../../img/mision.png";
import vision from "../../img/vision.png";
import valores from "../../img/valores.png";

const MissionVisionValues = () => {
    return (
        <section className="bg-gray-100 py-16 px-4">
            <div className="max-w-screen-xl mx-auto text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Misión */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                        <img
                            src={mision}
                            alt="Misión"
                            className="w-full h-72 object-cover rounded-t-lg mb-4"
                        />
                        <p className="text-gray-600">
                            Nuestra misión es proporcionar soluciones innovadoras y efectivas que ayuden a las empresas a mejorar la gestión de su talento humano, promoviendo ambientes de trabajo saludables y productivos.
                        </p>
                    </div>

                    {/* Visión */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                        <img
                            src={vision}
                            alt="Visión"
                            className="w-full h-72 object-cover rounded-t-lg mb-4"
                        />
                        <p className="text-gray-600">
                            Nuestra visión es ser la consultora líder en recursos humanos a nivel global, reconocida por nuestra capacidad para transformar empresas y maximizar el potencial de sus colaboradores.
                        </p>
                    </div>

                    {/* Valores */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                        <img
                            src={valores}
                            alt="Valores"
                            className="w-full h-72 object-cover rounded-t-lg mb-4"
                        />
                        <p className="text-gray-600">
                            Creemos en la integridad, la transparencia, el trabajo en equipo y la innovación. Estos valores son la base sobre la cual construimos relaciones sólidas y duraderas con nuestros clientes y empleados.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVisionValues;
