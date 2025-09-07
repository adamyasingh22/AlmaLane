"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { updateQuantity, removeItem, clearCart } from "@/store/cartSlice";

export default function CartContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const calculateSubtotal = (price: number, quantity: number) => price * quantity;
  const calculateShipping = () => (totalPrice > 100 ? 0 : 10);
  const grandTotal = () => totalPrice + calculateShipping();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 -mt-20">
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

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven&apos;t added any items to your cart yet.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full font-sans">
      {/* Header */}
      <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] px-6 md:px-10 py-4 border-b-2 border-gray-300 font-medium text-gray-100 bg-neutral-800 text-sm">
        <div className="text-left">PRODUCT DETAILS</div>
        <div className="text-center">PRICE</div>
        <div className="text-center">QUANTITY</div>
        <div className="text-center">SUBTOTAL</div>
        <div className="text-center">ACTION</div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 px-4 md:px-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:grid md:grid-cols-[3fr_1fr_1fr_1fr_0.5fr] md:items-center md:py-4 md:border-b"
          >
            {/* Product Details */}
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt="product image"
                className="w-20 h-20 object-cover rounded-lg"
                width={80}
                height={80}
              />
              <div className="flex flex-col">
                <strong className="text-sm md:text-base">{item.title}</strong>
                <small className="text-xs text-gray-500">Category: {item.category}</small>
              </div>
            </div>

            {/* Price */}
            <p className="font-semibold text-gray-700 text-sm md:text-base text-center mt-2 md:mt-0">
              ${item.price.toFixed(2)}
            </p>

            {/* Quantity Control */}
            <div className="flex justify-center mt-2 md:mt-0">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg font-bold">
                <button
                  className="text-gray-600 text-lg md:text-xl"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                  }
                >
                  −
                </button>
                {item.quantity}
                <button
                  className="text-gray-600 text-lg md:text-xl"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <p className="font-semibold text-gray-700 text-sm md:text-base text-center mt-2 md:mt-0">
              ${calculateSubtotal(item.price, item.quantity).toFixed(2)}
            </p>

            {/* Remove Button */}
            <div className="flex justify-center mt-2 md:mt-0">
              <button
                className="text-purple-500 text-lg hover:text-purple-700"
                onClick={() => dispatch(removeItem(item.id))}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 mt-10 px-8 md:px-10">
        <div className="flex flex-col gap-3 text-gray-600 w-full lg:w-1/3">
          <strong>Discount Codes</strong>
          <small>Enter your coupon code if you have one</small>
          <div className="flex w-full border border-gray-300 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              className="flex-1 px-4 py-2 text-sm bg-gray-100 outline-none"
            />
            <button className="bg-purple-500 text-white px-3 py-2 text-sm font-medium hover:bg-purple-600">
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

        <div className="flex flex-col gap-3 text-gray-600 bg-gray-100 px-6 md:px-10 py-8 w-full lg:w-80 rounded-xl shadow">
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
          <hr className="border-t border-gray-300 my-5" />
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
