'use client';
import Link from "next/link";
import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderAction";
import UserIcon from "./UserIcon";
import { useState } from "react";

export default function ResponsiveHeader({ categories }: { categories: string[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-serif font-bold text-foreground">
              AlmaLane
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/Product" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors">
                Categories
              </button>
              <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-2 w-44">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/Product?category=${encodeURIComponent(cat)}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Actions + Mobile Hamburger */}
          <div className="flex items-center gap-4 ml-2">
            <UserIcon />
            <HeaderActions />
            {/* Hamburger for Mobile */}
            <button
              className="md:hidden p-2 rounded-md "
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                // Close Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border mt-2 rounded-lg shadow-lg p-4 space-y-4 animate-slide-down">
            <SearchBar />
            <Link href="/" className="block text-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/Product" className="block text-foreground hover:text-primary">
              Products
            </Link>
            <details>
              <summary className="text-foreground">
                Categories
              </summary>
              <div className="pl-4 mt-2 space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/Product?category=${encodeURIComponent(cat)}`}
                    className="block text-sm text-gray-700 hover:text-primary"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </details>
            <Link href="/about" className="block text-foreground hover:text-primary">
              About
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}