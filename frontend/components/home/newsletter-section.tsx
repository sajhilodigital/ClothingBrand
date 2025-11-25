"use client"

import type React from "react"

import { useState } from "react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Backend: Subscribe email to newsletter
    // POST /api/newsletter/subscribe { email }
    setEmail("")
  }

  return (
    <section className="py-20 bg-green-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-light mb-4">Join Our Community</h2>
        <p className="text-lg mb-8">
          Subscribe to receive exclusive updates, early access to new collections, and special offers.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <button type="submit" className="bg-orange-500 px-8 py-3 font-bold rounded-lg hover:bg-orange-600 transition">
            SIGN UP
          </button>
        </form>
      </div>
    </section>
  )
}
