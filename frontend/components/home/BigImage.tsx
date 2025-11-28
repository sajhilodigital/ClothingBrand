"use client";

import Link from "next/link";
import Image from "next/image";

export default function BigImage() {
  return (
    <section className="relative w-full max-w-7xl mx-auto! h-[500px] sm:h-[400px] md:h-[500px] lg:h-[600px] mt-5!">
      {/* Background Image */}
      <Image
        src="/images/img8.png"
        alt="Shop Our Style"
        fill
        priority
        className="object-cover w-full h-full"
      />

      {/* Overlay Container */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <Link
          href="/shop"
          className="px-6! py-3! hover:bg-black transition duration-300 rounded-md"
        >
          <span className="text-white text-2xl sm:text-3xl md:text-4xl font-serif font-bold hover:text-white">
            SHOP OUR STYLE
          </span>
        </Link>
      </div>
    </section>
  );
}
