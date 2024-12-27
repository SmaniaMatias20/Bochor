import CompanyOfferings from "../CompanyOfferings";
import WhyChooseUs from "../WhyChooseUs";


export function Services() {
    return (
        <section className="flex flex-col items-center min-h-screen w-full bg-white p-0 md:p-0 lg:p-0">
            <CompanyOfferings />
            <WhyChooseUs />
        </section>
    );
}
