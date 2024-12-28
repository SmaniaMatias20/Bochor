import Banner from "../Banner";
import Clients from "../Clients";
import CalendarEvents from "../CalendarEvents";

export function Home() {
  return (
    <section className="flex flex-col items-center min-h-screen w-full bg-white p-0 md:p-0 lg:p-0">
      <Banner />
      <CalendarEvents />
      <Clients />
    </section>
  );
}
