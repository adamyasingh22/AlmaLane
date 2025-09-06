'use client';

import Image from 'next/image';
import Link from 'next/link';

const categoriesMen = [
  {
    id: 1,
    src: '/man1.jpg',
    title: 'Shirts',
    alt: 'Knitted Joggers',
  },
  {
    id: 2,
    src: '/man2.jpg',
    title: 'Printed Shirts',
    alt: 'Full Sleeve',
  },
  {
    id: 3,
    src: '/man3.jpg',
    title: 'Polo T-Shirts',
    alt: 'Active T-Shirts',
  },
  {
    id: 4,
    src: '/man4.jpg',
    title: 'Polo T-Shirts',
    alt: 'Urban Shirts',
  },
  {
    id: 5,
    src: '/man5.jpg',
    title: 'Hoodies & Sweatshirts',
    alt: 'Knitted Joggers',
  },
  {
    id: 6,
    src: '/man6.jpg',
    title: 'Jeans',
    alt: 'Full Sleeve',
  },
  {
    id: 7,
    src: '/man7.jpg',
    title: 'Activewears',
    alt: 'Active T-Shirts',
  },
  {
    id: 8,
    src: '/man8.jpg',
    title: 'Boxers',
    alt: 'Urban Shirts',
  },
];

const CategoriesMen = ({ heading }: { heading: string }) => {
  return (
    <div className="w-[90%] mx-auto p-5 flex flex-col">
      {/* Heading */}
      <div className="flex items-center h-[50px] justify-start gap-3 mb-8">
        <div className="w-2 h-8 rounded-full bg-gradient-to-b from-violet-500 to-violet-700"></div>
        <h1 className="text-2xl font-bold text-black">{heading}</h1>
      </div>

      {/* Grid */}
      <Link href="/Product" >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categoriesMen.map((category) => (
          <div key={category.id} className="text-left">
            <div className="relative w-full h-[220px] sm:h-[250px] md:h-[280px] lg:h-[320px] rounded-lg overflow-hidden">
              <Image
                src={category.src}
                alt={category.alt}
                fill
                className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Title + Arrow */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex flex-col">
                <p className="text-base font-bold text-gray-800">
                  {category.title}
                </p>
                <p className="text-sm text-gray-600">Explore Now</p>
              </div>
              <button className="text-xl text-black hover:text-gray-500 transition">
                →
              </button>
            </div>
          </div>
        ))}
      </div>
      </Link>
    </div>
  );
};

export default CategoriesMen;
