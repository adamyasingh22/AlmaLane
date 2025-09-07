import ResponsiveHeaader from "./ResponsiveHeader";
import type { Product } from "@/app/Product/types";


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

// Fetch products on the server
async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  const data: ApiProduct[] = await res.json();

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    category: item.category,
    rating: { rate: item.rating.rate, count: item.rating.count },
    image: item.image,
    inStock: true,
  }));
}

export default async function Header() {
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return <ResponsiveHeaader categories={categories} />;
}


