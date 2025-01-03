import ContactForm from "../ContactForm";
import Questions from "../Questions";
import MapEmbed from "../MapEmbed";
import WhatsAppButton from "../WhatsAppButton";

export function Contact() {
    return (
        <section className="flex flex-col w-full bg-white">
            {/* Mapa */}
            <MapEmbed />

            {/* Contenedor principal */}
            <div className="flex flex-col md:flex-row p-4 gap-4">
                {/* Formulario */}
                <div className="flex flex-col items-center w-full md:w-2/6">
                    <ContactForm />
                </div>

                {/* Preguntas */}
                <div className="flex flex-col gap-3 w-full md:w-4/6">
                    <Questions />
                </div>
                <WhatsAppButton />

            </div>
        </section>
    );
}
