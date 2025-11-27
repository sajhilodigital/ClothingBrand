"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX;

    if (delta > 50) {
      nextSlide();
    } else if (delta < -50) {
      prevSlide();
    }

    touchStartX.current = null;
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getSlideIndex = (offset: number) =>
    (current + offset + slides.length) % slides.length;

  return (
    <section
      className="bg-dark-green text-white py-20! px-4!"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-center gap-6! overflow-hidden">
          {/* Left Preview */}
          <SlideCard
            slide={slides[getSlideIndex(-1)]}
            size="small"
            position="left"
          />

          {/* Center Main */}
          <SlideCard
            slide={slides[current]}
            size="large"
            position="center"
            isActive
          />

          {/* Right Preview */}
          <SlideCard
            slide={slides[getSlideIndex(1)]}
            size="small"
            position="right"
          />
        </div>

        {/* Navigation Dots */}
        <div className="mt-8! flex justify-center gap-3!">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
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

function SlideCard({
  slide,
  size,
  position,
  isActive = false,
}: {
  slide: {
    image: string;
    title: string;
    description: string;
    button: string;
  };
  size: "large" | "small";
  position: "left" | "center" | "right";
  isActive?: boolean;
}) {
  const base =
    size === "large"
      ? "w-[60%] h-[400px] z-10"
      : "w-[20%] h-[250px] opacity-50 scale-90 z-0";

  return (
    <div
      className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${base}`}
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-cover w-full h-full"
      />
      {isActive && (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6! py-8! bg-black/40 text-white">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4!">
            {slide.title}
          </h2>
          <p className="text-base sm:text-lg mb-6! leading-relaxed max-w-xl">
            {slide.description}
          </p>
          <Link
            href="/shop"
            className="inline-block bg-rust text-white px-10! py-2! text-sm font-semibold hover:bg-opacity-90 transition"
          >
            {slide.button}
          </Link>
        </div>
      )}
    </div>
  );
}
