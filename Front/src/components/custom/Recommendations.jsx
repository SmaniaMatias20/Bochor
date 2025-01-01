"use client";

import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../shadcn/carousel";
import redes from "../../img/redes.png";
import liderazgo from "../../img/liderazgo.png";
import recomendacion from "../../img/recomendacion.png";

const Recommendations = () => {
    const recommendations = [
        { id: 1, image: redes, alt: "Recommendation 1" },
        { id: 2, image: liderazgo, alt: "Recommendation 2" },
        { id: 3, image: recomendacion, alt: "Recommendation 3" }
    ];

    return (
        <div className="flex flex-col items-center">
            {/* Carrusel que cambia solo de imagen */}
            <Carousel
                opts={{
                    align: "center", // Centrado
                    loop: true       // Bucle infinito
                }}
                className="w-full max-w-sm h-[400px]" // Tamaño fijo para mostrar solo una imagen
            >
                <CarouselContent>
                    {recommendations.map((item) => (
                        <CarouselItem
                            key={item.id}
                            className="flex items-center justify-center"
                        >
                            <div className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default Recommendations;
