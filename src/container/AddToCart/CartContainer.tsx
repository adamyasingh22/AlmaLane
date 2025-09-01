"use client";

import Image from "next/image";
import React, { useState } from "react";

type CartItems = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  shipping: number;
  category: string;
  size: string;
  image: string;
};

const cartData: CartItems[] = [
  {
    id: 1,
    name: "Blue Flower Print Crop Top",
    category: "Yellow",
    size: "M",
    price: 29,
    shipping: 0,
    image:
      "/man6.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Lavender Hoodie",
    category: "Lavender",
    size: "XXL",
    price: 119,
    shipping: 0,
    image:
      "/man7.jpg",
    quantity: 2,
  },
  {
    id: 3,
    name: "Black Sweatshirt",
    category: "Black",
    size: "XXL",
    price: 123,
    shipping: 5,
    image:
      "/man8.jpg",
    quantity: 2,
  },
];

export default function CartContainer() {
  const [cart, setCart] = useState(cartData);

  const handleQuantity = (id: number, type: "inc" | "dec") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateSubtotal = (item: CartItems): number =>
    item.price * item.quantity;

  const calculateTotal = (): number =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const calculateShipping = (): number =>
    cart.reduce((acc, item) => acc + item.shipping, 0);

  const grandTotal = (): number => calculateTotal() + calculateShipping();

  return (
    <div className="w-full my-10 font-sans">
      {/* Cart Header */}
      <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_0.5fr] px-10 py-5 border-b-2 border-gray-300 font-medium text-gray-100 bg-neutral-800">
        <div>PRODUCT DETAILS</div>
        <div>PRICE</div>
        <div>QUANTITY</div>
        <div>SHIPPING</div>
        <div>SUBTOTAL</div>
        <div>ACTION</div>
      </div>

      {/* Cart Items */}
      {cart.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_0.5fr] items-center px-10 py-6 border-b border-gray-200 text-gray-600"
        >
          {/* Product Info */}
          <div className="flex items-center gap-4">
            <Image
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
              width={80}
              height={80}
            />
            <div className="flex flex-col gap-1">
              <strong>{item.name}</strong>
              <small>Category: {item.category}</small>
              <small>Size: {item.size}</small>
            </div>
          </div>

          {/* Price */}
          <p className="font-semibold">${item.price.toFixed(2)}</p>

          {/* Quantity Control */}
          <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg font-bold select-none">
            <button
              className="text-gray-600 text-xl"
              onClick={() => handleQuantity(item.id, "dec")}
            >
              −
            </button>
            {item.quantity}
            <button
              className="text-gray-600 text-xl"
              onClick={() => handleQuantity(item.id, "inc")}
            >
              +
            </button>
          </div>

          {/* Shipping */}
          <p className="px-2">
            {item.shipping === 0 ? "FREE" : `$${item.shipping.toFixed(2)}`}
          </p>

          {/* Subtotal */}
          <p className="font-semibold">${calculateSubtotal(item).toFixed(2)}</p>

          {/* Remove Button */}
          <button
            className="text-purple-500 text-lg hover:text-purple-700"
            onClick={() => handleRemove(item.id)}
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
          <button className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:border-gray-500">
            Continue Shopping
          </button>
        </div>

        {/* Totals Section */}
        <div className="flex flex-col gap-3 text-gray-600 bg-gray-100 px-10 py-8 mr-10 w-80">
          <div className="flex justify-between">
            <strong>Sub Total</strong>
            <small>${calculateTotal().toFixed(2)}</small>
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
        </div>
      </div>
    </div>
  );
}
