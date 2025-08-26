'use client'
import Filter from "./filter";

export default function CategoriesContainer () {
    return (
    <div className="flex w-full p-5 gap-5">
    {/* Sidebar */}
      <div className="w-1/5 min-w-[200px] bg-gray-100 p-3 rounded-xl">
        <Filter />
      </div>
    </div>
    );
}
