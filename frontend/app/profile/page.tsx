"use client"

import { useState } from "react"
import { X, Home, ShoppingBag, MapPin, LogOut } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Close button */}
        <button className="float-right mb-4 p-2 hover:bg-gray-100 rounded-lg">
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Profile Card */}
            <div className="bg-cream p-6 rounded-lg mb-6 text-center">
              <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                👤
              </div>
              <h2 className="text-xl font-bold mb-2">Puspa Grg</h2>
              <p className="text-gray-600 text-sm">puspagrg2004@gmail.com</p>
              <button className="mt-4 text-gray-600 hover:text-gray-900">✎ Edit Profile</button>
            </div>

            {/* Menu */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "overview" ? "bg-cream border-l-4 border-green-700" : "hover:bg-gray-100"
                }`}
              >
                <Home size={20} />
                <span className="font-bold">Overview</span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "orders" ? "bg-cream border-l-4 border-green-700" : "hover:bg-gray-100"
                }`}
              >
                <ShoppingBag size={20} />
                <span className="font-bold">Orders</span>
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "addresses" ? "bg-cream border-l-4 border-green-700" : "hover:bg-gray-100"
                }`}
              >
                <MapPin size={20} />
                <span className="font-bold">Address</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                <LogOut size={20} />
                <span className="font-bold">Logout</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-4xl font-light mb-8">Overview</h2>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                  <div className="bg-cream p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-700 mb-2">10</div>
                    <p className="font-bold">Total Orders</p>
                  </div>
                  <div className="bg-cream p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-700 mb-2">1</div>
                    <p className="font-bold">To Deliver</p>
                  </div>
                  <div className="bg-cream p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-700 mb-2">12</div>
                    <p className="font-bold">Wishlist</p>
                  </div>
                </div>

                {/* Recent Orders */}
                <div>
                  <h3 className="text-2xl font-light mb-6">Recent Orders</h3>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-cream p-6 rounded-lg flex gap-6">
                        <img src="/red-coat.jpg" alt="Order" className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Tracking ID: 152sfvhbef58befhb</p>
                          <p className="text-sm text-gray-600">11/10/2004</p>
                          <p className="font-bold text-orange-500 mt-2">NPR 3000.00</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded ${i === 1 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}
                          >
                            {i === 1 ? "PROCESSING" : "Delivered"}
                          </span>
                          <button className="block mt-4 text-green-700 font-bold hover:underline">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-4xl font-light mb-8">Order History</h2>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-cream p-6 rounded-lg flex gap-6">
                      <img src="/red-coat.jpg" alt="Order" className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Tracking ID: 152sfvhbef58befhb</p>
                        <p className="text-sm text-gray-600">11/10/2004</p>
                        <p className="font-bold text-orange-500 mt-2">NPR 3000.00</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded ${i === 1 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}
                        >
                          {i === 1 ? "PROCESSING" : "Delivered"}
                        </span>
                        <button className="block mt-4 text-green-700 font-bold hover:underline">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-4xl font-light">Saved Addresses</h2>
                  <button className="bg-green-700 text-white px-6 py-2 font-bold hover:bg-green-800 transition rounded-lg">
                    ADD NEW
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {["Default", "Add 1"].map((addr, i) => (
                    <div key={i} className="bg-cream p-6 rounded-lg">
                      <h3 className="font-bold text-lg mb-4">{addr}</h3>
                      <p className="text-gray-700 mb-2">Bhandari tol, agyat galli</p>
                      <p className="text-gray-700 mb-4">Kathmandu, Gongabu</p>
                      <p className="text-gray-700 mb-4">Nepal</p>
                      <div className="flex gap-4">
                        <button className="text-gray-600 hover:text-gray-900">✎</button>
                        <button className="text-red-600 hover:text-red-800">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
