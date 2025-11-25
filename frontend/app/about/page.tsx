"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

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
    answer: "Currently, we ship within Nepal. We are working on expanding our international shipping options.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You will receive a tracking number via email once your order ships. You can use this to track your package in real-time.",
  },
]

const policies = [
  {
    title: "EXCHANGE POLICY",
    content: "Items can be exchanged within 30 days of purchase for size or color variations.",
  },
  {
    title: "REFUND POLICY",
    content: "Refunds are processed within 5-7 business days of receiving your returned item.",
  },
  {
    title: "SHIPPING POLICY",
    content: "Free shipping on orders over NPR 2000. Standard shipping applies to orders below this amount.",
  },
]

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openPolicy, setOpenPolicy] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-400 flex items-center justify-center text-white text-center">
        <img
          src="/summer-collection-banner.png"
          alt="Summer Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-light">SUMMER COLLECTION 2025</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <img src="/fashion-model-woman.jpg" alt="About" className="w-full rounded-lg" />
          </div>
          <div>
            <img src="/fashion-style-outfit.png" alt="About" className="w-full rounded-lg" />
          </div>
        </div>

        {/* About Text */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-light mb-6">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Shop was founded with a vision to bring high-quality, stylish clothing to everyone. We believe in
            sustainable fashion and ethical practices. Each piece in our collection is carefully curated to ensure
            quality and style.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-light text-center mb-12">FAQs</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-orange-500 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-white text-left font-bold flex justify-between items-center hover:bg-orange-600 transition"
                >
                  {faq.question}
                  <ChevronDown size={20} className={`transition ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-orange-50 text-gray-700 border-t-2 border-orange-400">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Policies Section */}
        <section>
          <h2 className="text-4xl font-light text-center mb-12">Our Policies</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {policies.map((policy, index) => (
              <div key={index} className="border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenPolicy(openPolicy === index ? null : index)}
                  className="w-full px-6 py-4 text-left font-bold flex justify-between items-center hover:bg-gray-50 transition"
                >
                  {policy.title}
                  <ChevronDown size={20} className={`transition ${openPolicy === index ? "rotate-180" : ""}`} />
                </button>
                {openPolicy === index && (
                  <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t-2 border-gray-300">{policy.content}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
