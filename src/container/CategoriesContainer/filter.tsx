"use client";
import CategoryFilter from "@/components/Category-filter";
import Image from "next/image";
import { useState } from "react";




interface CardProps {
  hex: string;
}

const Filter = () => {
    const [selectedCategory, setSelectedCategory] = useState("all")
  return (
    <div className="w-full h-auto flex flex-col border border-black p-5 ">
      {/* Filter Header */}
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Filter</h2>
        <Image
          src="/filter.png"
          alt="filter"
          width={20}
          height={20}
          className="bg-gray-100 p-1 rounded cursor-pointer hover:bg-gray-600"
        />
      </div>
      <hr className="border-t border-gray-600 my-8" />

      {/* Categories */}
      <CategoryFilter onCategoryChange={setSelectedCategory} activeCategory={selectedCategory}/>
      <hr className="border-t border-gray-600 my-8" />

      {/* Colors */}
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Color</h2>
        <Image
          src="/filter.png"
          alt="filter"
          width={20}
          height={20}
          className="bg-gray-100 p-1 rounded cursor-pointer hover:bg-gray-600"
        />
      </div>
      <hr className="border-t border-gray-600 my-8" />

      {/* <div className="grid grid-cols-4 gap-5 w-full my-2
        lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {filters.colors.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-between"
          >
            <div
              className="w-full h-10 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-200"
              style={{ backgroundColor: item.hex }}
            ></div>
            <p className="text-xs text-black">{item.name}</p>
          </div>
        ))}
      </div> */}
      <hr className="border-t border-gray-600 my-8" />

      {/* Sizes */}
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Size</h2>
        <Image
          src="/filter.png"
          alt="filter"
          width={20}
          height={20}
          className="bg-gray-100 p-1 rounded cursor-pointer hover:bg-gray-600"
        />
      </div>
      <hr className="border-t border-gray-600 my-8" />

      {/* <div className="grid grid-cols-3 gap-5 w-full my-2
        md:grid-cols-2 sm:grid-cols-1">
        {filters.size.map((item) => (
          <div
            key={item.id}
            className="flex justify-center items-center p-2 border border-black rounded-lg cursor-pointer hover:bg-gray-600"
          >
            <p className="text-xs text-black">{item.name}</p>
          </div>
        ))}
      </div> */}
      <hr className="border-t border-gray-600 my-8" />

      {/* Dress Style */}
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Dress Style</h2>
        <Image
          src="/filter.png"
          alt="filter"
          width={20}
          height={20}
          className="bg-gray-100 p-1 rounded cursor-pointer hover:bg-gray-600"
        />
      </div>
      <hr className="border-t border-gray-600 my-8" />

      {/* {filters.style.map((item) => (
        <div key={item.id} className="w-full flex flex-col p-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs text-black">{item.name}</h3>
            <Image
              src="/arrow.png"
              alt="arrow"
              width={14}
              height={14}
              className="bg-gray-100 p-1 rounded cursor-pointer hover:bg-gray-600"
            />
          </div>
        </div>
      ))} */}
      <hr className="border-t border-gray-600 my-8" />

      {/* Price */}
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Price</h2>
        <Image
          src="/filter.png"
          alt="filter"
          width={20}
          height={20}
          className="bg-gray-100 p-1 rounded cursor-pointer hover:bg-gray-600"
        />
      </div>
      <hr className="border-t border-gray-600 my-8" />
    </div>
  );
};

export default Filter;
