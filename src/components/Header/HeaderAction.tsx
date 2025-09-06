"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useWishlist } from "@/contexts/whishlist-context";

export default function HeaderActions() {
  const { totalItems: wishlistCount } = useWishlist();
  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <>
      {/* Wishlist Button */}
      <Link
        href="/wishlist"
        className="relative inline-flex items-center justify-center"
      >
        <svg
          className="w-10 h-10 p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>

        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </Link>

      {/* Cart Button */}
      <Link
        href="/cart"
        className="relative inline-flex items-center justify-center"
      >
        <svg
          className="w-10 h-10 p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2 11h14l2-7H5"></path>
        </svg>

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
    </>
  );
}
