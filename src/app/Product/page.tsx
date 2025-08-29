// app/product/page.tsx
import Filters from "@/container/CategoriesContainer/filter";
import type { Product, FilterOptions } from "./types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryDiscription from "@/container/CategoriesContainer/CategoryDiscription";

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Simulated fetch function
async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  const data: ApiProduct[] = await res.json();

  return data.map((item) => ({
    id: item.id,
    name: item.title,
    price: item.price,
    category: item.category,
    rating: item.rating.rate,
    image: item.image,
    inStock: true,
  }));
}

// ✅ Accept searchParams
export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const products = await getProducts();

  const defaultFilters: FilterOptions = {
    priceRange: [0, 1000],
    category: searchParams.category || "all", 
    minRating: 0,
    inStock: false,
  };

  return (
    <div>
      <Header />
      <div className="flex gap-6 p-6">
        <Filters products={products} defaultFilters={defaultFilters} />
      </div>
      <CategoryDiscription />
      <Footer />
    </div>
  );
}
