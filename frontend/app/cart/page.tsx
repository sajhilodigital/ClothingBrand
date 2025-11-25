"use client"

import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Trash2 } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  if (items.length === 0) {
    return (
      <main className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-light mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some items to get started</p>
          <Link
            href="/shop"
            className="inline-block bg-green-700 text-white px-8 py-3 font-bold hover:bg-green-800 transition"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-light mb-12">Review Your Order</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 pb-6 border-b border-gray-200">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="font-bold">NPR {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                      className="w-12 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 transition p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-cream p-8 rounded-lg h-fit">
            <h2 className="text-2xl font-light mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 border-b border-cream-dark pb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({items.length} items)</span>
                <span>NPR. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping Fee</span>
                <span>NPR. 0</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-xl mb-6">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>

            <Link
              href="/checkout/shipping"
              className="block w-full bg-green-700 text-white text-center py-3 font-bold hover:bg-green-800 transition rounded-lg"
            >
              PROCEED TO SHIPPING
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
