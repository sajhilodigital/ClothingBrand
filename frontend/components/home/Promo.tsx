"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const slides = [
  {
    image: "/images/collection bg.jpg",
    title: "Crafted with Purpose",
    description:
      "Lorem ipsum dolor sit amet consectetur. Faucibus morbi nulla sollicitudin purus. Elementum leo ac amet non proin leo mattis vel. Habitasse accumsan.",
    button: "SHOP NOW",
  },
  {
    image: "/images/collection bg.jpg",
    title: "Timeless Essentials",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    button: "SHOP NOW",
  },
  {
    image: "/images/collection bg.jpg",
    title: "Elevate Your Style",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.",
    button: "SHOP NOW",
  },
];

export default function PromoCarousel() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="bg-dark-green text-white py-10! flex items-center justify-center h-[400px]">
      <div className="bg-white text-black max-w-6xl mx-auto px-4! sm:px-6! lg:px-8! text-center">
        {/* Slide Content */}
        {/* <Carousel> */}
        <div className="relative flex items-center justify-between h-80">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
              {slides[current].title}
            </h2>
            <p className="text-base sm:text-lg mb-6 leading-relaxed">
              {slides[current].description}
            </p>
            <Link
              href="/shop"
              className="mt-5! inline-block bg-rust text-white px-15! py-2! text-sm font-semibold hover:bg-opacity-90 transition"
            >
              {slides[current].button}
            </Link>
          </div>

          {/* Image */}
          <div className="mt-10 flex justify-center">
            <div className="w-[300px] h-[200px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={slides[current].image}
                alt={slides[current].title}
                width={300}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        {/* </Carousel> */}

        {/* Navigation Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full z-10 ${
                current === index ? "bg-red" : "bg-white/30"
              } transition`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
