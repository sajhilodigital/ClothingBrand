import HeroSection from "@/components/home/hero-section";
import FeaturedProducts from "@/components/home/featured-products";
import ServicesSection from "@/components/home/services-section";
import Testimonials from "@/components/home/testimonials";
import LifestyleGallery from "@/components/home/lifestyle-gallery";
import NewsletterSection from "@/components/home/newsletter-section";
import PromoCarousel from "@/components/home/Promo";
import BigImage from "@/components/home/BigImage";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      {/* <PromoCarousel /> */}
      {/* <ServicesSection /> */}
      {/* <Testimonials /> */}
      <BigImage />
      <LifestyleGallery />
      <NewsletterSection />
    </main>
  );
}
