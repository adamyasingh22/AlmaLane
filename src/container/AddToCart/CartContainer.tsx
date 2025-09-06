"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  updateQuantity,
  removeItem,
  clearCart,
} from "@/store/cartSlice";

export default function CartContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const calculateSubtotal = (price: number, quantity: number): number =>
    price * quantity;
  const calculateShipping = (): number => (totalPrice > 100 ? 0 : 10);
  const grandTotal = (): number => totalPrice + calculateShipping();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 -mt-20">
        {/* Shopping bag icon */}
        <svg
          className="h-16 w-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 2l1 4h10l1-4" />
          <path d="M3 6h18l-2 14H5L3 6z" />
          <path d="M9 10v2a3 3 0 006 0v-2" />
        </svg>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven&apos;t added any items to your cart yet.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {/* Arrow Left Icon */}
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full my-10 font-sans">
      {/* Cart Header */}
      <div className="grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] px-10 py-5 border-b-2 border-gray-300 font-medium text-gray-100 bg-neutral-800">
        <div>PRODUCT DETAILS</div>
        <div>PRICE</div>
        <div>QUANTITY</div>
        <div>SUBTOTAL</div>
        <div>ACTION</div>
      </div>

      {/* Cart Items */}
      {items.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] items-center px-10 py-6 border-b border-gray-200 text-gray-600"
        >
          {/* Product Info */}
          <div className="flex items-center gap-4">
            <Image
              src={item.image}
              alt="product image"
              className="w-20 h-20 object-cover rounded-lg"
              width={80}
              height={80}
            />
            <div className="flex flex-col gap-1">
              <strong>{item.title}</strong>
              <small>Category: {item.category}</small>
            </div>
          </div>

          {/* Price */}
          <p className="font-semibold">${item.price.toFixed(2)}</p>

          {/* Quantity Control */}
          <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg font-bold select-none">
            <button
              className="text-gray-600 text-xl"
              onClick={() =>
                dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
              }
            >
              −
            </button>
            {item.quantity}
            <button
              className="text-gray-600 text-xl"
              onClick={() =>
                dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
              }
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <p className="font-semibold">
            ${calculateSubtotal(item.price, item.quantity).toFixed(2)}
          </p>

          {/* Remove Button */}
          <button
            className="text-purple-500 text-lg hover:text-purple-700"
            onClick={() => dispatch(removeItem(item.id))}
          >
            🗑️
          </button>
        </div>
      ))}

      {/* Total Section */}
      <div className="flex justify-between mt-10">
        {/* Discount Section */}
        <div className="flex flex-col gap-3 text-gray-600 px-10 mt-6">
          <strong>Discount Codes</strong>
          <small>Enter your coupon code if you have one</small>
          <div className="flex w-72 border border-gray-300 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              className="flex-1 px-4 py-2 text-sm bg-gray-100 outline-none"
            />
            <button className="bg-purple-500 text-white px-3 py-2 text-sm font-medium hover:bg-purple-600 cursor-pointer">
              Apply
            </button>
          </div>
          <Link
            href="/"
            className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:border-gray-500 text-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Totals Section */}
        <div className="flex flex-col gap-3 text-gray-600 bg-gray-100 px-10 py-8 mr-10 w-80">
          <div className="flex justify-between">
            <strong>Sub Total</strong>
            <small>${totalPrice.toFixed(2)}</small>
          </div>
          <div className="flex justify-between">
            <strong>Shipping</strong>
            <small>${calculateShipping().toFixed(2)}</small>
          </div>
          <div className="flex justify-between mt-5">
            <strong>Grand Total</strong>
            <small>${grandTotal().toFixed(2)}</small>
          </div>
          <hr className="border-t border-gray-400 my-5" />
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-purple-500 text-white hover:bg-purple-600">
            Proceed To Checkout
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:text-red-700"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
