'use client'
import CategoryFilter from "@/components/Category-filter";
import { useState } from "react";

export default function CategoriesContainer () {
    const [selectedCategory, setSelectedCategory] = useState("all")
    return (
    <div>
        <CategoryFilter onCategoryChange={setSelectedCategory} activeCategory={selectedCategory}/>
    </div>
    );
}
