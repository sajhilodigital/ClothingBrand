import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Trench Coat Long",
    price: 3000,
    image: "/images/img9.png",
    rating: 5,
    sale: true,
  },
  {
    id: "2",
    name: "Trench Coat Long",
    price: 3000,
    image: "/images/img9.png",
    rating: 5,
  },
  {
    id: "3",
    name: "Trench Coat Long",
    price: 3000,
    image: "/images/img9.png",
    rating: 5,
    sale: true,
  },
  {
    id: "4",
    name: "Trench Coat Long",
    price: 3000,
    image: "/images/img9.png",
    rating: 5,
  },
  {
    id: "5",
    name: "Trench Coat Long",
    price: 3000,
    image: "/images/img9.png",
    rating: 5,
    sale: true,
  },
  {
    id: "6",
    name: "Trench Coat Long",
    price: 3000,
    image: "/images/img9.png",
    rating: 5,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-rust text-xs font-bold tracking-widest">
            NEW ARRIVALS
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-dark mt-2">
            Latest Pieces
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="relative bg-gray-300 mb-4 overflow-hidden aspect-square">
                {product.sale && (
                  <div className="absolute top-4 right-4 bg-red-accent text-white px-3 py-1 text-xs font-bold z-10">
                    SALE
                  </div>
                )}
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  <button
                    className="bg-white p-2 rounded hover:bg-cream transition"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={18} className="text-dark" />
                  </button>
                  <button
                    className="bg-white p-2 rounded hover:bg-cream transition"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag size={18} className="text-dark" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-light text-dark mb-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-rust font-semibold">NPR {product.price}</p>
                <div className="flex gap-1">
                  {Array.from({ length: product.rating }).map((_, i) => (
                    <span key={i} className="text-rust text-sm">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/collections/summer"
            className="inline-block border-2 border-gray-400 px-8 py-3 text-dark font-semibold text-sm tracking-wide hover:border-rust hover:text-rust transition"
          >
            LOAD MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
