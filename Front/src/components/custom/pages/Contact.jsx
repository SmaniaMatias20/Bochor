import ContactForm from "../ContactForm";
import Questions from "../Questions";
import OfficeHours from "../OfficeHours";
import MapEmbed from "../MapEmbed";
import Testimonials from "../Testimonials";


export function Contact() {
    return (
        <section className="flex flex-col w-full gap-4 bg-white h-screen">
            <MapEmbed />
            <div className="flex">
                <div className="w-2/6 p-4">
                    <ContactForm />
                </div>
                <div className="flex flex-col gap-4 w-4/6">
                    <Questions />
                    <Testimonials />
                </div>

            </div>
        </section>
    );
}

