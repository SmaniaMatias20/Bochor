const OfficeHours = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Horarios de Atención</h2>
            <ul className="mt-4 space-y-2 text-gray-600 text-center">
                <li className="py-2 border-b border-gray-200">Lunes a Viernes: <span className="font-semibold">9:00 AM - 6:00 PM</span></li>
                <li className="py-2 border-b border-gray-200">Sábados: <span className="font-semibold">10:00 AM - 2:00 PM</span></li>
                <li className="py-2">Domingos y Feriados: <span className="font-semibold">Cerrado</span></li>
            </ul>
        </div>
    );
};

export default OfficeHours;
