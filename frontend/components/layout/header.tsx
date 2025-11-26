"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import SearchOverlay from "@/components/modals/search-overlay";
import CollectionsDropdown from "@/components/modals/collections-dropdown";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-gray-light border-black border-b">
        <div className="max-w-7xl mx-auto px-6! sm:px-8! lg:px-12!">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="text-3xl font-bold text-rust font-serif">
              <img src="/logo.png" alt="Logo" className="h-full w-30" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-12">
              <CollectionsDropdown />
              <Link
                href="/about"
                className="text-sm font-semibold text-dark hover:text-rust transition"
              >
                ABOUT
              </Link>
              <Link
                href="/shop"
                className="text-sm font-semibold text-dark hover:text-rust transition"
              >
                SHOP
              </Link>
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-6">
              {/* Search Button */}
              <button
                onClick={() => setShowSearch(true)}
                className="text-dark hover:text-rust transition"
                aria-label="Search"
              >
                <Search size={24} />
              </button>

              {/* Profile Link */}
              <Link
                href="/profile"
                className="text-dark hover:text-rust transition"
              >
                <User size={24} />
              </Link>

              {/* Cart Link */}
              <Link
                href="/cart"
                className="text-dark hover:text-rust transition"
              >
                <ShoppingBag size={24} />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden text-dark"
                aria-label="Toggle Mobile Menu"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <nav className="md:hidden pb-4 border-t border-gray-300 space-y-2">
              <CollectionsDropdown />
              <Link
                href="/about"
                className="block py-2 text-sm font-semibold text-dark"
              >
                ABOUT
              </Link>
              <Link
                href="/shop"
                className="block py-2 text-sm font-semibold text-dark"
              >
                SHOP
              </Link>
            </nav>
          )}
        </div>
      </header>

      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
    </>
  );
}
