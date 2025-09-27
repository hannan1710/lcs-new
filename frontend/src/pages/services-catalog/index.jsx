import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SEOHead from '../../components/SEOHead';
import AppImage from '../../components/AppImage';

const ServicesCatalog = () => {
  const navigate = useNavigate();

  // Static categories in the specified order using local images from public directory
  const staticCategories = [
    {
      id: 'mens-haircut-styling',
      name: 'Men\'s Haircut & Styling',
      description: 'Expert grooming and precision cuts for masculine style.',
      image: '/mens-haircut-styling-services.png',
      alt: 'Professional men\'s haircut at La Coiffure Salon',
      seoCaption: 'Sharp, stylish men\'s haircuts tailored to your look.',
      icon: 'Scissors'
    },
    {
      id: 'womens-haircut-styling',
      name: 'Women\'s Haircut & Styling',
      description: 'Customized haircuts crafted with elegance for every face shape.',
      image: '/womens-haircut-styling-services.png',
      alt: 'Luxury women\'s haircut by expert stylists',
      seoCaption: 'Transform your style with precision women\'s haircuts.',
      icon: 'Scissors'
    },
    {
      id: 'hair-coloring-highlights',
      name: 'Hair Coloring & Highlights',
      description: 'Premium hair coloring with rich tones and vibrant shades.',
      image: '/hair-coloring-highlights-services.png',
      alt: 'Premium hair coloring services in Mumbai salon',
      seoCaption: 'Vibrant, long-lasting hair color crafted by specialists.',
      icon: 'Palette'
    },
    {
      id: 'professional-highlighting',
      name: 'Professional Hair Highlighting',
      description: 'Natural highlights and balayage for depth and shine.',
      image: '/professional-hair-highlighting-services.png',
      alt: 'Natural hair highlights by salon experts',
      seoCaption: 'Add dimension with flawless highlights and balayage.',
      icon: 'Sparkles'
    },
    {
      id: 'hair-spa-treatments',
      name: 'Hair Spa & Treatments',
      description: 'Revitalizing hair spa treatments for health and shine.',
      image: '/hair-spa-treatments-services.png',
      alt: 'Hair spa and treatment for healthy shine',
      seoCaption: 'Rejuvenating spa therapies for hair and scalp health.',
      icon: 'Heart'
    },
    {
      id: 'hair-texturizing-styling',
      name: 'Hair Texturizing & Styling',
      description: 'Professional smoothening and volumizing for styled hair.',
      image: '/hair-texturizing-styling-services.png',
      alt: 'Hair smoothening and texture services',
      seoCaption: 'Get silky smooth or voluminous textured hair.',
      icon: 'Zap'
    },
    {
      id: 'facial-treatments-skincare',
      name: 'Facial Treatments & Skincare',
      description: 'Luxury facials for youthful and radiant skin.',
      image: '/facial-treatments-skincare-services.png',
      alt: 'Luxury facial treatments for glowing skin',
      seoCaption: 'Brighten and refresh your skin with premium facials.',
      icon: 'Flower'
    },
    {
      id: 'hair-cleanup-maintenance',
      name: 'Hair Cleanup & Maintenance',
      description: 'Deep cleansing clean-ups for fresh, clear skin.',
      image: '/hair-cleanup-maintenance-services.png',
      alt: 'Skin clean-up service for clear complexion',
      seoCaption: 'Deep cleansing clean-ups for fresh, healthy skin.',
      icon: 'Sparkles'
    },
    {
      id: 'manicure-pedicure-services',
      name: 'Manicure & Pedicure Services',
      description: 'Relaxing manicure and pedicure for polished hands and feet.',
      image: '/manicure-pedicure-services.png',
      alt: 'Luxury manicure and pedicure salon service',
      seoCaption: 'Pamper your hands and feet with expert mani-pedi.',
      icon: 'Hand'
    },
    {
      id: 'skincare-beauty-treatments',
      name: 'Skincare & Beauty Treatments',
      description: 'Comprehensive skincare solutions for flawless skin.',
      image: '/skincare-beauty-treatments-services.png',
      alt: 'Advanced skin care treatments at salon',
      seoCaption: 'Personalized skin solutions for radiant beauty.',
      icon: 'Sun'
    },
    {
      id: 'hair-bleaching-polishing',
      name: 'Hair Bleaching & Polishing',
      description: 'Effective bleach and polishing for smooth radiance.',
      image: '/hair-bleaching-polishing-services.png',
      alt: 'Skin bleach and body polishing service',
      seoCaption: 'Get smooth, even-toned skin with polishing treatments.',
      icon: 'Sparkles'
    },
    {
      id: 'hair-removal-waxing',
      name: 'Hair Removal & Waxing',
      description: 'Safe and gentle waxing for smooth skin.',
      image: '/hair-removal-waxing-services.png',
      alt: 'Professional waxing services at luxury salon',
      seoCaption: 'Gentle, precise waxing for silky smooth skin.',
      icon: 'Zap'
    },
    {
      id: 'nail-care-nail-art',
      name: 'Nail Care & Nail Art',
      description: 'Creative nail art and extensions for stylish nails.',
      image: '/nail-care-nail-art-services.png',
      alt: 'Luxury nail art and extensions',
      seoCaption: 'Trendy nail designs and flawless finishing.',
      icon: 'Hand'
    },
    {
      id: 'professional-makeup-services',
      name: 'Professional Makeup Services',
      description: 'Professional makeup artistry for special occasions.',
      image: '/professional-makeup-services.png',
      alt: 'Professional bridal and party makeup',
      seoCaption: 'Glamorous makeup looks for every occasion.',
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
    title=" La Coiffure Salon | Hair & Beauty Services in Thane & Powai "
    description="Discover premium haircuts, coloring, keratin treatments, facials, bridal makeup, and spa services at La Coiffure Salon in Thane & Powai. Luxury care by expert stylists."
    keywords="hair salon Thane, beauty salon Powai, luxury salon Mumbai, keratin treatment Powai, hair highlights Thane, bridal makeup Powai, spa services Thane, professional salon Mumbai"
    canonicalUrl="https://lacoiffuresalons.com/services-catalog"
    ogImage="https://lacoiffuresalons.com/la-coiffure-salon-logo.png"
    ogType="website"
    structuredData={structuredData}
  />
      
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-6 lg:px-8 py-8">
           {/* Page Header */}
           <div className="text-center mb-12">
             <h1 className="font-heading font-bold text-4xl lg:text-5xl text-yellow-500 mb-6">
             Services Catalog
             </h1>
             <p className="text-muted-foreground text-base max-w-2xl mx-auto">
             Experience a curated range of beauty and wellness services in Thane & Powai. Our expert stylists provide premium care across specialized categories at our luxury salon locations
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
                  <AppImage
                    src={category.image}
                    alt={category.alt || category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Category Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {category.name}
                  </h2>
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
                    className="group relative w-full bg-gradient-to-r from-accent via-accent to-yellow-500 text-accent-foreground font-semibold py-3 px-4 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105 active:scale-95 mt-auto min-h-[48px] min-w-[48px]"
                    aria-label={`Book appointment for ${category.name}`}
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
