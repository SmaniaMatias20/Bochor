import CompanyOfferings from "../CompanyOfferings";
import WhyChooseUs from "../WhyChooseUs";
import Recommendations from "../Recommendations";
import { FaTools } from 'react-icons/fa';

export function Services() {
    return (
        <section className="flex flex-col items-center min-h-screen w-full bg-white p-0 md:p-0 lg:p-0">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8 flex items-center justify-center mt-6 space-x-2">
                <span>Servicios</span>
                <FaTools className="text-gray-800" size={24} />
            </h2>
            {/* Contenedor dividido en dos mitades */}
            <div className="flex w-full h-[500px]">
                {/* Mitad para CompanyOfferings */}
                <div className="w-1/2 p-4">
                    <CompanyOfferings />
                </div>
                {/* Mitad para Recommendations */}
                <div className="w-1/2 p-4">
                    <Recommendations />
                </div>
            </div>
            {/* Sección adicional */}
            <WhyChooseUs />
        </section>
    );
}
