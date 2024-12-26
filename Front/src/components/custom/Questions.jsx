const FAQ = () => {
    const faqs = [
        { question: "¿Qué servicios de recursos humanos ofrecen?", answer: "Ofrecemos selección de personal, capacitación, evaluación de desempeño y asesoramiento laboral." },
        { question: "¿Cómo puedo postularme a una vacante?", answer: "Puedes enviarnos tu currículum a través del formulario de contacto o por correo electrónico." },
        { question: "¿Realizan evaluaciones psicométricas?", answer: "Sí, contamos con herramientas para evaluar habilidades y competencias específicas." },
        { question: "¿Ofrecen programas de capacitación para empresas?", answer: "Sí, diseñamos programas personalizados según las necesidades de tu empresa." },
        { question: "¿Cómo puedo agendar una consulta?", answer: "Puedes agendar una consulta completando nuestro formulario de contacto o llamándonos directamente." },
        { question: "¿Cómo puedo postularme a una vacante?", answer: "Puedes enviarnos tu currículum a través del formulario de contacto o por correo electrónico." },
        { question: "¿Realizan evaluaciones psicométricas?", answer: "Sí, contamos con herramientas para evaluar habilidades y competencias específicas." },
        { question: "¿Ofrecen programas de capacitación para empresas?", answer: "Sí, diseñamos programas personalizados según las necesidades de tu empresa." },
        { question: "¿Cómo puedo agendar una consulta?", answer: "Puedes agendar una consulta completando nuestro formulario de contacto o llamándonos directamente." },
        { question: "¿Cómo puedo postularme a una vacante?", answer: "Puedes enviarnos tu currículum a través del formulario de contacto o por correo electrónico." },
        { question: "¿Realizan evaluaciones psicométricas?", answer: "Sí, contamos con herramientas para evaluar habilidades y competencias específicas." },
        { question: "¿Ofrecen programas de capacitación para empresas?", answer: "Sí, diseñamos programas personalizados según las necesidades de tu empresa." },
        { question: "¿Cómo puedo agendar una consulta?", answer: "Puedes agendar una consulta completando nuestro formulario de contacto o llamándonos directamente." },
    ];

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">Preguntas Frecuentes</h2>
            <div className="border-2 border-gray-300 rounded-xl">
                <div className=" p-6 bg-white h-80 overflow-y-auto">
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
