"use client"

import { useState, useEffect } from "react"
import { fetchCategories } from "@/lib/api"
import { Button } from "../UI/button"

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void
  activeCategory: string
}

export default function CategoryFilter({ onCategoryChange, activeCategory }: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories()
        setCategories(["all", ...fetchedCategories])
      } catch (error) {
        console.error("Failed to load categories:", error)
        setCategories(["all"])
      } finally {
        setLoading(false)
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

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Shop by Category</h2>
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 w-24 bg-muted animate-pulse rounded-md" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Shop by Category</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "primary" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="transition-all duration-200"
          >
            {formatCategoryName(category)}
          </Button>
        ))}
      </div>
    </div>
  )
}
