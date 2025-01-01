"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../shadcn/carousel";
import image1 from "../../img/1.png";
import image2 from "../../img/2.png";
import image3 from "../../img/3.png";
import image4 from "../../img/4.png";

const Banner = () => {
    const images = [image1, image2, image3, image4];

    return (
        <div className="w-screen h-[500px] md:h-[600px] overflow-hidden">
            <Carousel>
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="w-full h-[500px] md:h-[600px]">
                            <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-black text-white p-2 rounded-full" />
                <CarouselNext className="bg-black text-white p-2 rounded-full" />
            </Carousel>
        </div>
    );
};

export default Banner;
