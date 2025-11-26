"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LifestyleGallery() {
  const images = [
    "/images/img1.png", // first column top
    "/images/img2.png", // first column bottom
    "/images/img3.png", // second column top
    "/images/img4.png", // second column bottom
    "/images/img5.png", // third column top
    "/images/img6.png", // third column middle
    "/images/img7.png", // third column bottom
  ];

  return (
    <section className="py-20! px-4!">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Column */}
          <div className="flex flex-col gap-6">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src={images[0]}
                alt="Lifestyle"
                fill
                loading="eager"
                className="object-cover w-full h-full hover:scale-130 transition ease duration-300 cursor-pointer"
              />
            </div>
            <div className="relative grow rounded-lg overflow-hidden">
              <Image
                src={images[1]}
                alt="Lifestyle"
                fill
                className="object-cover w-full h-full hover:scale-130 transition ease duration-300 cursor-pointer"
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col gap-6">
            <div className="relative h-[250px] rounded-lg overflow-hidden">
              <Image
                src={images[2]}
                alt="Lifestyle"
                fill
                className="object-cover w-full h-full hover:scale-130 transition ease duration-300 cursor-pointer"
              />
            </div>

            {/* Branding Block */}
            <div className="bg-dark-green text-white flex flex-col items-center justify-center rounded-lg p-6 text-center h-[250px] ">
              <img src="/logo.png" alt="Logo" height={200} width={200} />
              <div className="flex gap-4 justify-center mt-4!">
                <Link href="#" aria-label="Instagram">
                  <Instagram className="w-6 h-6 hover:text-red-600 transition duration-200" />
                </Link>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="w-6 h-6 hover:text-blue-600 transition duration-200" />
                </Link>
                <Link href="#" aria-label="TikTok">
                  <Youtube className="w-6 h-6 hover:text-red-600 transition duration-200" />
                </Link>
                <Link href="#" aria-label="WhatsApp">
                  <Twitter className="w-6 h-6 hover:text-blue-600 transition duration-200" />
                </Link>
              </div>
            </div>

            <div className="relative h-[250px] rounded-lg overflow-hidden">
              <Image
                src={images[3]}
                alt="Lifestyle"
                fill
                className="object-cover w-full h-full hover:scale-130 transition ease duration-300 cursor-pointer"
              />
            </div>
          </div>

          {/* Third Column */}
          <div className="flex flex-col gap-6">
            <div className="relative flex items-center justify-center h-[200px] rounded-lg overflow-hidden">
              <Image
                src={images[4]}
                alt="Lifestyle"
                fill
                className="object-cover hover:scale-130 transition ease duration-300 cursor-pointer"
              />
              <Image
                src={images[5]}
                alt="Lifestyle"
                fill
                className="object-cover hover:scale-130 transition ease duration-300 cursor-pointer"
              />
            </div>

            <div className="relative grow rounded-lg overflow-hidden">
              <Image
                src={images[6]}
                alt="Lifestyle"
                fill
                className="object-cover w-full h-full hover:scale-130 transition ease duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
