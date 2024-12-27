import MissionVisionValues from "../MissionVisionValues";
import Timeline from "../TimeLine";
import Employees from "../Employees";


export function About() {
    return (
        <section className="flex flex-col items-center min-h-screen w-full bg-white p-0 md:p-0 lg:p-0">
            <Employees />
            <Timeline />
            <MissionVisionValues />
        </section>
    );
}
