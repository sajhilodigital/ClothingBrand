"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const collections = [
  {
    name: "TRENDING 2025",
    href: "/collections/trending",
    items: ["T-SHIRT", "WOOLEN OUTER"],
  },
  { name: "BEST SELLER", href: "/collections/bestseller", items: ["SHOP"] },
  {
    name: "NEW RELEASES",
    href: "/collections/new",
    items: ["JORTS", "DENIM JACKET"],
  },
  {
    name: "UNISEX",
    href: "/collections/unisex",
    items: ["BOTTOM WEAR", "TOP WEAR"],
  },
];

export default function CollectionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-dark hover:text-rust transition"
      >
        COLLECTIONS
        <ChevronDown
          size={16}
          className={`transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="w-screen max-w-200 absolute top-full md:-left-80 lg:-left-80 mt-2! bg-white rounded-sm shadow-xl border border-gray-300 p-6! z-50">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1">
            {collections.map((collection) => (
              <div key={collection.name}>
                <Link
                  href={collection.href}
                  className="block text-xs font-bold text-dark hover:text-rust transition mb-3! uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  {collection.name}
                </Link>
                <ul className="space-y-2">
                  {collection.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={`${collection.href}?item=${item.toLowerCase()}`}
                        className="text-xs text-gray-700 hover:text-rust transition uppercase"
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
