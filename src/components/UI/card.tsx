"use client";
import Image from "next/image";
import { FC } from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  discount?: string;
  image: string;
  buttonText?: string;
}

const Card: FC<CardProps> = ({ title, subtitle, discount, image, buttonText }) => {
  return (
    <div className="relative flex flex-col rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative w-full h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        {discount && (
          <p className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-md w-max">
            {discount}
          </p>
        )}
      </div>

      {/* Button Section */}
      {buttonText && (
        <div className="p-4">
          <button className="w-full rounded-xl bg-blue-600 text-white font-medium py-2 px-4 hover:bg-blue-700 transition-colors duration-200">
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
