export default function LifestyleGallery() {
  const images = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    image: `/images/img${i + 1}.png`,
  }));

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light">LIFESTYLE</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((item) => (
            <div
              key={item.id}
              className="bg-gray-300 aspect-square rounded-lg overflow-hidden hover:opacity-80 transition"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt="Lifestyle"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
