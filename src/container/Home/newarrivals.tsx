'use client';

import Image from "next/image";
import { useRef } from "react";

const newArrivals = [
  { id: 1, src: '/banner1.jpg', title: 'Knitted Joggers' },
  { id: 2, src: '/banner2.jpg', title: 'Full Sleeve' },
  { id: 3, src: '/banner3.jpg', title: 'Active T-Shirts' },
  { id: 4, src: '/banner2.jpg', title: 'Urban Shirts' },
];

const NewArrivals = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-[90%] mx-auto flex flex-col p-5 -mt-10">
      {/* Heading */}
      <div className="flex items-center h-[50px] justify-start gap-3 mb-5">
        <div className="w-2 h-8 rounded-full bg-gradient-to-b from-violet-500 to-violet-700" />
        <h1 className="text-xl md:text-2xl font-bold text-black">New Arrivals</h1>
      </div>

      {/* Slider Container */}
      <div className="relative m-1">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="Flex hidden md:block absolute -left-8 top-1/2 -translate-y-1/2  rounded-full w-10 h-10 items-center justify-center hover:bg-gray-100"
        >
          ←
        </button>

        {/* Scrollable Items */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth md:grid md:grid-cols-4 md:overflow-x-hidden"
        >
          {newArrivals.map((item) => (
            <div
              key={item.id}
              className="min-w-[220px] md:min-w-0 text-center p-2 flex-shrink-0"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={220}
                height={200}
                className="w-full h-auto rounded-lg object-cover"
              />
              <p className="mt-2 text-sm md:text-base text-gray-800 font-bold">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="Flex hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 items-center justify-center hover:bg-gray-100"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;
