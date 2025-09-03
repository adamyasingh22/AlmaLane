// types.tsx
export interface Product {
  id: number
  title: string
  price: number
  category: string
  rating: {
    rate: number;
    count: number;
  }
  image: string
  inStock: boolean
}

export interface FilterOptions {
  priceRange: [number, number]
  category: string
  minRating: number
  inStock: boolean
}

