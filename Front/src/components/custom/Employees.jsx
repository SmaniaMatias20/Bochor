import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../shadcn/card';
import employee from "../../img/empleado.png";


const Employees = () => {
    const employees = [
        {
            name: "Juan Pérez",
            position: "Gerente de Recursos Humanos",
            description: "Encargado de liderar el equipo de recursos humanos, responsable de la gestión de talento y desarrollo organizacional.",
            image: employee
        },
        {
            name: "María González",
            position: "Coordinadora de Capacitación",
            description: "Responsable de la planificación y ejecución de programas de capacitación para el desarrollo profesional del personal.",
            image: employee
        },
        {
            name: "Carlos Rodríguez",
            position: "Consultor Senior",
            description: "Consultor experimentado en la gestión de procesos de selección y asesoramiento estratégico para empresas.",
            image: employee
        },
        // Puedes agregar más empleados aquí...
    ];

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-screen-xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">Nuestro Equipo</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {employees.map((employee, index) => (
                        <Card key={index} className="max-w-xs shadow-lg rounded-xl">
                            <CardHeader className="p-8 mb-4"> {/* Eliminar padding para que la imagen ocupe toda la parte superior */}
                                {/* Imagen en la parte superior */}
                                <div className="w-full h-48 overflow-hidden"> {/* Altura ajustada para la imagen */}
                                    <img src={employee.image} alt={employee.name} className="object-cover w-full h-full" />
                                </div>
                                <div className="mt-4">
                                    <CardTitle className="font-semibold text-center text-lg">{employee.name}</CardTitle>
                                    <CardDescription className="font-semibold text-gray-600">{employee.position}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 text-sm">{employee.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Employees;
