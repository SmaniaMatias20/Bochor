import ContactForm from "../ContactForm";
import Questions from "../Questions";
import OfficeHours from "../OfficeHours";
import MapEmbed from "../MapEmbed";
import Testimonials from "../Testimonials";


export function Contact() {
    return (
        <section className="flex flex-col w-full bg-white">
            <MapEmbed />
            <div className="flex p-4 gap-4">
                <div className="flex flex-col items-center w-2/6">
                    <ContactForm />
                </div>
                <div className="flex flex-col items-center justify-center gap-4 w-4/6">
                    <Questions />
                    <Testimonials />
                </div>

            </div>
        </section>
    );
}

