const BASE_URL = "https://fakestoreapi.com"

export interface ApiProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export async function fetchProducts(): Promise<ApiProduct[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`)
    if (!response.ok) throw new Error("Failed to fetch products")
    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function fetchProductById(id: number): Promise<ApiProduct | null> {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) throw new Error("Failed to fetch product")
    return await response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function fetchProductsByCategory(category: string): Promise<ApiProduct[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`)
    if (!response.ok) throw new Error("Failed to fetch products by category")
    return await response.json()
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`)
    if (!response.ok) throw new Error("Failed to fetch categories")
    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
