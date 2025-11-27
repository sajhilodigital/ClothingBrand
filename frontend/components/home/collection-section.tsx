"use client";

import Image from "next/image";

const summerCollection = {
  title: "SUMMER COLLECTION",
  items: [
    {
      name: "Light Grey T-Shirt",
      count: 12,
      image: "/images/img6.png",
    },
    {
      name: "Rust Bomber Jacket",
      count: 8,
      image: "/images/img5.png",
    },
    {
      name: "Cream Knit Poncho",
      count: 20,
      image: "/images/img13.png",
    },
  ],
};

export default function CollectionSection() {
  return (
    <section className="bg-white py-20! px-4!">
      <div className="max-w-6xl mx-auto! text-center mb-12!">
        <h2 className="text-4xl! font-light! mb-2!">
          {summerCollection.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8! max-w-5xl mx-auto!">
        {summerCollection.items.map((item, index) => (
          <div
            key={index}
            className=" relative h-[400px] rounded-lg overflow-hidden group"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover w-full h-full hover:scale-120 transition duration-350"
            />
            <div className="absolute bottom-0 left-0 z-10 bg-black/50 text-white p-4! w-full">
              <h3 className="text-lg! font-semibold!">{item.name}</h3>
              <p className="text-sm!">{item.count} PIECES</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
