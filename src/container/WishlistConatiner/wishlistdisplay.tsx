"use client"

import Link from "next/link"
import { useWishlist } from "@/contexts/whishlist-context"
import { useCart } from "@/contexts/cart-context"
import type { WishlistItem } from "@/contexts/whishlist-context"
import Image from "next/image"

export default function WishlistPage() {
  const { items, totalItems, removeItem, clearWishlist } = useWishlist()
  const { addItem: addToCart, isInCart } = useCart()

  const handleAddToCart = (item: WishlistItem) => {
    const product = {
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.category || "No description available", // ✅ safe fallback
      category: item.category,
      image: item.image,
      rating: item.rating,
      quantity: 1, // ✅ required for CartItem
    }
    addToCart(product)
  }

  const handleMoveToCart = (item: WishlistItem) => {
    handleAddToCart(item)
    removeItem(item.id)
  }

  if (items.length === 0) {
    return (
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="text-6xl mb-4">♡</div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h1>
          <p className="text-gray-500 mb-8">
            Save items you love to your wishlist for later.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            ← Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              My Wishlist
            </h1>
            <p className="text-gray-500">
              {totalItems} {totalItems === 1 ? "item" : "items"} saved for later
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-red-500 text-red-600 hover:bg-red-50 transition"
          >
            🗑 Clear Wishlist
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative group border rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden bg-white"
            >
              <Link href={`/products/${item.id}`}>
                <div className="relative overflow-hidden cursor-pointer">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    width={300}
                    height={200}
                  />
                </div>
              </Link>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-red-100 transition"
              >
                <span className="text-red-500">✖</span>
              </button>

              <div className="p-4 space-y-3">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(item.rating.rate)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({item.rating.count})
                  </span>
                </div>

                {/* Price */}
                <div className="text-lg font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {isInCart(item.id) ? (
                    <Link href="/cart">
                      <button className="w-full px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition">
                        🛒 Go to Cart
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      🛒 Add to Cart
                    </button>
                  )}
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                  >
                    Move to Cart
                  </button>
                </div>

                {/* Added Date */}
                <p className="text-xs text-gray-400">
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Shopping */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-100 transition"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}
