'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const images = [
  {
    src: '/banner1.jpg',
    caption: 'Discover the Latest Trends',
  },
  {
    src: '/banner2.jpg',
    caption: 'Best Deals on Your Favorite Styles',
  },
  {
    src: '/banner3.jpg',
    caption: 'Shop Now & Upgrade Your Wardrobe',
  },
];

const CarouselHome = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Slider */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((item, index) => (
          <div key={index} className="min-w-full relative  h-[250px] md:h-[600px] ">
            <Image
              src={item.src}
              alt={`Slide ${index + 1}`}
              width={1800}
              height={500}
              className='object-cover'
              priority 
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute top-1/2 left-25 transform -translate-y-1/2 text-white text-left">
        <p className=" text-m md:text-lg mb-2">T-Shirt / Tops</p>
        <h1 className="text-2xl md:text-4xl font-bold">{images[currentIndex].caption}</h1>
        <p className="text-xl mt-3">cool / colorful / comfy</p>
        <button 
         onClick={() => router.push("/Product")}
        className="mt-5 px-6 py-3  text-sm md:text-lg font-bold bg-white text-black rounded-md hover:bg-gray-200">
          Shop Now
        </button>
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 text-xl font-bold text-white hover:bg-black/50 rounded-full px-3 py-1"
      >
        ◀
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl font-bold text-white hover:bg-black/50 rounded-full px-3 py-1"
      >
        ▶
      </button>
    </div>
  );
};

export default CarouselHome;
