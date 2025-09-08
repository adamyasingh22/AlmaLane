"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, FilterOptions } from "../../app/Product/types";
import ProductsList from "@/app/Product/ProductsList";
import Image from "next/image";
import type { ApiProduct } from "@/lib/api";

interface Props {
  products: Product[];
  defaultFilters: FilterOptions;
}

export default function Filters({ products, defaultFilters }: Props) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";

  const [filters, setFilters] = useState<FilterOptions>({
    ...defaultFilters,
    category: categoryFromUrl,
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: categoryFromUrl }));
  }, [categoryFromUrl]);

  useEffect(() => {
    let result = [...products];
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] &&
        p.price <= filters.priceRange[1] &&
        (filters.category === "all" || p.category === filters.category) &&
        p.rating.rate >= filters.minRating &&
        (!filters.inStock || p.inStock)
    );
    setFilteredProducts(result);
  }, [filters, products]);

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Mobile Filter Toggle Button */}
      <div className="flex md:hidden items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md shadow hover:bg-gray-200"
        >
          <Image
            src="/filter.png"
            alt="filter"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Sidebar (Responsive) */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-3/4 sm:w-1/2 md:w-1/4 bg-white md:bg-gray-50 p-6 rounded-md shadow-md md:shadow
        transform transition-transform duration-300 z-50
        ${isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close Button for Mobile */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <h2 className="text-lg font-bold text-gray-800">Filters</h2>
          <button
            onClick={() => setIsMobileFiltersOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>
        <div className="w-full flex items-center justify-between ">
          <h2 className="text-[1.2rem] text-gray-800 font-bold">Filter</h2>
          <Image
            src="/filter.png"
            alt="filter icon"
            width={20}
            height={20}
            className="bg-[#f6f6f6] px-1 py-0.5 rounded cursor-pointer h-5 hover:bg-gray-700"
          />
        </div>
        {/* Divider */}
        <hr className="border-t border-gray-700 my-10"  />

        {/* Price */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <input
            type="range"
            min={0}
            max={1000}
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [0, Number(e.target.value)],
              }))
            }
            className="w-full"
          />
          <p className="text-xs text-gray-500">Up to ${filters.priceRange[1]}</p>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full border rounded p-2"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="all">All</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Min Rating</label>
          <input
            type="number"
            min={0}
            max={5}
            value={filters.minRating}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minRating: Number(e.target.value),
              }))
            }
            className="w-full border rounded p-2"
          />
        </div>

        {/* In Stock */}
        <div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  inStock: e.target.checked,
                }))
              }
            />
            In Stock Only
          </label>
        </div>
      </aside>

      {/* Products Section */}
      <main className="flex-1">
        <h3 className="font-bold text-lg mb-4">
          {filters.category === "all"
            ? "All Products"
            : `Category: ${filters.category}`}
        </h3>
        <ProductsList products={filteredProducts as unknown as ApiProduct[]} />
      </main>

      {/* Mobile Overlay */}
      {isMobileFiltersOpen && (
        <div
          onClick={() => setIsMobileFiltersOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
        ></div>
      )}
    </div>
  );
}
