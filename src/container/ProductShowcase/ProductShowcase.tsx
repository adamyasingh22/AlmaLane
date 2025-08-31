"use client";

import Image from "next/image";

export default function ProductShowcase() {
  return (
    <div className="flex flex-wrap gap-4 bg-white px-4 text-gray-800 font-sans">
      {/* Gallery */}
      <div className="flex flex-1 min-w-[300px] gap-10 justify-center">
        {/* Thumbnails */}
        {/* <div className="flex flex-col gap-3 mt-[30%] pl-5">
          <Image
            src="https://img.freepik.com/free-photo/young-businesswoman-jacket-standing-posing-gray-wall_114579-81649.jpg"
            alt="Black"
            width={70}
            height={70}
            className="w-[70px] h-[70px] object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-black"
          />
          <Image
            src="https://img.freepik.com/free-photo/woman-holding-skateboard-back_23-2148259460.jpg"
            alt="Pink"
            width={70}
            height={70}
            className="w-[70px] h-[70px] object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-black"
          />
          <Image
            src="https://img.freepik.com/free-photo/young-female-practicing-kickboxing_23-2149127349.jpg"
            alt="Other"
            width={70}
            height={70}
            className="w-[70px] h-[70px] object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-black"
          />
        </div> */}

        {/* Main Image */}
        <Image
          src="/man8.jpg"
          alt="Main hoodie"
          width={300}
          height={300}
          className=" object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 min-w-[300px] mt-8 pr-5">
        <h1 className="text-2xl font-semibold">
          Raven Hoodie With Black colored Design
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 my-3">
          <span className="text-yellow-500 text-lg">★★★★☆</span>
          <span className="text-gray-500 text-sm">3.5 (120 comments)</span>
        </div>

        {/* Size Selector */}
        <div className="my-5">
          <strong>Select Size:</strong>
          <div className="mt-2 flex gap-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className="px-3 py-1 border border-gray-400 rounded-md hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="flex flex-col gap-2 mb-5">
          <strong>Colours Available:</strong>
          <div className="flex gap-5 mt-1">
            <div className="w-5 h-5 rounded-full cursor-pointer border-2 border-black bg-black"></div>
            <div className="w-5 h-5 rounded-full cursor-pointer bg-yellow-400"></div>
            <div className="w-5 h-5 rounded-full cursor-pointer bg-rose-500"></div>
            <div className="w-5 h-5 rounded-full cursor-pointer bg-fuchsia-400"></div>
          </div>
        </div>

        {/* Price Row */}
        <div className="flex items-center gap-5 my-5">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-700">
            Add to cart
          </button>
          <span className="text-xl font-semibold">$63.00</span>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-y-5 mt-8 mb-8 text-gray-600 text-base">
          <div className="flex items-center">🔒 Secure payment</div>
          <div className="flex items-center">📏 Size & Fit</div>
          <div className="flex items-center">🚚 Free shipping</div>
          <div className="flex items-center">🔁 Free Returns</div>
        </div>
      </div>
    </div>
  );
}
