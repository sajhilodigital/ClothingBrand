"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const steps = ["CART", "SHIPPING", "PAYMENT", "CONFIRM"]

interface CheckoutPageProps {
  params: { step: string }
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const currentStep = steps.indexOf(params.step.toUpperCase().replace("STEP", "").trim()) + 1
  const [selectedAddress, setSelectedAddress] = useState("default")
  const [selectedPayment, setSelectedPayment] = useState("cod")
  const [promoCode, setPromoCode] = useState("")

  const addresses = [
    { id: "default", name: "Default", address: "Bhandari tol, agyat galli, Kathmandu, Gongabu, Nepal" },
    { id: "add1", name: "Add 1", address: "Bhandari tol, agyat galli, Kathmandu, Gongabu, Nepal" },
  ]

  const paymentMethods = [
    { id: "cod", name: "Cash on Delivery" },
    { id: "esewa", name: "eSewa Mobile Wallet" },
    { id: "card", name: "Credit/Debit Card" },
    { id: "khalti", name: "Khalti by IME" },
  ]

  const stepContent = {
    1: "CART",
    2: "SHIPPING",
    3: "PAYMENT",
    4: "CONFIRM",
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Back Link */}
        <Link href="/shop" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8">
          <ChevronLeft size={20} />
          Back to Shop
        </Link>

        <h1 className="text-4xl font-light mb-12">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                  index + 1 <= currentStep ? "bg-green-700" : "bg-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <span className="hidden md:inline text-sm font-bold text-gray-700">{step}</span>
              {index < steps.length - 1 && (
                <div
                  className={`hidden md:block w-16 h-1 mx-2 ${
                    index + 1 < currentStep ? "bg-green-700" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Shipping Step */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-light mb-8">Select Shipping Address</h2>
                <div className="space-y-4 mb-8">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className="flex items-start gap-4 p-6 border-2 rounded-lg cursor-pointer hover:bg-cream-dark transition"
                      style={{ borderColor: selectedAddress === addr.id ? "#2D5016" : "#E8D4BB" }}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-bold text-lg mb-2">{addr.name}</p>
                        <p className="text-gray-700">{addr.address}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-light mb-8">Select Payment Method</h2>
                <div className="grid grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center gap-4 p-6 bg-cream rounded-lg cursor-pointer hover:bg-cream-dark transition border-2 border-transparent"
                      style={{ borderColor: selectedPayment === method.id ? "#2D5016" : "transparent" }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                      />
                      <span className="font-bold text-center flex-1">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Review Step */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-light mb-8">Review & Confirm</h2>

                {/* Shipping Address */}
                <div className="bg-cream p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Shipping Address</h3>
                    <button className="text-gray-600 hover:text-gray-900">✎</button>
                  </div>
                  <p className="text-gray-700">Bhandari tol, agyat galli</p>
                  <p className="text-gray-700">Kathmandu, Gongabu</p>
                  <p className="text-gray-700">Nepal</p>
                </div>

                {/* Payment Method */}
                <div className="bg-cream p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Payment Method</h3>
                    <button className="text-gray-600 hover:text-gray-900">✎</button>
                  </div>
                  <p className="text-gray-700">Cash on Delivery</p>
                </div>

                {/* Order Items */}
                <div className="bg-cream p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Order Items</h3>
                    <button className="text-gray-600 hover:text-gray-900">✎</button>
                  </div>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-4 pb-4 border-b border-cream-dark">
                        <img
                          src="/red-coat.jpg"
                          alt="Product"
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-bold">The Shop Red Trench Coat</p>
                          <p className="text-sm text-gray-600">Size: S | Qty: 1</p>
                          <p className="font-bold text-orange-500">NPR 3000.00</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-cream p-8 rounded-lg h-fit">
            <h2 className="text-2xl font-light mb-6">Order Summary</h2>

            {currentStep === 2 && (
              <>
                <div className="space-y-4 mb-6 border-b border-cream-dark pb-6">
                  <div className="flex justify-between">
                    <span>Subtotal (1 items)</span>
                    <span>NPR. 3000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>NPR. 0</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-xl mb-6">
                  <span>Total</span>
                  <span>Rs. 3000</span>
                </div>
                <Link
                  href="/checkout/payment"
                  className="block w-full bg-green-700 text-white text-center py-3 font-bold hover:bg-green-800 transition rounded-lg"
                >
                  PROCEED TO PAY
                </Link>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="space-y-4 mb-6 border-b border-cream-dark pb-6">
                  <div className="flex justify-between">
                    <span>Subtotal (1 items)</span>
                    <span>NPR. 3000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>NPR. 0</span>
                  </div>
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Promo Code"
                    className="w-full px-4 py-2 border border-gray-400 rounded mb-2"
                  />
                  <button className="w-full bg-orange-500 text-white py-2 font-bold hover:bg-orange-600 transition rounded">
                    APPLY
                  </button>
                </div>
                <div className="flex justify-between font-bold text-xl mb-6">
                  <span>Total</span>
                  <span>Rs. 3000</span>
                </div>
                <Link
                  href="/checkout/confirm"
                  className="block w-full bg-green-700 text-white text-center py-3 font-bold hover:bg-green-800 transition rounded-lg"
                >
                  REVIEW ORDER
                </Link>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className="space-y-4 mb-6 border-b border-cream-dark pb-6">
                  <div className="flex justify-between">
                    <span>Subtotal (1 items)</span>
                    <span>NPR. 3000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>NPR. 0</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-xl mb-6">
                  <span>Total</span>
                  <span>Rs. 3000</span>
                </div>
                <Link
                  href="/checkout/success"
                  className="block w-full bg-green-700 text-white text-center py-3 font-bold hover:bg-green-800 transition rounded-lg"
                >
                  PLACE ORDER
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
