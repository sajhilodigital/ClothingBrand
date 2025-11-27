"use client";

import { useState } from "react";
import { ChevronDown, Truck, RefreshCcw, LocateFixed } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer 30-day returns on all items. Items must be unworn and in original condition. Simply contact our customer service team to initiate a return.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 5-7 business days. Express shipping options are available for faster delivery.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship within Nepal. We are working on expanding our international shipping options.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You will receive a tracking number via email once your order ships. You can use this to track your package in real-time.",
  },
];

const policies = [
  {
    title: "EXCHANGE POLICY",
    content:
      "Items can be exchanged within 30 days of purchase for size or color variations.",
  },
  {
    title: "REFUND POLICY",
    content:
      "Refunds are processed within 5-7 business days of receiving your returned item.",
  },
  {
    title: "SHIPPING POLICY",
    content:
      "Free shipping on orders over NPR 2000. Standard shipping applies to orders below this amount.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openPolicy, setOpenPolicy] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white w-full">
      {/* Hero Strip */}
      <section>
        <h1 className="bg-green-900 text-white text-xl! p-2! pl-6! font-sans!">
          ABOUT US
        </h1>
      </section>

      <div className="container mx-auto! px-4! py-20!">
        {/* Welcome Section */}
        <section className="mb-20!">
          <h2 className="text-4xl font-light text-center mb-6!">
            Welcome to The Shop
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12! text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quibusdam, voluptate quia quod quos, quas voluptatibus
            quidem quae doloribus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Column: Image + Text */}
            <div className="rounded-lg overflow-hidden flex flex-col">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/images/img7.png"
                  alt="Fashion 1"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="bg-white p-4! text-sm text-gray-700">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quasi, doloremque cum. Ducimus a est, quod perferendis ratione
                  necessitatibus voluptate quae blanditiis sed cumque, qui
                  excepturi eum corrupti alias! In iste, dolore esse unde odit
                  eaque nam ipsa ullam alias molestias pariatur? Nisi optio
                  accusamus, delectus corporis iure voluptatibus tempora sit.
                </p>
              </div>
            </div>

            {/* Second Column: Taller Image, Flush to Bottom */}
            <div className="pt-12!">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/images/img2.png"
                  alt="Fashion 2"
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-20!">
          <h2 className="text-4xl font-light text-center mb-12!">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-4 bg-cream py-6! rounded-lg">
              <Truck size={32} className="text-orange-500" />
              <p className="text-sm font-semibold">Fast Delivery</p>
            </div>
            <div className="flex flex-col items-center gap-4 bg-cream py-6! rounded-lg">
              <LocateFixed size={32} className="text-orange-500" />
              <p className="text-sm font-semibold">Realtime Tracking</p>
            </div>
            <div className="flex flex-col items-center gap-4 bg-cream py-6! rounded-lg">
              <RefreshCcw size={32} className="text-orange-500" />
              <p className="text-sm font-semibold">Exchange & Refund</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20!">
          <h2 className="text-4xl font-light text-center mb-12!">FAQs</h2>
          <div className="max-w-2xl mx-auto! space-y-4!">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-orange-500 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6! py-4! text-white text-left font-bold flex justify-between items-center hover:bg-orange-600 transition"
                >
                  {faq.question}
                  <ChevronDown
                    size={20}
                    className={`transition ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6! py-4! bg-orange-50 text-gray-700 border-t-2 border-orange-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Policies Section */}
        <section>
          <h2 className="text-4xl font-light text-center mb-12!">
            Our Policies
          </h2>
          <div className="max-w-2xl mx-auto! space-y-4!">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="border-2 border-gray-300 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenPolicy(openPolicy === index ? null : index)
                  }
                  className="w-full px-6! py-4! text-left font-bold flex justify-between items-center hover:bg-gray-50 transition"
                >
                  {policy.title}
                  <ChevronDown
                    size={20}
                    className={`transition ${
                      openPolicy === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openPolicy === index && (
                  <div className="px-6! py-4! bg-gray-50 text-gray-700 border-t-2 border-gray-300">
                    {policy.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
