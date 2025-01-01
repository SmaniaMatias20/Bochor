import Banner from "../Banner";
import Clients from "../Clients";
import CompanySummary from "../CompanySummary";

export function Home() {
  return (
    <section className="flex flex-col items-center min-h-screen w-screen bg-white md:p-6 lg:p-8">
      {/* Sección del banner */}
      <div className="hidden md:block w-screen">
        <Banner />
      </div>

      <div className="w-screen">
        <CompanySummary />
      </div>

      {/* Sección de clientes */}
      <div className="w-screen p-4 bg-gray-50 rounded-lg shadow-md">
        <Clients />
      </div>
    </section>
  );
}