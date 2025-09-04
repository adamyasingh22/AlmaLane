"use client";

import { useState, useEffect } from "react";
import { useSearch } from "@/contexts/search-context";

export default function SearchBar() {
  const { query, setQuery } = useSearch(); // ✅ use global context
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      const suggestions = [
        "wireless headphones",
        "smart watch",
        "bluetooth speaker",
        "laptop backpack",
        "organic cotton",
        "fitness tracker",
        "wireless mouse",
        "phone case",
        "tablet stand",
        "portable charger",
      ]
        .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);

      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(query); // 
    setIsSearchOpen(false);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion); // 
    setShowSuggestions(false);
    setIsSearchOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      {isSearchOpen ? (
        <form
          onSubmit={handleSearch}
          className="flex items-center space-x-2 w-full"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

          {/* Search Button */}
          <button type="submit" className="p-2 hover:bg-gray-100 rounded-md">
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Close Button */}
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-md"
            onClick={() => {
                setIsSearchOpen(false)
                setQuery("");
            }}
          >
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-50">
              {searchSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </form>
      ) : (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center text-gray-500 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100"
        >
          <svg
            className="h-5 w-5 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search products...
        </button>
      )}
    </div>
  );
}
