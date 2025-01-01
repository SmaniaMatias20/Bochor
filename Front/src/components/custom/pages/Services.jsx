import CompanyOfferings from "../CompanyOfferings";
import WhyChooseUs from "../WhyChooseUs";
import Recommendations from "../Recommendations";

export function Services() {
    return (
        <section className="flex flex-col items-center min-h-screen w-full bg-white p-4 md:p-6 lg:p-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8 mt-6">
                Servicios
            </h2>
            {/* Contenedor adaptable */}
            <div className="flex flex-col md:flex-row w-full gap-6 md:gap-0">
                {/* Sección para CompanyOfferings */}
                <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow-md">
                    <CompanyOfferings />
                </div>
                {/* Sección para Recommendations */}
                <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow-md">
                    <Recommendations />
                </div>
            </div>
            {/* Sección adicional para WhyChooseUs */}
            <div className="mt-8 w-full p-4 bg-gray-50 rounded-lg shadow-md">
                <WhyChooseUs />
            </div>
        </section>
    );
}
