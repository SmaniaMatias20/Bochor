import Banner from "../Banner";
import Clients from "../Clients";
import CompanySummary from "../CompanySummary";

export function Home() {
  return (
    <section className="flex flex-col w-full bg-white">
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