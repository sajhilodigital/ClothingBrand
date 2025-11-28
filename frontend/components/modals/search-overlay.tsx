"use client";

import { useEffect, useRef, useState } from "react";
import { X, Search } from "lucide-react";

interface SearchOverlayProps {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    inputRef.current?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-gray-light z-50 h-20 top-20"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-7xl mx-auto! px-4! sm:px-6! lg:px-8! pt-8! text-sm!">
        <div className="flex items-center gap-4">
          <button
            className="text-dark! hover:text-rust transition"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Any Product"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-b-2 border-gray-400 py-3! text-dark placeholder-gray-600 focus:border-dark-green focus:outline-none transition"
            /* 
            // Backend Integration - Search products
            // onChange={(e) => {
            //   const q = e.target.value
            //   if (q.length > 2) {
            //     fetch(`/api/products/search?q=${q}`)
            //       .then(res => res.json())
            //       .then(data => setSearchResults(data))
            //   }
            // }}
            */
          />
          <button
            onClick={onClose}
            className="text-dark hover:text-rust transition font-semibold! text-sm"
          >
            close
          </button>
        </div>

        <div className="border-b border-gray-400 mt-6!"></div>
      </div>
    </div>
  );
}
