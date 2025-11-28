"use client";

import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white ">
      {/* Left: Sign In Form */}
      <div className="flex flex-col justify-center px-12! py-20!">
        <h1 className="text-4xl! font-bold! text-dark! mb-10!">Sign In</h1>

        <form className="space-y-6!">
          <div>
            <label className="block text-sm! font-semibold! text-gray-700 mb-2!">
              ENTER YOUR EMAIL
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4! py-3! border border-gray-300 rounded-lg text-sm! focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="block text-sm! font-semibold! text-gray-700 mb-2!">
              ENTER YOUR PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4! py-3! border border-gray-300 rounded-lg text-sm! focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3! text-sm! font-bold rounded-lg hover:bg-green-800 transition"
          >
            Log in
          </button>
        </form>

        <div className="mt-6! text-sm! text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-green-700 font-semibold hover:underline"
          >
            Signup
          </Link>
        </div>

        {/* <div className="mt-8! flex items-center justify-center">
          <button className="flex items-center gap-3! border border-gray-300 px-6! py-3! rounded-lg text-sm! hover:bg-gray-100 transition">
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
            Log in with Google
          </button>
        </div> */}
      </div>

      {/* Right: Fashion Image */}
      <div className="hidden md:block relative">
        <Image
          src="/images/img4.png"
          alt="Fashion Model"
          fill
          className="object-cover w-full h-full"
        />
      </div>
    </main>
  );
}
