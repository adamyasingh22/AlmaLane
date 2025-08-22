'use client';

import Image from "next/image";

const cardData = [
  {
    id: 1,
    title: 'Hawaiian Shirts',
    subtitle: 'Dress up in summer vibe',
    discount: 'UPTO 50% OFF',
    button: 'SHOP NOW',
    bg: '/banner4.jpg',
  },
  {
    id: 2,
    title: 'Printed T-Shirt',
    subtitle: 'New Designs Every Week',
    discount: 'UPTO 40% OFF',
    tag: 'Limited Stock',
    button: 'SHOP NOW',
    bg: '/banner5.jpg',
  },
  {
    id: 3,
    title: 'Cargo Joggers',
    subtitle: 'Move with style & comfort',
    discount: 'UPTO 50% OFF',
    button: 'SHOP NOW',
    bg: '/banner6.jpg',
  },
  {
    id: 4,
    title: 'Urban Shirts',
    subtitle: 'Live In Comfort',
    discount: 'FLAT 60% OFF',
    button: 'SHOP NOW',
    bg: '/banner7.jpg',
  },
  {
    id: 5,
    title: 'Oversized T-Shirts',
    subtitle: 'Street Style Icon',
    discount: 'FLAT 60% OFF',
    button: 'SHOP NOW',
    bg: '/banner8.jpg',
  },
  {
    id: 6,
    title: 'Oversized T-Shirts',
    subtitle: 'Street Style Icon',
    discount: 'FLAT 60% OFF',
    button: 'SHOP NOW',
    bg: '/banner3.jpg',
  },
];

const BigSavingDays = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col p-5">
      {/* Heading */}
      <div className="flex items-center h-[50px] gap-3 mb-6">
        <div className="w-2 h-8 rounded-full bg-gradient-to-b from-violet-500 to-violet-700" />
        <h1 className="text-xl md:text-2xl font-bold text-black">Big Saving Days</h1>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cardData.map((item) => (
          <div
            key={item.id}
            className="relative h-[350px] md:h-[200px] sm:h-[100px] rounded-xl overflow-hidden group"
          >
            {/* Background Image */}
            <Image
              src={item.bg}
              alt={item.title}
              fill
              className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay Content */}
            <div className="absolute top-1/2 left-8 -translate-y-1/2 text-white max-w-[80%]">
              {item.tag && (
                <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                  {item.tag}
                </span>
              )}
              <h2 className="text-lg md:text-xl font-bold">{item.title}</h2>
              <p className="text-sm md:text-base">{item.subtitle}</p>
              <p className="text-sm md:text-base font-medium mt-2">{item.discount}</p>
              <div className="text-xl mt-2 pl-10">↓</div>
              <button className="mt-3 bg-white text-black font-semibold rounded-full px-4 py-2 text-sm hover:bg-black hover:text-white transition">
                {item.button}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BigSavingDays;
