const Testimonials = () => {
    const testimonios = [
        {
            text: "El servicio de Recursos Humanos fue excelente. Nos ayudaron a encontrar los mejores talentos para nuestro equipo.",
            author: "Juan Pérez, CEO de Empresa XYZ"
        },
        {
            text: "Trabajar con este equipo ha sido una experiencia increíble, siempre atentos y con soluciones efectivas.",
            author: "Ana Gómez, Directora de Marketing"
        },
        {
            text: "Gracias a su asesoría, pudimos mejorar nuestros procesos de selección y reducir el tiempo de contratación.",
            author: "Carlos López, Gerente de Recursos Humanos"
        },
        {
            text: "Excelente atención y profesionalismo. Nos ayudaron a conformar un equipo de trabajo increíble.",
            author: "María Rodríguez, Directora de Ventas"
        },
        {
            text: "Un servicio personalizado que se adapta perfectamente a las necesidades de la empresa. Muy recomendados.",
            author: "José Martínez, CEO de StartUp123"
        },
        {
            text: "Nos ayudaron a crear estrategias de retención de talento que resultaron en un gran éxito.",
            author: "Lucía Fernández, Jefa de Talento Humano"
        }
    ];

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">Lo que dicen nuestro clientes</h2>
            <div className="border-2 border-gray-300 rounded-xl w-full">
                <div className="max-h-64 overflow-y-auto space-y-4">
                    {testimonios.map((testimonio, index) => (
                        <div key={index}>
                            <p className="text-gray-600 italic">"{testimonio.text}"</p>
                            <p className="mt-2 text-gray-800 font-semibold">- {testimonio.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Testimonials;
