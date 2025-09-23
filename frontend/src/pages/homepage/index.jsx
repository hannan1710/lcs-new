import React, { Suspense, lazy } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';

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
  return (
    <div className="min-h-screen bg-background">
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