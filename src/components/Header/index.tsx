'use client'
import Link from "next/link";

export default function Header(){
    return (
        <header className="bg-background border-b border-border sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                  <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg font-serif">S</span>
                  </div>
                  <span className="text-xl font-serif font-bold text-foreground">AlmaLane</span>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex items-center space-x-8">
                   <Link href="/" className="text-foreground hover:text-primary transition-colors">
                     Home
                   </Link>
                   <Link href="/Product" className="text-foreground hover:text-primary transition-colors">
                     Products
                   </Link>
                   <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
                     Categories
                   </Link>
                   <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                     About
                   </Link>
                 </nav>
                </div>

            </div>

        </header>
    )
}