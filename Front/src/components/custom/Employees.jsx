import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../shadcn/card';
import employee from "../../img/empleado.png";
import employee1 from "../../img/empleado1.jpg";
import employee2 from "../../img/empleado2.jpg";
import employee3 from "../../img/empleado3.jpg";

const Employees = () => {
    const employees = [
        {
            name: "Juan Pérez",
            position: "Gerente de Recursos Humanos",
            description: "Encargado de liderar el equipo de recursos humanos, responsable de la gestión de talento y desarrollo organizacional.",
            image: employee3
        },
        {
            name: "María González",
            position: "Coordinadora de Capacitación",
            description: "Responsable de la planificación y ejecución de programas de capacitación para el desarrollo profesional del personal.",
            image: employee1
        },
        {
            name: "Carlos Rodríguez",
            position: "Consultor Senior",
            description: "Consultor experimentado en la gestión de procesos de selección y asesoramiento estratégico para empresas.",
            image: employee2
        },
    ];

    return (
        <section className="py-16 px-4 bg-gray-50">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                Nuestro equipo de trabajo
            </h2>

            {/* Contenedor responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
                {employees.map((employee, index) => (
                    <Card
                        key={index}
                        className="shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
                    >
                        {/* Imagen en la parte superior */}
                        <div className="w-full h-64">
                            <img
                                src={employee.image}
                                alt={employee.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        {/* Encabezado */}
                        <CardHeader className="p-4">
                            <CardTitle className="font-semibold text-center text-lg">
                                {employee.name}
                            </CardTitle>
                            <CardDescription className="font-semibold text-gray-600">
                                {employee.position}
                            </CardDescription>
                        </CardHeader>
                        {/* Descripción */}
                        <CardContent className="p-4">
                            <p className="text-gray-700 text-sm">{employee.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Employees;
