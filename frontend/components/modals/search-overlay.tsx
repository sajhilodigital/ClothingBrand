"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

interface SearchOverlayProps {
  onClose: () => void
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    inputRef.current?.focus()

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-cream z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-serif text-dark">Search Any Product</h1>
          <button onClick={onClose} className="text-dark hover:text-rust transition" aria-label="Close search">
            <X size={24} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Any Product"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-b-2 border-gray-400 bg-cream py-3 text-dark placeholder-gray-600 focus:border-dark-green focus:outline-none transition text-lg"
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
          <button onClick={onClose} className="text-dark hover:text-rust transition font-semibold text-sm">
            close
          </button>
        </div>

        <div className="border-b border-gray-400 mt-6"></div>
      </div>
    </div>
  )
}
