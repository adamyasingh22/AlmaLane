"use client";

import { useEffect, useState } from "react";
import Filters from "@/container/CategoriesContainer/filter";
import type { Product, FilterOptions } from "./types";
import CategoryDiscription from "@/container/CategoriesContainer/CategoryDiscription";

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export default function ProductsPage({ searchParams = {} }: { searchParams?: { category?: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data: ApiProduct[] = await res.json();
      setProducts(
        data.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
          rating: { rate: item.rating.rate, count: item.rating.count },
          image: item.image,
          inStock: true,
        }))
      );
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const defaultFilters: FilterOptions = {
    priceRange: [0, 1000],
    category: searchParams.category || "all",
    minRating: 0,
    inStock: false,
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div>
      <div className="flex gap-6 p-6">
        <Filters products={products} defaultFilters={defaultFilters} />
      </div>
      <CategoryDiscription />
    </div>
  );
}
