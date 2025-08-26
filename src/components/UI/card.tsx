"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface Product {
  id: number
  title: string
  price: number
  image: string
  rating: { rate: number; count: number }
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [inCart, setInCart] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)

  // Fake discount logic (20% higher original price)
  const originalPrice = product.price * 1.2
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100)

  const handleAddToCart = () => setInCart(true)
  const handleToggleWishlist = () => setInWishlist(!inWishlist)

  return (
    <div className="group relative border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48 cursor-pointer overflow-hidden">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded-md font-semibold">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full transition"
      >
        <span
          className={`text-lg ${
            inWishlist ? "text-red-500 scale-110" : "text-gray-500 hover:text-red-500 hover:scale-110"
          }`}
        >
          ♥
        </span>
      </button>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-800 line-clamp-2 hover:text-blue-600 transition cursor-pointer">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < Math.floor(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.rating.count})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Cart Button */}
        {inCart ? (
          <Link href="/cart" className="block w-full">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              🛒 Go to Cart
            </button>
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ➕ Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}