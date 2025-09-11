import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductsList from "@/app/Product/ProductsList"; 
import type { ApiProduct } from "@/lib/api";

// Mock useSearch context
jest.mock("@/contexts/search-context", () => ({
  useSearch: jest.fn(),
}));

import { useSearch } from "@/contexts/search-context";
const mockedUseSearch = useSearch as jest.Mock;

const sampleProducts: ApiProduct[] = [
  { id: '1', title: "Red Shoes" } as ApiProduct,
  { id: '2', title: "Blue Jacket" } as ApiProduct,
  { id: '3', title: "Green Hat" } as ApiProduct,
];

describe("ProductsList", () => {
  beforeEach(() => {
    mockedUseSearch.mockReturnValue({ query: "" }); // default no filter
  });

  it("renders all products when no query", () => {
    render(<ProductsList products={sampleProducts} />);
    expect(screen.getAllByTestId("product-card")).toHaveLength(3);
  });

  it("filters products by search query", () => {
    mockedUseSearch.mockReturnValue({ query: "shoes" });
    render(<ProductsList products={sampleProducts} />);
    expect(screen.getByText("Red Shoes")).toBeInTheDocument();
    expect(screen.queryByText("Blue Jacket")).not.toBeInTheDocument();
  });

  it("shows 'No products found' when no match", () => {
    mockedUseSearch.mockReturnValue({ query: "xyz" });
    render(<ProductsList products={sampleProducts} />);
    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });

  it("handles pagination", () => {
    // Create 12 products (so pagination triggers, 9 per page)
    const manyProducts = Array.from({ length: 12 }, (_, i) => ({
      id: 'i + 1',
      title: `Product ${i + 1}`,
    })) as ApiProduct[];

    render(<ProductsList products={manyProducts} />);

    // Page 1 → should show first 9
    expect(screen.getAllByTestId("product-card")).toHaveLength(9);

    // Click "Next"
    fireEvent.click(screen.getByText(/Next/i));

    // Page 2 → should show remaining 3
    expect(screen.getAllByTestId("product-card")).toHaveLength(3);
  });
});
