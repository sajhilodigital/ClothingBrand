const testimonials = [
  {
    name: "Sarah Johnson",
    text: "Amazing quality and fast delivery. Highly recommend!",
    image: "/serene-woman.png",
  },
  {
    name: "Michael Chen",
    text: "Great customer service and beautiful pieces. Will buy again!",
    image: "/man-face.png",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light">WHAT CUSTOMERS SAY</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-cream p-8 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              <div className="flex justify-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-orange-500">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
