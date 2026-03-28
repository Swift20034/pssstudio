import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AwardsSection from "@/components/AwardsSection";
import ServicesSection from "@/components/ServicesSection";
import SummerOffersSection from "@/components/SummerOffersSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const PSS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PSS Makeup Studio & Academy",
  "image": "https://pss-studio.com/logo.png",
  "telephone": "+91-9686373707",
  "email": "pssacademy@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bangalore",
    "addressLocality": "Bangalore",
    "addressRegion": "KA",
    "postalCode": "560001",
    "addressCountry": "IN"
  },
  "url": "https://pss-studio.com",
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "20:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/pss_makeup_studio_academy"
  ]
};

const Index = () => {
  const location = useLocation();
  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO 
        title="PSS Makeup Studio & Academy | Best Luxury Makeup in Bangalore"
        description="Premium bridal makeup, hair styling, nail art, and professional artist training since 2009. We specialize in HD & Airbrush transformations."
        schema={PSS_SCHEMA}
      />
      <ScrollProgress />
      <Navbar />
      <main className="flex flex-col">
        <HeroSection />
        <ServicesSection />
        <SummerOffersSection />
        <PortfolioSection />
        <AboutSection />
        <AwardsSection />
        <TestimonialsSection />
        <BookingSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
