import { List } from 'lucide-react'; // Importar el ícono de Lucide React
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../shadcn/accordion';

const CompanyOfferings = () => {
    const offerings = [
        {
            title: "Integración Cultural",
            description: "La integración cultural es un elemento clave para el éxito de cualquier organización. Como empresa especializada en servicios de integración cultural, ofrecemos soluciones a medida para ayudar a otras empresas a construir equipos diversos, inclusivos y cohesionados. Nuestro enfoque se centra en comprender las necesidades específicas de cada cliente y desarrollar estrategias personalizadas que fomenten la integración cultural en todos los niveles de la organización."
        },
        {
            title: "Asesoría Legal a PYMEs",
            description: "En el dinámico mundo empresarial, la gestión efectiva de los recursos humanos es fundamental para el crecimiento y la estabilidad de cualquier organización. En nuestra consultora de recursos humanos, comprendemos las complejidades legales a las que se enfrentan las pequeñas y medianas empresas (PYMEs) en la gestión de su talento humano. Por eso, ofrecemos servicios de asesoría legal especializados para garantizar que tu equipo sea un activo estratégico para tu negocio."
        },
        {
            title: "Reclutamiento y Selección",
            description: "Nuestro compromiso como proveedores de servicios de reclutamiento y selección va más allá de simplemente encontrar candidatos calificados. Nos esforzamos por comprender profundamente la esencia de su empresa: su cultura, sus valores fundamentales y los requisitos específicos del puesto que necesita cubrir. Esta comprensión nos permite no solo identificar a los candidatos con las habilidades técnicas necesarias, sino también con el ajuste cultural adecuado para integrarse perfectamente en su equipo."
        },
    ];

    return (
        <section className="py-16 px-4 bg-gray-50 w-full">

            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8 flex items-center justify-center space-x-2">
                <span>Servicios</span>
                <List className="text-gray-800" size={24} />
            </h2>
            <Accordion type="single" collapsible className="space-y-4 w-full">
                {offerings.map((offering, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-xl font-semibold text-gray-800 p-4 border-b-2">
                            {offering.title}
                        </AccordionTrigger>
                        <AccordionContent className="p-4 text-gray-600 text-sm">
                            <p>{offering.description}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

        </section>
    );
};

export default CompanyOfferings;
