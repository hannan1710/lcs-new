import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SEOHead from '../../components/SEOHead';

const ServicesCatalog = () => {
  const navigate = useNavigate();

  // Static categories in the specified order using local images from public directory
  const staticCategories = [
    {
      id: 'mens-haircut-styling',
      name: 'Men\'s Haircut & Styling',
      description: 'Professional men\'s haircuts and styling in Thane and Powai',
      image: '/mens-haircut-styling-services.png',
      alt: 'Professional men haircut and styling services at La Coiffure Salon Thane Powai - Expert barber cuts, beard trimming, and modern men grooming',
      seoCaption: 'Expert men\'s haircuts, beard styling, and grooming services by professional barbers in Thane and Powai',
      icon: 'Scissors'
    },
    {
      id: 'womens-haircut-styling',
      name: 'Women\'s Haircut & Styling',
      description: 'Expert women\'s haircuts and styling in Thane and Powai',
      image: '/womens-haircut-styling-services.png',
      alt: 'Professional women haircut and styling services at La Coiffure Salon Thane Powai - Expert cuts, layers, bobs, and modern hairstyles',
      seoCaption: 'Expert women\'s haircuts, layers, bobs, and modern hairstyling by professional stylists in Thane and Powai',
      icon: 'Scissors'
    },
    {
      id: 'hair-coloring-highlights',
      name: 'Hair Coloring & Highlights',
      description: 'Hair coloring and highlights services in Thane and Powai',
      image: '/hair-coloring-highlights-services.png',
      alt: 'Professional hair coloring and highlights services at La Coiffure Salon Thane Powai - Expert color treatments, balayage, ombre, and color correction',
      seoCaption: 'Professional hair coloring, highlights, balayage, ombre, and color correction services in Thane and Powai',
      icon: 'Palette'
    },
    {
      id: 'professional-highlighting',
      name: 'Professional Hair Highlighting',
      description: 'Professional highlighting services in Thane and Powai',
      image: '/professional-hair-highlighting-services.png',
      alt: 'Professional hair highlighting services at La Coiffure Salon Thane Powai - Expert highlights, lowlights, and dimensional color techniques',
      seoCaption: 'Expert hair highlighting, lowlights, and dimensional color techniques by professional colorists in Thane and Powai',
      icon: 'Sparkles'
    },
    {
      id: 'hair-spa-treatments',
      name: 'Hair Spa & Treatments',
      description: 'Relaxing spa and hair treatments in Thane and Powai',
      image: '/hair-spa-treatments-services.png',
      alt: 'Luxury spa and hair treatments at La Coiffure Salon Thane Powai - Relaxing hair spa, scalp treatments, and wellness services',
      seoCaption: 'Luxury hair spa treatments, scalp therapy, and relaxing wellness services in Thane and Powai',
      icon: 'Heart'
    },
    {
      id: 'hair-texturizing-styling',
      name: 'Hair Texturizing & Styling',
      description: 'Hair texturizing and styling in Thane and Powai',
      image: '/hair-texturizing-styling-services.png',
      alt: 'Professional hair texturizing and styling services at La Coiffure Salon Thane Powai - Expert texturizing, perms, and volume treatments',
      seoCaption: 'Expert hair texturizing, perming, and volume enhancement treatments by professional stylists in Thane and Powai',
      icon: 'Zap'
    },
    {
      id: 'facial-treatments-skincare',
      name: 'Facial Treatments & Skincare',
      description: 'Professional facial treatments in Thane and Powai',
      image: '/facial-treatments-skincare-services.png',
      alt: 'Professional facial treatments and skincare services at La Coiffure Salon Thane Powai - Expert facials, cleansing, and skin rejuvenation',
      seoCaption: 'Professional facial treatments, deep cleansing, and skin rejuvenation services by expert estheticians in Thane and Powai',
      icon: 'Flower'
    },
    {
      id: 'hair-cleanup-maintenance',
      name: 'Hair Cleanup & Maintenance',
      description: 'Hair cleanup and maintenance in Thane and Powai',
      image: '/hair-cleanup-maintenance-services.png',
      alt: 'Professional hair cleanup and maintenance services at La Coiffure Salon Thane Powai - Expert hair care, conditioning, and maintenance treatments',
      seoCaption: 'Professional hair cleanup, conditioning, and maintenance treatments for healthy hair in Thane and Powai',
      icon: 'Sparkles'
    },
    {
      id: 'manicure-pedicure-services',
      name: 'Manicure & Pedicure Services',
      description: 'Manicure and pedicure services in Thane and Powai',
      image: '/manicure-pedicure-services.png',
      alt: 'Professional manicure and pedicure services at La Coiffure Salon Thane Powai - Expert nail care, nail art, and hand foot treatments',
      seoCaption: 'Expert manicure, pedicure, nail art, and hand foot care services by professional nail technicians in Thane and Powai',
      icon: 'Hand'
    },
    {
      id: 'skincare-beauty-treatments',
      name: 'Skincare & Beauty Treatments',
      description: 'Skincare and beauty treatments in Thane and Powai',
      image: '/skincare-beauty-treatments-services.png',
      alt: 'Professional skincare and beauty treatments at La Coiffure Salon Thane Powai - Expert skin care, anti-aging treatments, and beauty services',
      seoCaption: 'Professional skincare, anti-aging treatments, and beauty enhancement services by expert estheticians in Thane and Powai',
      icon: 'Sun'
    },
    {
      id: 'hair-bleaching-polishing',
      name: 'Hair Bleaching & Polishing',
      description: 'Hair bleaching and polishing in Thane and Powai',
      image: '/hair-bleaching-polishing-services.png',
      alt: 'Professional hair bleaching and polishing services at La Coiffure Salon Thane Powai - Expert bleaching, hair lightening, and color treatments',
      seoCaption: 'Expert hair bleaching, lightening, and color polishing treatments by professional colorists in Thane and Powai',
      icon: 'Sparkles'
    },
    {
      id: 'hair-removal-waxing',
      name: 'Hair Removal & Waxing',
      description: 'Hair removal and waxing services in Thane and Powai',
      image: '/hair-removal-waxing-services.png',
      alt: 'Professional hair removal and waxing services at La Coiffure Salon Thane Powai - Expert waxing, hair removal, and skin care treatments',
      seoCaption: 'Professional waxing, hair removal, and skin care treatments by expert estheticians in Thane and Powai',
      icon: 'Zap'
    },
    {
      id: 'nail-care-nail-art',
      name: 'Nail Care & Nail Art',
      description: 'Nail care and nail art in Thane and Powai',
      image: '/nail-care-nail-art-services.png',
      alt: 'Professional nail care and nail art services at La Coiffure Salon Thane Powai - Expert nail design, nail art, and nail care treatments',
      seoCaption: 'Expert nail care, nail art, and creative nail design services by professional nail artists in Thane and Powai',
      icon: 'Hand'
    },
    {
      id: 'professional-makeup-services',
      name: 'Professional Makeup Services',
      description: 'Professional makeup services in Thane and Powai',
      image: '/professional-makeup-services.png',
      alt: 'Professional makeup and beauty services at La Coiffure Salon Thane Powai - Expert bridal makeup, party makeup, and beauty enhancement',
      seoCaption: 'Expert bridal makeup, party makeup, and professional beauty enhancement services by certified makeup artists in Thane and Powai',
      icon: 'Sparkles'
    }
  ];

  const handleBookNow = () => {
    navigate('/appointment-booking');
  };

  // Use static categories
  const displayServices = staticCategories;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Our Services - Hair & Beauty Services in Thane & Powai"
        description="Professional hair styling, beauty treatments, and wellness services in Thane and Powai. Expert stylists, modern techniques, and luxury experience at La Coiffure Salon."
        keywords="hair salon thane, beauty salon powai, hair styling thane, beauty treatments powai, hair cut thane, hair color powai, facial thane, spa powai, manicure thane, pedicure powai, hair highlights thane, hair straightening powai, wedding makeup thane, bridal hair powai, lcs salon, la coiffure salon, professional hair services thane, expert beauty treatments powai"
      />
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          "name": "La Coiffure Salon",
          "description": "Professional hair styling, beauty treatments, and wellness services in Thane and Powai",
          "url": "https://lacoiffuresalons.com",
          "address": [
            {
              "@type": "PostalAddress",
              "addressLocality": "Thane",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
            },
            {
              "@type": "PostalAddress", 
              "addressLocality": "Powai",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Beauty Services",
            "itemListElement": staticCategories.map((service, index) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service.name,
                "description": service.description
              },
              "position": index + 1
            }))
          }
        })}
      </script>
      
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-6 lg:px-8 py-8">
           {/* Page Header */}
           <div className="text-center mb-12">
             <h1 className="font-heading font-bold text-4xl lg:text-5xl text-yellow-500 mb-6">
             Services Catalog
             </h1>
             <p className="text-muted-foreground text-base max-w-2xl mx-auto">
             We offer a curated range of beauty and wellness services across specialized categories in Thane and Powai, delivered with expertise and premium care at our premium salon locations.
             </p>
             
             {/* Hidden SEO Content - Important for search engines */}
             <div className="sr-only" aria-hidden="true">
               <h2>Professional Beauty Services in Thane and Powai</h2>
               <p>La Coiffure Salon offers comprehensive beauty and wellness services including professional haircuts, hair coloring, highlights, spa treatments, facial services, manicure, pedicure, nail art, makeup services, hair texturizing, bleaching, waxing, and skincare treatments. Our expert stylists and beauty professionals provide personalized care and modern techniques at our premium salon locations in Thane and Powai, Maharashtra.</p>
               <ul>
                 {staticCategories.map((service, index) => (
                   <li key={service.id}>
                     <strong>{service.name}</strong>: {service.seoCaption}
                   </li>
                 ))}
               </ul>
             </div>
           </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-12">
            {displayServices.map((category) => (
              <div
                key={category.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Category Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.alt || category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to default image if Strapi image fails to load
                      e.target.src = 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop&crop=face';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Category Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {category.description}
                  </p>
                  
                  {/* Hidden SEO Caption - Important for SEO but not visible to users */}
                  <div className="sr-only" aria-hidden="true">
                    <p>{category.seoCaption}</p>
                  </div>
                  
                  {/* Book Now Button - Always at bottom */}
                  <button
                    onClick={handleBookNow}
                    className="group relative w-full bg-gradient-to-r from-accent via-accent to-yellow-500 text-accent-foreground font-semibold py-3 px-4 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105 active:scale-95 mt-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-accent to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center space-x-2">
                      <Icon name="Calendar" size={18} className="group-hover:animate-pulse" />
                      <span>Book Now</span>
                      <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center bg-accent/10 border border-accent/20 rounded-lg p-8">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
              Ready to Book Your Service?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Choose from our wide range of professional beauty services in Thane and Powai and book your appointment today. 
              Our expert team at La Coiffure Salon is ready to help you look and feel your best.
            </p>
            <button
              onClick={handleBookNow}
              className="group relative inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-accent via-accent to-yellow-500 text-accent-foreground font-bold text-lg py-4 px-8 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/40 hover:scale-105 active:scale-95"
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
    </div>
  );
};

export default ServicesCatalog;
