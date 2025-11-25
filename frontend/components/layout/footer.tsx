import Link from "next/link"
import { Facebook, Instagram, TicketIcon as TikTok, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Shop */}
          <div>
            <h3 className="text-rust font-bold mb-6 text-lg">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?type=new" className="text-gray-300 hover:text-white transition text-sm">
                  New Arrival
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-300 hover:text-white transition text-sm">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=bestsellers" className="text-gray-300 hover:text-white transition text-sm">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-rust font-bold mb-6 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 text-sm">98-16124054</li>
              <li>
                <a href="tel:98-16124054" className="text-gray-300 hover:text-white transition text-sm">
                  98-16124054
                </a>
              </li>
              <li>
                <a
                  href="mailto:promotdharu.2020@gmail.com"
                  className="text-gray-300 hover:text-white transition text-sm"
                >
                  promotdharu.2020@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-rust font-bold mb-6 text-lg">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition text-sm">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Kathmandu Store */}
          <div>
            <h3 className="text-rust font-bold mb-6 text-lg">Kathmandu Store</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 text-sm">98-16124054</li>
              <li className="text-gray-300 text-sm">98-16124054</li>
              <li className="text-gray-300 text-sm">Gongabu, Thapel</li>
              <li className="text-gray-300 text-sm">10:00am - 7 am</li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 border-t border-gray-700 py-8">
          <a href="#" className="text-gray-300 hover:text-rust transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gray-300 hover:text-rust transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-300 hover:text-rust transition">
            <TikTok size={20} />
          </a>
          <a href="#" className="text-gray-300 hover:text-rust transition">
            <Twitter size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>2025 | All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
