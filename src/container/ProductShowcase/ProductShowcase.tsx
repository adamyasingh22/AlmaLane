"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { RootState } from "@/store";

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  sizes?: string[];
  colors?: string[];
}

export default function ProductShowcase({ product }: { product: Product }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id == product.id);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.name,
        price: product.price,
        description: product.description || "No description available",
        category: "General",
        image: product.images[0],
        rating: { rate: product.rating, count: product.reviewsCount },
        quantity: 1, 
      })
    );
  };

  return (
    <div className="flex flex-wrap gap-4 bg-white px-3 text-gray-800 font-sans">
      {/* Gallery */}
      <div className="flex flex-1 min-w-[300px] gap-20 justify-center">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3 mt-[30%]">
          {product.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${product.name} ${idx}`}
              width={70}
              height={70}
              className="w-[70px] h-[70px] object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-black"
            />
          ))}
        </div>

        {/* Main Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={300}
          className="object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 min-w-[300px] mt-8 pr-5">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-lg font-medium mt-2">${product.price}</p>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 my-3">
          <span className="text-yellow-500 text-lg">★★★★☆</span>
          <span className="text-gray-500 text-sm">
            {product.rating} ({product.reviewsCount} reviews)
          </span>
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

        <div className="flex items-center gap-5 my-5">
          {isInCart ? (
            <Link href="/cart">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700">
                Added to Cart
              </button>
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-700"
            >
              Add to cart
            </button>
          )}
          <span className="text-xl font-semibold">${product.price}</span>
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
