'use client';

import { Button } from "@/components/UI/button";
import Image from "next/image";

const images = [
  {
    id: 1,
    src: '/banner1.jpg',
    alt: 'Image 1',
    subtitle: 'Low Price',
    title: 'High Coziness',
    description: 'UPTO 50% OFF',
  },
  {
    id: 2,
    src: '/banner2.jpg',
    alt: 'Image 2',
    subtitle: 'Beyoung Presents',
    title: 'Breezy Summer Styles',
    description: 'UPTO 50% OFF',
  },
];

const Deals = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-[88%] my-10 mx-auto p-5">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative w-full rounded-xl overflow-hidden flex items-center text-white font-bold h-[200px] md:h-[400px]  "
        >
          {/* Background Image */}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute top-1/2 left-8 -translate-y-1/2 text-left">
            <p className="text-sm md:text-base mb-2">{image.subtitle}</p>
            <h1 className="text-xl md:text-2xl font-bold">{image.title}</h1>
            <p className="text-lg md:text-xl mt-2">{image.description}</p>
            {/* <button className="mt-4 px-5 py-2 md:px-6 md:py-3 text-sm md:text-lg font-bold bg-white text-black rounded-md hover:bg-gray-200">
              Shop Now
            </button> */}
            <Button variant="primary" size="sm" className="mt-4 px-5 py-2 md:px-6 md:py-3 text-sm md:text-lg font-bold bg-white text-black rounded-md hover:bg-gray-200">
                Shop Now  
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Deals;
