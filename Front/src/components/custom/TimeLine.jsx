const Timeline = () => {
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-screen-xl mx-auto text-center">
                <div className="relative">
                    <div className="flex flex-col md:flex-row justify-between">
                        {/* Hito 1 */}
                        <div className="mb-8 md:mb-0">
                            <div className="bg-gray-500 text-white p-3 rounded-full mb-2 text-sm">2010</div>
                            <p className="text-gray-500">Fundación de la empresa.</p>
                        </div>
                        {/* Hito 2 */}
                        <div className="mb-8 md:mb-0">
                            <div className="bg-gray-500 text-white p-3 rounded-full mb-2 text-sm">2012</div>
                            <p className="text-gray-500">Apertura de la primera oficina en la ciudad.</p>
                        </div>
                        {/* Hito 3 */}
                        <div className="mb-8 md:mb-0">
                            <div className="bg-gray-500 text-white p-3 rounded-full mb-2 text-sm">2015</div>
                            <p className="text-gray-500">Expansión internacional con una nueva oficina en Brasil.</p>
                        </div>
                        {/* Hito 4 */}
                        <div className="mb-8 md:mb-0">
                            <div className="bg-gray-500 text-white p-3 rounded-full mb-2 text-sm">2018</div>
                            <p className="text-gray-500">Lanzamiento de la plataforma de capacitación en línea.</p>
                        </div>
                        {/* Hito 5 */}
                        <div className="mb-8 md:mb-0">
                            <div className="bg-gray-500 text-white p-3 rounded-full mb-2 text-sm">2020</div>
                            <p className="text-gray-500">Reconocimiento como una de las mejores consultoras de recursos humanos del país.</p>
                        </div>
                        {/* Hito 6 */}
                        <div className="mb-8 md:mb-0">
                            <div className="bg-gray-500 text-white p-3 rounded-full mb-2 text-sm">2022</div>
                            <p className="text-gray-500">Implementación de servicios de inteligencia artificial en el proceso de selección.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
