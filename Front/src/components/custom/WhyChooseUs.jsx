import { Settings, CheckCircle, RefreshCcw, Users } from 'lucide-react';

const WhyChooseUs = () => {
    return (
        <section className="bg-white ">
            <div className="max-w-screen-xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">¿Por qué elegirnos?</h2>
                <p className="text-lg text-gray-600 mb-12">
                    En Bochor Consultores, nos destacamos por nuestra capacidad de adaptarnos a las necesidades
                    específicas de cada cliente. Nuestro enfoque personalizado garantiza soluciones efectivas
                    alineadas con tus objetivos y valores empresariales.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <Settings className="text-xl text-gray-800" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Enfoque Personalizado</h3>
                        <p className="text-gray-600 text-center">
                            Nos adaptamos a las necesidades de cada cliente, proporcionando soluciones a medida que
                            se alinean con sus objetivos empresariales.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <CheckCircle className="text-xl text-gray-800" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Compromiso con la Calidad</h3>
                        <p className="text-gray-600 text-center">
                            Nos comprometemos con la calidad en cada aspecto de nuestro trabajo, asegurando soluciones
                            eficientes y efectivas.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <RefreshCcw className="text-xl text-gray-800" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Mejora Continua</h3>
                        <p className="text-gray-600 text-center">
                            Buscamos constantemente mejorar y optimizar nuestros servicios, manteniéndonos actualizados
                            con las últimas tendencias en la industria.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <Users className="text-xl text-gray-800" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Experiencia y Confianza</h3>
                        <p className="text-gray-600 text-center">
                            Contamos con un equipo de expertos que brindan confianza y resultados sólidos en cada proyecto.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
