"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"

const allProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: `${i + 1}`,
  name: "Trench Coat Long",
  price: 3000,
  image: `/placeholder.svg?height=400&width=300&query=clothing product ${i + 1}`,
  rating: 5,
  sale: i % 3 === 0,
}))

export default function ShopPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 10000])

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = ["Black", "Red", "Blue", "Green", "Yellow"]

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-light mb-12">Shop Our Collection</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="md:col-span-1">
            <div className="space-y-8">
              {/* Size Filter */}
              <div>
                <h3 className="font-bold mb-4">SIZE</h3>
                <div className="space-y-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSize === size}
                        onChange={(e) => setSelectedSize(e.target.checked ? size : null)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h3 className="font-bold mb-4">COLOR</h3>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColor === color}
                        onChange={(e) => setSelectedColor(e.target.checked ? color : null)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold mb-4">PRICE RANGE</h3>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">
                  NPR {priceRange[0]} - NPR {priceRange[1]}
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {allProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group">
                  <div className="relative bg-gray-200 mb-4 overflow-hidden rounded-lg aspect-square">
                    {product.sale && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 text-xs font-bold z-10">
                        SALE
                      </div>
                    )}
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="bg-white p-2 rounded-lg hover:bg-orange-50">
                        <Heart size={20} />
                      </button>
                      <button className="bg-white p-2 rounded-lg hover:bg-orange-50">
                        <ShoppingBag size={20} />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-light mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-orange-500 font-bold">NPR {product.price}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: product.rating }).map((_, i) => (
                        <span key={i} className="text-orange-500">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
