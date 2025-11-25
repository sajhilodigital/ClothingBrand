import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-cream pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="bg-dark-green text-white px-4 py-2 inline-block mb-8 w-fit text-sm font-bold tracking-wider">
              AUTUMN/WINTER 2025
            </div>

            <h1 className="text-5xl md:text-6xl font-serif text-dark mb-6 leading-tight">
              Lorem ipsum dolor sit amet coaat
            </h1>

            <p className="text-dark text-base md:text-lg leading-relaxed mb-8 max-w-xl text-gray-700">
              Lorem ipsum dolor sit amet consectetur. Mollit id id tempus
              parturient sapien in oc eifeiend. Risus dictum molestia id ornet
              donec elementum cros ornet velit. Pellentesque deneun vituplaud
              ipsum sed lectus ised. Lao doner factus visa nemo sed lectus ised
              senseum. Sit sapien quique in lacus rulla. Tempor venenatis a
              cursus vulputat id a neque. Viverra est natum at nec. Orci sed
              ultrices dictum maximus commoda elementum ornare. Odio sodula
              vitro locus elemerttum of neoneon.
            </p>

            <Link
              href="/shop"
              className="bg-dark-green text-white px-8 py-3 font-bold text-center w-fit hover:bg-opacity-90 transition tracking-wide inline-block"
            >
              SHOP NOW
            </Link>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className=" h-72 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/Hero1.png"
                  alt="Fashion model woman"
                  className="w-full h-50 object-cover"
                />
              </div>
            </div>
            <div className="pt-8 relative">
              <div className="bg-gray-300 h-72 overflow-hidden absolute -left-8">
                <img
                  src="/images/Hero2.png"
                  alt="Fashion woman outfit"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
