"use client";

import { useState } from "react";
import { Button } from "../shadcn/button";

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "/path/to/your/image1.jpg",  // Reemplaza con las rutas correctas de tus imágenes
        "/path/to/your/image2.jpg",
        "/path/to/your/image3.jpg",
        "/path/to/your/image4.jpg",
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
