"use client";

import { useState } from "react";
import { Button } from "../shadcn/button";
import image1 from "../../img/1.png";
import image2 from "../../img/2.png";
import image3 from "../../img/3.png";
import image4 from "../../img/4.png";

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        image1,  // Reemplaza con las rutas correctas de tus imágenes
        image2,
        image3,
        image4,
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full h-[500px] overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Botones de navegación */}
            <Button
                onClick={handlePrev}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            >
                {"<"}
            </Button>

            <Button
                onClick={handleNext}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            >
                {">"}
            </Button>
        </div>
    );
};

export default Banner;
