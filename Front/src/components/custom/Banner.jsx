"use client";
import { useState, useEffect } from "react";

import PlanetEarth from "./PlanetEarth";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../shadcn/carousel";
import { Rocket, Briefcase, Users, Building } from "lucide-react";

const Banner = () => {


    const messages = [
        {
            title: "Impulsa tu Talento",
            text: "Potenciamos tu talento para alcanzar nuevas metas y desafíos en tu carrera profesional. Nos enfocamos en desarrollar habilidades clave que te diferencien en un mercado laboral altamente competitivo, brindándote herramientas prácticas para crecer y prosperar.",
            icon: <Rocket size={40} className="text-gray-800" />
        },
        {
            title: "Conectamos Oportunidades",
            text: "Conectamos oportunidades laborales con personas apasionadas y comprometidas. Nuestra red de empresas asociadas permite ofrecer propuestas alineadas a tus valores y objetivos profesionales, asegurando un crecimiento sostenido y exitoso.",
            icon: <Briefcase size={40} className="text-gray-800" />
        },
        {
            title: "Desarrollamos Líderes",
            text: "Desarrollamos líderes preparados para afrontar los retos del futuro empresarial. Brindamos programas de formación continua y mentoría personalizada para que los profesionales puedan liderar equipos de trabajo con visión estratégica e innovación.",
            icon: <Users size={40} className="text-gray-800" />
        },
        {
            title: "Transformamos Organizaciones",
            text: "Transformamos organizaciones promoviendo la innovación y el crecimiento sostenible. Ofrecemos soluciones personalizadas para fortalecer la cultura corporativa, optimizar procesos internos y maximizar el rendimiento del equipo.",
            icon: <Building size={40} className="text-gray-800" />
        }
    ];

    return (
        <div className="w-screen h-[500px] md:h-[600px] overflow-hidden relative">
            <Carousel>
                <CarouselContent>
                    {messages.map((message, index) => (
                        <CarouselItem key={index} className="w-full h-[500px] md:h-[600px] relative">
                            <div
                                className="absolute top-0 left-0 w-full h-full flex items-center justify-end p-10 md:p-16 z-60 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950"
                            >
                                {/* Renderizar el componente adecuado según si es día o noche */}
                                <PlanetEarth />

                                <div className="bg-white p-8 md:p-14 rounded-lg shadow-lg max-w-lg z-999">
                                    <div className="flex items-center mb-6">
                                        {message.icon}
                                        <h2 className="text-xl md:text-2xl font-semibold ml-4 text-gray-800">
                                            {message.title}
                                        </h2>
                                    </div>
                                    <p className="text-left text-base md:text-lg font-light leading-relaxed text-gray-700">
                                        {message.text}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default Banner;
