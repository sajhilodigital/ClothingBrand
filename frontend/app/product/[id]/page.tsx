"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Red");
  const [openSizeChart, setOpenSizeChart] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const { addItem } = useCart();

  const product = {
    id: params.id,
    name: "The Shop Red Trench Coat",
    description: "Lorem ipsum dolor sit amet coat",
    price: 3000,
    image: "/red-trench-coat.jpg",
    rating: 5,
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "Red", "Blue", "Green", "Yellow"];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <main className="bg-white">
      <div className="container mx-auto! px-4! py-12!">
        <Link
          href="/shop"
          className="text-sm! text-gray-600 hover:text-gray-900 mb-8! flex items-center gap-1"
        >
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12!">
          {/* Product Image */}
          <div className="bg-gray-200 aspect-square rounded-lg overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl! font-light! mb-2!">
              {product.description}
            </h1>
            <p className="text-2xl! text-orange-500 font-bold! mb-4!">
              NPR {product.price}
            </p>

            {/* Size Selector */}
            <div className="mb-6!">
              <label className="block text-sm! font-bold! mb-2!">Size:</label>
              <div className="flex gap-2! mb-2!">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4! py-2! border-2 rounded transition ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-6!">
              <label className="block text-sm! font-bold! mb-2!">Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-4! py-2! border-2 border-gray-300 rounded appearance-none bg-white"
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="mb-6!">
              <label className="block text-sm! font-bold! mb-2!">Qty:</label>
              <div className="flex items-center gap-4!">
                <button
                  title="Decrease"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2! border border-gray-300 rounded hover:bg-gray-100"
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl! font-bold! w-8 text-center">
                  {quantity}
                </span>
                <button
                  title="Increase"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2! border border-gray-300 rounded hover:bg-gray-100"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4! mb-12!">
              <button className="flex-1 bg-green-700 text-white px-8! py-3! font-bold hover:bg-green-800 transition rounded-lg">
                BUY NOW
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 text-white px-8! py-3! font-bold! hover:bg-orange-600 transition rounded-lg"
              >
                ADD TO CART
              </button>
            </div>

            {/* Size Chart */}
            <div className="border-t-2 border-b-2 border-gray-300 py-4! mb-4!">
              <button
                onClick={() => setOpenSizeChart(!openSizeChart)}
                className="w-full flex justify-between items-center font-bold! text-left"
              >
                SIZE CHART
                <ChevronDown
                  size={20}
                  className={`transition ${openSizeChart ? "rotate-180" : ""}`}
                />
              </button>
              {openSizeChart && (
                <div className="mt-4! text-sm! text-gray-600">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2!">Size</th>
                        <th className="text-left py-2!">Chest (cm)</th>
                        <th className="text-left py-2!">Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["XS", "76", "56"],
                        ["S", "81", "58"],
                        ["M", "86", "60"],
                        ["L", "91", "62"],
                        ["XL", "96", "64"],
                      ].map((row) => (
                        <tr key={row[0]} className="border-b">
                          <td className="py-2!">{row[0]}</td>
                          <td className="py-2!">{row[1]}</td>
                          <td className="py-2!">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Policy */}
            <div className="border-b-2 border-gray-300 py-4!">
              <button
                onClick={() => setOpenPolicy(!openPolicy)}
                className="w-full flex justify-between items-center font-bold! text-left"
              >
                POLICY
                <ChevronDown
                  size={20}
                  className={`transition ${openPolicy ? "rotate-180" : ""}`}
                />
              </button>
              {openPolicy && (
                <div className="mt-4! text-sm! text-gray-600">
                  <p className="mb-2!">• 30-day returns on all items</p>
                  <p className="mb-2!">
                    • Items must be unworn and in original condition
                  </p>
                  <p>• Free shipping on orders over NPR 2000</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
