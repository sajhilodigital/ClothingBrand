"use client"

import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"

const collectionProducts = Array.from({ length: 6 }).map((_, i) => ({
  id: `${i + 1}`,
  name: "Trench Coat Long",
  price: 3000,
  image: `/placeholder.svg?height=400&width=300&query=clothing collection ${i + 1}`,
  rating: 5,
  sale: i % 2 === 0,
}))

export default function CollectionPage({ params }: { params: { id: string } }) {
  const collectionNames: Record<string, string> = {
    summer: "Summer Collection 2025",
    winter: "Winter Collection 2025",
    trending: "Trending 2025",
    bestseller: "Best Sellers",
  }

  const collectionName = collectionNames[params.id] || "Collection"

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative h-80 bg-gray-400 flex items-center justify-center text-white text-center mb-12">
        <img
          src={`/.jpg?height=400&width=1200&query=${collectionName} banner`}
          alt={collectionName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <h1 className="relative z-10 text-5xl font-light">{collectionName}</h1>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collectionProducts.map((product) => (
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

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block border-2 border-gray-400 px-8 py-2 hover:border-orange-500 hover:text-orange-500 transition"
          >
            LOAD MORE
          </Link>
        </div>
      </div>
    </main>
  )
}
