"use client";

import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left: Fashion Image (hidden on mobile) */}
      <div className="hidden md:block relative">
        <Image
          src="/images/img14.png"
          alt="Fashion Model"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute top-6! left-6! bg-black/60 text-white px-4! py-2! rounded-lg text-sm! font-semibold">
          good vibes only
        </div>
      </div>

      {/* Right: Sign Up Form */}
      <div className="flex flex-col justify-center px-6! sm:px-12! py-20! bg-beige">
        <h1 className="text-4xl! font-bold text-dark mb-10!">Sign UP</h1>
        <form className="space-y-5! max-w-lg mx-auto w-full">
          {[
            { label: "Name", type: "text" },
            { label: "Email", type: "email" },
            { label: "Phone Number", type: "tel" },

            { label: "Password", type: "password" },
            { label: "Confirm Password", type: "password" },
          ].map((field, i) => (
            <div key={i}>
              <label className="block text-sm! font-semibold text-gray-700 mb-2!">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.label}
                className="w-full px-4! py-3! border border-gray-300 rounded-lg text-sm! focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3! text-sm! font-bold! rounded-lg hover:bg-green-800 transition"
          >
            Sign up
          </button>
        </form>

        <div className="mt-6! text-sm! text-gray-600 pl-5!">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-green-700 font-semibold! hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
