"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, FilterOptions } from "../../app/Product/types";
import ProductsList from "@/app/Product/ProductsList";

interface Props {
  products: Product[];
  defaultFilters: FilterOptions;
}

export default function Filters({ products, defaultFilters }: Props) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";

  const [filters, setFilters] = useState<FilterOptions>({
    ...defaultFilters,
    category: categoryFromUrl, // ✅ override category if query exists
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
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
        p.rating >= filters.minRating &&
        (!filters.inStock || p.inStock)
    );
    setFilteredProducts(result);
  }, [filters, products]);

  return (
    <div className="flex gap-6 w-full">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-50 p-4 rounded-md shadow">
        <h2 className="font-bold mb-3">Filters</h2>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm">Price Range</label>
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
          <p className="text-xs text-gray-500">
            Up to ${filters.priceRange[1]}
          </p>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm">Category</label>
          <select
            className="w-full border rounded p-1"
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
        <div className="mb-4">
          <label className="block text-sm">Min Rating</label>
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
            className="w-full border rounded p-1"
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
      </div>

      {/* Products */}
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-4">
          {filters.category === "all" ? "All Products" : `Category: ${filters.category}`}
        </h3>
        <ProductsList products={filteredProducts} />
      </div>
    </div>
  );
}
