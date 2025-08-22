'use client';

import Image from 'next/image';

const images = [
  {
    id: 1,
    src: '/banner10.jpg',
    alt: 'Image 1',
  },
  {
    id: 2,
    src: '/banner11.jpg',
    alt: 'Image 2',
  },
];

const Banner = () => {
  return (
    <div className="w-[90%] mx-auto my-6 flex flex-col px-3 sm:px-6 md:px-10">
      <div className="w-full rounded-xl overflow-hidden flex items-center relative text-white">
        {/* First Image (Always Visible) */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Second Image (Hidden on small, visible on md+) */}
        <div className="hidden md:block relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay Text */}
        <div className="absolute top-1/2 left-[5%] sm:left-[10%] right-[20%] md:right-[40%] lg:right-[55%] -translate-y-1/2 text-left">
          <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold drop-shadow-md">
            WE MADE YOUR EVERYDAY FASHION BETTER!
          </h1>
          <p className="text-sm sm:text-base md:text-lg mt-2">
            In our journey to make your everyday fashion Euphorioa presents
            EVERYDAY wear range – Comfortable & Affordable fashion 24*7
          </p>
          <button className="mt-4 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-bold bg-white text-black rounded-md hover:bg-gray-300 transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
