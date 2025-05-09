const FAQ = () => {
    const faqs = [
        { question: "¿Qué tipo de consultoría en recursos humanos ofrecen?", answer: "Ofrecemos consultoría estratégica, reclutamiento y selección, desarrollo organizacional y gestión del talento." },
        { question: "¿Cómo puede mi empresa mejorar la retención de empleados?", answer: "Trabajamos contigo para diseñar estrategias de motivación, desarrollo profesional y cultura organizacional que mejoren la satisfacción y el compromiso." },
        { question: "¿Qué es el análisis de clima laboral y cómo se realiza?", answer: "El análisis de clima laboral mide la percepción de los empleados sobre el ambiente de trabajo. Lo realizamos mediante encuestas, entrevistas y grupos focales." },
        { question: "¿Pueden ayudarnos a crear un plan de formación para nuestros empleados?", answer: "Sí, diseñamos planes de formación a medida para el desarrollo de habilidades específicas, mejorando la productividad y el desempeño del equipo." },
        { question: "¿Cómo puede nuestra empresa garantizar una correcta integración de nuevos empleados?", answer: "Implementamos programas de onboarding y mentoría para que los nuevos empleados se integren rápidamente a la cultura y procesos de la empresa." },
        { question: "¿Qué herramientas utilizan para la evaluación de desempeño?", answer: "Utilizamos evaluaciones de 360 grados, entrevistas de retroalimentación, y análisis de KPIs para medir el desempeño de los empleados." },
        { question: "¿Realizan análisis de competencias para identificar líderes internos?", answer: "Sí, realizamos evaluaciones de competencias y potencial de liderazgo para identificar a los empleados con mayor capacidad de crecimiento dentro de la empresa." },
    ];


    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 text-center">Preguntas Frecuentes</h2>
            <div className="border-2 border-gray-300 rounded-xl w-full h-full">
                <div className="p-6 bg-white h-96 overflow-y-auto rounded-xl h-full">
                    <div className="divide-y divide-gray-200">
                        {faqs.map((faq, index) => (
                            <div key={index} className="py-4">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQ;
