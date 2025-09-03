"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/UI/button"
import type { ApiProduct } from "@/lib/api"
import { useWishlist } from "@/contexts/whishlist-context"

interface ProductCardProps {
  product: ApiProduct
}

export default function ProductCards({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const productInCart = isInCart(product.id)
  const productInWishlist = isInWishlist(product.id)

  const originalPrice = product.price * 1.2
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100)

  const handleAddToCart = () => addItem(product)
  const handleToggleWishlist = () => toggleItem(product)

  return (
    <div className="group relative flex flex-col border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white overflow-hidden">
      {/* Image Section */}
      <Link href={`/ProductDetail/${product.id}`} className="relative w-full h-60 sm:h-72 md:h-80 flex items-center justify-center overflow-hidden">
        <Image
          src={product.image || "/placeholder.png"}
          alt={product.title}
          className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
          width={250}
          height={250}
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded-md font-semibold">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full transition"
      >
        <span
          className={`text-lg ${
            productInWishlist
              ? "text-red-500 scale-110"
              : "text-gray-500 hover:text-red-500 hover:scale-110"
          }`}
        >
          ♥
        </span>
      </button>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-4 space-y-3">
        {/* Title */}
        <Link href={`/ProductDetail/${product.id}`}>
          <h3 className="font-medium text-gray-800 line-clamp-2 hover:text-blue-600 transition cursor-pointer text-sm sm:text-base md:text-lg">
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
        <div className="mt-auto">
          {productInCart ? (
            <Link href="/cart">
              <Button className="w-full transition-all duration-200 hover:scale-105">
                Go to Cart
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full transition-all duration-200 hover:scale-105"
              onClick={handleAddToCart}
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
