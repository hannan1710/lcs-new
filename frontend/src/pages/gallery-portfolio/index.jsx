import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import ImageLightbox from './components/ImageLightbox';
import { getAllGalleryImages } from '../../data/galleryData';

const GalleryPortfolio = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all gallery images from shared data source
  const galleryData = getAllGalleryImages();

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryData.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-yellow-500 mb-6">
              La Coiffure's Portfolio
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our Portfolio—where expertise, elegance, and premium care come together for your beauty and wellness.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {galleryData.map((item, index) => (
              <button
                key={item.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer min-h-[48px] min-w-[48px] w-full"
                onClick={() => openLightbox(index)}
                aria-label={`View full size image: ${item.alt}`}
              >
                <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  {/* Click to view text on hover */}
                  <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-xs sm:text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                      <span className="hidden sm:inline">Click to view full photo</span>
                      <span className="sm:hidden">View</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center bg-accent/10 border border-accent/20 rounded-lg p-8">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
              Ready to Create Your Own Story?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Book your appointment today and let our expert stylists transform your look. 
              Every masterpiece starts with a single step.
            </p>
            <button
              onClick={() => window.location.href = '/appointment-booking'}
              className="group relative inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-accent via-accent to-yellow-500 text-accent-foreground font-bold text-lg py-4 px-8 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/40 hover:scale-105 active:scale-95 min-h-[48px] min-w-[48px]"
              aria-label="Book appointment to create your own transformation"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-accent to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center space-x-3">
                <Icon name="Calendar" size={20} className="group-hover:animate-bounce" />
                <span>Book Appointment</span>
                <Icon name="ArrowRight" size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={galleryData}
        currentIndex={currentImageIndex}
        onNext={nextImage}
        onPrevious={prevImage}
      />
    </div>
  );
};

export default GalleryPortfolio;