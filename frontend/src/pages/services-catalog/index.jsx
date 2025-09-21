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
      id: 'haircut-men',
      name: 'Haircut Men',
      description: 'Professional men\'s haircuts and styling in Thane and Powai',
      image: '/men.png',
      alt: 'Men haircut services at La Coiffure Salon Thane Powai - Professional styling and grooming',
      icon: 'Scissors'
    },
    {
      id: 'haircut-women',
      name: 'Haircut Women',
      description: 'Expert women\'s haircuts and styling in Thane and Powai',
      image: '/women.png',
      alt: 'Women haircut services at La Coiffure Salon Thane Powai - Expert styling and cuts',
      icon: 'Scissors'
    },
    {
      id: 'color',
      name: 'Color',
      description: 'Hair coloring and highlights services in Thane and Powai',
      image: '/color.png',
      alt: 'Hair coloring services at La Coiffure Salon Thane Powai - Professional color treatments',
      icon: 'Palette'
    },
    {
      id: 'highlights',
      name: 'Highlights',
      description: 'Professional highlighting services in Thane and Powai',
      image: '/highlights.png',
      alt: 'Hair highlighting services at La Coiffure Salon Thane Powai - Expert color techniques',
      icon: 'Sparkles'
    },
    {
      id: 'spa-treatment',
      name: 'Spa & Treatment',
      description: 'Relaxing spa and hair treatments in Thane and Powai',
      image: '/spa.png',
      alt: 'Spa treatments at La Coiffure Salon Thane Powai - Relaxing hair and beauty services',
      icon: 'Heart'
    },
    {
      id: 'texture',
      name: 'Texture',
      description: 'Hair texturizing and styling in Thane and Powai',
      image: '/texture.png',
      alt: 'Hair texturizing services at La Coiffure Salon Thane Powai - Professional styling',
      icon: 'Zap'
    },
    {
      id: 'facial',
      name: 'Facial',
      description: 'Professional facial treatments in Thane and Powai',
      image: '/facial.png',
      alt: 'Facial treatments at La Coiffure Salon Thane Powai - Professional skincare services',
      icon: 'Flower'
    },
    {
      id: 'cleanup',
      name: 'CleanUp',
      description: 'Hair cleanup and maintenance in Thane and Powai',
      image: '/cleanup.png',
      alt: 'Hair cleanup services at La Coiffure Salon Thane Powai - Professional maintenance',
      icon: 'Sparkles'
    },
    {
      id: 'mani-pedi',
      name: 'Mani/Pedi',
      description: 'Manicure and pedicure services in Thane and Powai',
      image: '/mani-pedi.png',
      alt: 'Manicure pedicure services at La Coiffure Salon Thane Powai - Professional nail care',
      icon: 'Hand'
    },
    {
      id: 'skin',
      name: 'Skin',
      description: 'Skincare and beauty treatments in Thane and Powai',
      image: '/skin.png',
      alt: 'Skincare services at La Coiffure Salon Thane Powai - Professional beauty treatments',
      icon: 'Sun'
    },
    {
      id: 'bleach-polishing',
      name: 'Bleach/Polishing',
      description: 'Hair bleaching and polishing in Thane and Powai',
      image: '/bleach.png',
      alt: 'Hair bleaching services at La Coiffure Salon Thane Powai - Professional color treatments',
      icon: 'Sparkles'
    },
    {
      id: 'wax',
      name: 'Wax',
      description: 'Hair removal and waxing services in Thane and Powai',
      image: '/wax.png',
      alt: 'Waxing services at La Coiffure Salon Thane Powai - Professional hair removal',
      icon: 'Zap'
    },
    {
      id: 'nails',
      name: 'Nails',
      description: 'Nail care and nail art in Thane and Powai',
      image: '/nails.png',
      alt: 'Nail art services at La Coiffure Salon Thane Powai - Professional nail care and design',
      icon: 'Hand'
    },
    {
      id: 'makeup',
      name: 'Makeup',
      description: 'Professional makeup services in Thane and Powai',
      image: '/makeup.png',
      alt: 'Makeup services at La Coiffure Salon Thane Powai - Professional beauty and bridal makeup',
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
