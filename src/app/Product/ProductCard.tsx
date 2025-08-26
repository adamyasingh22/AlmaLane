"use client";

import Image from "next/image";
import type { Product } from "./types";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
    const [liked, setLiked] = useState(false);
  return (
    <div
      className="relative flex flex-col rounded-2xl border shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 p-2"
    >
      {/* Image */}
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={300}
        className="w-full h-56 object-cover"
      />

      {/* Favorite Button (top-right) */}
      <button
        onClick={() => setLiked(!liked)}
        className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md transition-colors ${
          liked ? "text-red-500" : "text-gray-400"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 
          3.41 1.01 4.13 2.44h1.74C14.09 5.01 15.76 4 17.5 4 
          20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 
          11.54L12 21.35z" />
        </svg>
      </button>

      {/* Text + Price */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500">Explore Now</p>
        </div>

        <button className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
          {product.price}
        </button>
      </div>
    </div>
  );
}

