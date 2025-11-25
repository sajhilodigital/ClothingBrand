import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center py-20">
        <CheckCircle size={64} className="mx-auto text-green-700 mb-6" />

        <h1 className="text-5xl font-light mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">Thank you for your purchase</p>

        <div className="bg-cream p-8 rounded-lg inline-block mb-12">
          <p className="text-gray-700 mb-2">Order Number:</p>
          <p className="text-2xl font-bold text-gray-900">#jb564635dvsdvsw-5558</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/profile/orders"
            className="bg-green-700 text-white px-8 py-3 font-bold hover:bg-green-800 transition rounded-lg"
          >
            TRACK YOUR ORDER
          </Link>
          <Link
            href="/shop"
            className="border-2 border-gray-400 px-8 py-3 font-bold hover:border-orange-500 hover:text-orange-500 transition rounded-lg"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </main>
  )
}
