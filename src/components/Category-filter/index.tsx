"use client"

import { useState, useEffect } from "react"
import { fetchCategories } from "@/lib/api"
import Image from "next/image";

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void
  activeCategory: string
}

export default function CategoryFilter({ onCategoryChange, activeCategory }: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories()
        setCategories(["all", ...fetchedCategories])
      } catch (error) {
        console.error("Failed to load categories:", error)
        setCategories(["all"])
      } finally {
      }
    }

    loadCategories()
  }, [])

  const formatCategoryName = (category: string) => {
    if (category === "all") return "All Products"
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

return (
  <div className="mb-8">
    {categories.map((item) => (
      <div
        key={item}
        className={`w-full flex flex-col p-1 cursor-pointer transition-colors ${
            activeCategory === item
              ? "bg-gray-200 border border-gray-400"
              : "hover:bg-gray-100"
          }`}
        onClick={() => onCategoryChange(item)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xs text-black">
            {formatCategoryName(item)}
          </h3>
          <Image
            src="/arrow.png"
            alt="arrow"
            width={14}
            height={14}
            className="bg-gray-100 p-1 rounded hover:bg-gray-600"
          />
        </div>
      </div>
    ))}
  </div>
)

}
