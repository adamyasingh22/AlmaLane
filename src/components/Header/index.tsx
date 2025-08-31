// app/components/Header.tsx
import Link from "next/link"
import type { Product } from "@/app/Product/types"

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

export default async function Header() {
  const products = await getProducts()

  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg font-serif">S</span>
            </div>
            <span className="text-xl font-serif font-bold text-foreground">AlmaLane</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/Product" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors">
                Categories
              </button>
              <div className="absolute hidden group-hover:block group-focus-within:block bg-white border rounded-md shadow-lg mt-2 w-44">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/Product?category=${encodeURIComponent(cat)}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
