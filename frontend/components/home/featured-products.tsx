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
    <section className="py-10! bg-white px-4!">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-rust text-xs font-bold tracking-widest">
            NEW ARRIVALS
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-dark mt-2">
            Latest Pieces
          </h2>
        </div>

        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
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
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <div className="flex justify-between">
                <h3 className=" font-light text-dark mb-2 text-md!">
                  {product.name}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-rust font-semibold">NPR {product.price}</p>
                <div className="flex gap-2 pr-5!">
                  <button
                    className="cursor-pointer p-2 rounded hover:text-red-600 text-dark transition"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={22} />
                  </button>
                  <button
                    className="cursor-pointer p-2 rounded hover:text-blue-400 text-dark transition"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag size={22} />
                  </button>
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
