import Banner from "../Banner";
import Clients from "../Clients";
import CalendarEvents from "../CalendarEvents";
import CompanySummary from "../CompanySummary";

export function Home() {
  return (
    <section className="flex flex-col items-center min-h-screen w-full bg-white p-4 md:p-6 lg:p-8">
      {/* Sección del banner */}
      <Banner />

      {/* Contenedor adaptable para CompanySummary y CalendarEvents */}
      <div className="flex flex-col md:flex-row w-full gap-6 mt-8">
        {/* CompanySummary */}
        <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow-md">
          <CompanySummary />
        </div>

        {/* CalendarEvents */}
        <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow-md">
          <CalendarEvents />
        </div>
      </div>

      {/* Sección de clientes */}
      <div className="mt-8 w-full p-4 bg-gray-50 rounded-lg shadow-md">
        <Clients />
      </div>
    </section>
  );
}
