import HeroSection from "@/components/home/hero-section"
import FeaturedProducts from "@/components/home/featured-products"
import ServicesSection from "@/components/home/services-section"
import Testimonials from "@/components/home/testimonials"
import LifestyleGallery from "@/components/home/lifestyle-gallery"
import NewsletterSection from "@/components/home/newsletter-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <ServicesSection />
      <Testimonials />
      <LifestyleGallery />
      <NewsletterSection />
    </main>
  )
}
