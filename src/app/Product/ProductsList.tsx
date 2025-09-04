"use client";

import { useEffect, useMemo, useState } from "react";
import type { ApiProduct } from "@/lib/api";
import ProductCards from "@/components/UI/card";
import { useSearch } from "@/contexts/search-context";

export default function ProductsList({ products }: { products: ApiProduct[] }) {
  const { query } = useSearch(); // 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;


  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  if (filteredProducts.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {currentProducts.map((p) => (
          <ProductCards key={p.id} product={p} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 border rounded ${
                currentPage === num
                  ? "bg-gray-400 text-white border-gray-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
