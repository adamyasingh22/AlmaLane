import type { ApiProduct } from "@/lib/api";

export function makeProduct(overrides: Partial<ApiProduct> = {}): ApiProduct {
  return {
    id: '1',
    title: "Mock Product",
    price: 10,
    description: "Mock description",
    category: "Mock category",
    image: "/mock.jpg",
    rating: { rate: 4.5, count: 20 },
    ...overrides,
  };
}
