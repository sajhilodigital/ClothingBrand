import { Truck, RefreshCw, RotateCcw } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep",
  },
  {
    icon: RefreshCw,
    title: "Realtime Tracking",
    description: "Track your order every step of the way",
  },
  {
    icon: RotateCcw,
    title: "Exchange & Refund",
    description: "Hassle-free returns and exchanges",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light">OUR SERVICES</h2>
          <p className="text-gray-600 mt-2">Committed to providing the best shopping experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="bg-cream-dark rounded-lg p-8 text-center">
                <Icon size={40} className="mx-auto text-green-700 mb-4" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
