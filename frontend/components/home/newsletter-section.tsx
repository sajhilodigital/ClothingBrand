"use client";

import type React from "react";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend: Subscribe email to newsletter
    // POST /api/newsletter/subscribe { email }
    setEmail("");
  };

  return (
    <section className="py-20! bg-[#1f4c0a] text-white mx-auto! max-w-7xl my-10!">
      <div className="container mx-auto! px-4! text-center">
        <h2 className="text-4xl font-light mb-4!">Join Our Community</h2>
        <p className="text-lg! mb-8!">
          Subscribe to receive exclusive updates, early access to new
          collections, and special offers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto! gap-2 flex flex-col"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4! py-3! rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-white border-white border mx-4!"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 px-8! py-3! font-bold rounded-lg hover:bg-orange-600 transition mx-4!"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}
