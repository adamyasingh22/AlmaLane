'use client';

import Image from 'next/image';

const images = [
  {
    id: 1,
    src: '/logo1.jpg',
    alt: 'Nike Logo',
  },
  {
    id: 2,
    src: '/logo2.png',
    alt: 'H&M Logo',
  },
  {
    id: 3,
    src: '/logo3.jpg',
    alt: 'Levis Logo',
  },
  {
    id: 4,
    src: '/logo4.jpg',
    alt: 'US Polo Assn Logo',
  },
  {
    id: 5,
    src: '/logo5.png',
    alt: 'Puma Logo',
  },
];

const BrandDeals = () => {
  return (
    <div className="flex flex-col items-center bg-[#3c4242] w-[85%] mx-auto mt-10 p-6 rounded-2xl">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center p-2">
        Top Brand Deals
      </h1>
      <h3 className="text-sm md:text-base text-gray-200 text-center mb-6">
        Up To 60% off on brands
      </h3>

      {/* Logos */}
      <div className="flex flex-wrap justify-center items-center gap-6 p-4">
        {images.map((brand, idx) => (
          <div
            key={brand.id}
            className="bg-white rounded-xl shadow-md p-3 md:p-4 flex items-center justify-center"
          >
            <Image
              src={brand.src}
              alt={brand.alt}
              width={120}
              height={60}
              priority={idx === 0}
              className="h-12 w-auto object-contain"
              sizes="(max-width: 768px) 100px, (max-width: 1200px) 120px, 150px"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandDeals;
