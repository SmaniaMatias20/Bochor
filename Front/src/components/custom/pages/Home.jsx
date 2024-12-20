import Banner from "../Banner";
import { Users, ClipboardList, Briefcase, Clock } from "lucide-react";

/**
 * Componente principal de la página de inicio para una consultora de recursos humanos.
 * 
 * Este componente renderiza una sección con un banner y un conjunto de
 * iconos que representan diferentes áreas de enfoque, incluyendo
 * selección de personal, administración de nóminas, desarrollo organizacional y gestión del tiempo.
 * Cada icono tiene un efecto de rotación al pasar el ratón por encima,
 * mejorando la interactividad visual de la interfaz.
 * 
 * @returns {JSX.Element} El contenido de la página de inicio para una consultora de recursos humanos.
 */
export function Home() {
  return (
    <section className="flex flex-col items-center min-h-screen w-full bg-white p-0 md:p-0 lg:p-0">

      <Banner />


      <div className="flex flex-col sm:flex-row h-auto md:h-48 items-center justify-center space-y-6 sm:space-y-0 sm:space-x-16 p-6 h-full w-full">
        <div className="flex flex-col items-center font">
          <Users size={64} className="transition-transform duration-500 ease-in-out hover:rotate-[360deg]" />
          <h3 className="font-bold">SELECCIÓN DE PERSONAL</h3>
        </div>
        <div className="flex flex-col items-center font">
          <ClipboardList size={64} className="transition-transform duration-500 ease-in-out hover:rotate-[360deg]" />
          <h3 className="font-bold">ADMINISTRACIÓN DE NÓMINAS</h3>
        </div>
        <div className="flex flex-col items-center font">
          <Briefcase size={64} className="transition-transform duration-500 ease-in-out hover:rotate-[360deg]" />
          <h3 className="font-bold">DESARROLLO ORGANIZACIONAL</h3>
        </div>
        <div className="flex flex-col items-center font">
          <Clock size={64} className="transition-transform duration-500 ease-in-out hover:rotate-[360deg]" />
          <h3 className="font-bold">GESTIÓN DEL TIEMPO</h3>
        </div>
      </div>
    </section>
  );
}
