import React from 'react';

const CompanySummary = () => {
    return (
        <section className="bg-white py-24 px-6 sm:px-12 text-gray-700 text-center">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">
                    Transformamos el Talento Humano en el Motor de tu Empresa
                </h2>
                <p className="text-lg sm:text-xl mb-8">
                    En Bochor Consultores, te ayudamos a construir equipos fuertes y motivados que impulsan el crecimiento y éxito de tu negocio. Nos especializamos en soluciones personalizadas para la gestión estratégica de recursos humanos.
                </p>
                <div className="flex justify-center space-x-6">
                    <a
                        href="/services"
                        className="bg-transparent border-2 border-gray-700 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
                    >
                        Nuestros Servicios
                    </a>
                    <a
                        href="/contact"
                        className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
                    >
                        Contáctanos
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CompanySummary;
