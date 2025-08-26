export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  inStock: boolean;
}

export interface FilterOptions {
  priceRange: [number, number];
  category: string;
  minRating: number;
  inStock: boolean;
}
