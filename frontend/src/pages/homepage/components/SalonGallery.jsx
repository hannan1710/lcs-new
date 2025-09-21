import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import { getSlideshowImages } from "../../../data/galleryData";

const SalonGallery = () => {
  const [displayedImages, setDisplayedImages] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize with random images - 8 for desktop (4x2), 4 for mobile (2x2)
  useEffect(() => {
    const images = getSlideshowImages();
    setDisplayedImages(images.slice(0, 8)); // Show 8 images for desktop 4x2 grid
  }, []);

  // Change images every 8 seconds with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Wait for fade out, then change images
      setTimeout(() => {
        const images = getSlideshowImages();
        setDisplayedImages(images.slice(0, 8)); // Show 8 images for desktop 4x2 grid
        setIsTransitioning(false);
      }, 200); // Reduced fade out time
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Our Gallery
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Explore our stunning salon space and witness the artistry of our
            work through our curated gallery of transformations.
          </p>
        </div>


        {/* Gallery Grid with Enhanced Slideshow */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {displayedImages?.map((image, index) => (
            <div
              key={`${image?.id}-${Date.now()}`}
              className={`group relative overflow-hidden rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-1000 cursor-pointer ${
                isTransitioning ? 'opacity-70' : 'opacity-100'
              } ${index >= 4 ? 'hidden lg:block' : ''}`}
              style={{
                animationDelay: `${index * 100}ms`, // Staggered animation
                animation: isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              <div className={`relative h-40 sm:h-48 md:h-52 lg:h-72`}>
                <Image
                  src={image?.src}
                  alt={image?.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500" />
                
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link to="/gallery-portfolio">
            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View Full Gallery
            </Button>
          </Link>
        </div>

        {/* Instagram Section */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-8 shadow-luxury border border-border">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon name="Instagram" size={32} className="text-accent" />
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Follow Us on Instagram
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Stay updated with our latest work, offers and collaborations
            </p>
            <a
              href="https://instagram.com/lacoiffuresalon"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block" }}
            >
              <Button
                variant="default"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                iconName="ExternalLink"
                iconPosition="right"
              >
                @lacoiffuresalon
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalonGallery;
