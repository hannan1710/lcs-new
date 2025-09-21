import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ContactInfo from './components/ContactInfo';
// import ContactForm from './components/ContactForm';
// import SocialConnect from './components/SocialConnect';
// import EmergencyContact from './components/EmergencyContact';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const ContactLocationPage = () => {
  const salonLocations = [
    {
      name: 'La Coiffure Salon, Thane',
      address: 'La Coiffure Salon, Shop no.11&12,Saraswati School, Anand Nagar, Thane West, Thane, Maharashtra 400615',
      phone: '+91 99670 02481',
      hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
      image: 'thane.png'
    },
    {
      name: 'La Coiffure Salon, Powai',
      address: 'La Coiffure Salon, SN 161&162 floor 1st, galleriya, Hiranandani Gardens, Panchkutir Ganesh Nagar, Powai, Mumbai, Maharashtra 400076',
      phone: '+91 74000 68615',
      hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
      image: 'powai.png'
    }
  ];

  const handleLocationClick = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="MapPin" size={24} className="text-accent" />
              </div>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl text-yellow-500">
                Visit La Coiffure
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Experience luxury and artistry at our two exclusive locations in Thane and Powai. 
              Our beautifully designed salons offer the perfect sanctuary for all your hair and beauty needs.
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={() => window.location.href = '/appointment-booking'}
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
        </div>
      </section>

      {/* Salon Locations */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-4">
              Our Locations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit us at either of our two luxurious locations, each offering the same exceptional service and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {salonLocations.map((location, index) => (
              <div key={index} className="bg-card border border-border rounded-lg overflow-hidden shadow-luxury">
                <div className="relative w-full h-80 sm:h-96 lg:h-[28rem] overflow-hidden">
                  <Image
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{location.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Icon name="MapPin" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <button
                        onClick={() => handleLocationClick(location.address)}
                        className="text-foreground hover:text-accent transition-luxury text-left"
                      >
                        {location.address}
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="Phone" size={16} className="text-accent" />
                      <button
                        onClick={() => handlePhoneClick(location.phone)}
                        className="text-foreground hover:text-accent transition-luxury"
                      >
                        {location.phone}
                      </button>
                    </div>
                    
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={16} className="text-accent" />
                      <span className="text-foreground">{location.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleLocationClick(location.address)}
                      className="group relative flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-accent via-accent to-yellow-500 text-accent-foreground font-bold text-sm py-3 px-4 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105 active:scale-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-accent to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center space-x-2">
                        <Icon name="Navigation" size={16} className="group-hover:animate-pulse" />
                        <span>Get Directions</span>
                        <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handlePhoneClick(location.phone)}
                      className="group relative flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold text-sm py-3 px-4 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center space-x-2">
                        <Icon name="Phone" size={16} className="group-hover:animate-pulse" />
                        <span>Call Now</span>
                        <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-6 lg:px-8">
          <ContactInfo />
        </div>
      </section>

      {/* Social Connect */}
{/*       <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <SocialConnect />
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default ContactLocationPage;