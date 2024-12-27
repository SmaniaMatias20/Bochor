import ContactForm from "../ContactForm";
import Questions from "../Questions";
import MapEmbed from "../MapEmbed";


export function Contact() {
    return (
        <section className="flex flex-col w-full bg-white">
            <MapEmbed />
            <div className="flex p-4 gap-4">
                <div className="flex flex-col items-center w-2/6">
                    <ContactForm />
                </div>
                <div className="flex flex-col  gap-4 w-4/6">
                    <Questions />

                </div>

            </div>
        </section>
    );
}

