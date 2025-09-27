import React, { Suspense, lazy } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import SEOHead from '../../components/SEOHead';

// Lazy load heavy components to improve initial bundle size
const StylistSpotlight = lazy(() => import('./components/StylistSpotlight'));
const ClientTestimonials = lazy(() => import('./components/ClientTestimonials'));
const SalonGallery = lazy(() => import('./components/SalonGallery'));

// Loading component for better UX
const SectionLoader = () => (
  <div className="py-16 lg:py-24">
    <div className="container mx-auto px-6 lg:px-8">
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
);

const Homepage = () => {
  // Structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "La Coiffure Salon",
    "description": "Premium hair salon offering haircuts, coloring, keratin treatments, bridal makeup, and beauty services in Powai & Thane, Mumbai.",
    "url": "https://lacoiffuresalons.com",
    "logo": "https://lacoiffuresalons.com/la-coiffure-salon-logo.png",
    "image": "https://lacoiffuresalons.com/la-coiffure-salon-logo.png",
    "telephone": "+91-9876543210",
    "priceRange": "$$",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Galleria Hiranandani, Powai",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400076",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Anand Nagar, Thane",
        "addressLocality": "Thane",
        "addressRegion": "Maharashtra",
        "postalCode": "400601",
        "addressCountry": "IN"
      }
    ],
    "openingHours": "Mo-Sa 09:00-21:00",
    "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
    "currenciesAccepted": "INR",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Beauty Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Haircut & Styling",
            "description": "Professional haircuts and styling services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hair Coloring",
            "description": "Hair coloring, highlights, and balayage services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Keratin Treatment",
            "description": "Keratin smoothing and straightening treatments"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bridal Makeup",
            "description": "Professional bridal makeup and styling services"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "1000"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Best Hair Salon in Powai & Thane | La Coiffure Salon"
        description="La Coiffure Salon offers premium haircuts, keratin treatments, hair coloring, bridal makeup, and beauty services in Powai & Thane. Expert stylists, luxury experience. Book now!"
        keywords="best salon Powai, best salon Thane, hair salon Mumbai, keratin treatment Powai, hair color Thane, bridal makeup Powai, beauty salon Mumbai, luxury salon"
        canonicalUrl="/"
        ogImage="/la-coiffure-salon-logo.png"
        ogType="website"
        structuredData={structuredData}
      />
      <Header />
      <main>
        {/* Critical above-the-fold content loads immediately */}
        <HeroSection />
        
        {/* Below-the-fold content loads lazily */}
        <Suspense fallback={<SectionLoader />}>
          <StylistSpotlight />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ClientTestimonials />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <SalonGallery />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;