import React from 'react';

const Timeline = () => {
    const events = [
        {
            year: "2015",
            title: "Fundación",
            description: "Iniciamos como una pequeña firma de asesoría para PYMEs, ofreciendo servicios personalizados.",
        },
        {
            year: "2017",
            title: "Expansión",
            description: "Ampliamos nuestros servicios para incluir reclutamiento y selección, ayudando a más empresas a crecer.",
        },
        {
            year: "2020",
            title: "Reconocimiento",
            description: "Recibimos el premio a la Innovación Empresarial por nuestro compromiso con la excelencia.",
        },
        {
            year: "2023",
            title: "Liderazgo",
            description: "Nos consolidamos como líderes en el sector, atendiendo a más de 200 empresas.",
        },
    ];

    return (
        <section className="py-16 px-4 bg-gray-50 w-full">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                Historia de la Empresa
            </h2>

            <div className="flex flex-col md:flex-row md:justify-center items-start space-y-8 md:space-y-0 md:space-x-12">
                {events.map((event, index) => (
                    <div key={index} className="flex items-center">

                        {/* Contenido del evento */}
                        <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 max-w-xs border border-gray-200">
                            <div className="text-xl font-bold text-gray-950">{event.year}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mt-2">
                                {event.title}
                            </h3>
                            <p className="text-gray-600 mt-2">{event.description}</p>
                        </div>
                        {/* Línea vertical */}
                        {index !== events.length - 1 && (
                            <div className="w-1 bg-gray-300 h-24 hidden md:block"></div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;
