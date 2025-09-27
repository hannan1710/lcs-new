import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Image from '../../components/AppImage';
import Icon from '../../components/AppIcon';
import SEOHead from '../../components/SEOHead';

const AboutUs = () => {
  const images = ['/la-coiffure-salon-thane-location.png', '/la-coiffure-salon-powai-location.png'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to move to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Function to move to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  // Structured data for about page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About La Coiffure Salon",
    "description": "Learn about La Coiffure Salon's story, founders Imran Salmani and Nizam Shaikh, and our commitment to luxury hair and beauty services in Thane & Powai.",
    "url": "https://lacoiffuresalons.com/about-us",
    "mainEntity": {
      "@type": "BeautySalon",
      "name": "La Coiffure Salon",
      "founder": [
        {
          "@type": "Person",
          "name": "Imran Salmani",
          "description": "Founder of La Coiffure Salon, professionally qualified from VIDAL SASSOON UK and JEAN CLAUDE BIGUINE Paris with 15+ years experience"
        },
        {
          "@type": "Person", 
          "name": "Nizam Shaikh",
          "description": "Co-founder of La Coiffure Salon Powai, professionally qualified from VIDAL SASSOON UK and JEAN CLAUDE BIGUINE Paris with 15+ years experience"
        }
      ],
      "foundingDate": "2020",
      "description": "Luxury hair and beauty salon offering premium services in Thane and Powai, Mumbai",
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "Anand Nagar",
          "addressLocality": "Thane",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "Galleria Hiranandani",
          "addressLocality": "Powai",
          "addressRegion": "Maharashtra", 
          "addressCountry": "IN"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
   <SEOHead
  title=" About La Coiffure Salon Thane & Powai  | Luxury Hair & Beauty Experts"
  description="About La Coiffure Salon in Thane & Powai, led by founders Imran Salmani & Nizam Shaikh. Expertly trained at VIDAL SASSOON UK & JEAN CLAUDE BIGUINE Paris, they bring 20+ years of experience in luxury haircuts, styling, and professional beauty service."
  keywords="La Coiffure Salon Thane, La Coiffure Salon Powai, Imran Salmani, Nizam Shaikh, luxury hair salon Mumbai, professional hair stylists Thane, expert haircuts Mumbai, VIDAL SASSOON UK trained stylist, JEAN CLAUDE BIGUINE Paris trained stylist, premium beauty services Mumbai"
  canonicalUrl="https://lacoiffuresalons.com/about-us"
  ogImage="https://lacoiffuresalons.com/la-coiffure-salon-logo.png"
  ogType="website"
  structuredData={structuredData}
/>

      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-muted/20 py-4">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
              About La Coiffure Salon
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Luxury hair and beauty services in Thane and Powai. Crafting confidence with artistry, care, and premium experiences.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-10">
          <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
           <div>
     <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-foreground">Our Story</h2>
     <div className="space-y-3 md:space-y-4">
       <p className="text-muted-foreground text-xs md:text-sm lg:text-base leading-relaxed">
         La Coiffure Salon started by Mr. Imran Salmani in the year 2020 with the first salon in Thane. Imran Salmani is the founder of La Coiffure Salon, a successful salon in Thane, and the Powai salon started with Mr. Nizam Shaikh.
       </p>
       <p className="text-muted-foreground text-xs md:text-sm lg:text-base leading-relaxed">
         Mr. Imran and Mr. Nizam are the best style directors in the industry. They both are professionally qualified from VIDAL SASSOON, UK. Also, they are qualified from JEAN CLAUDE BIGUINE, PARIS. They are having 15 years of rich experience in the industry.
       </p>
       <p className="text-muted-foreground text-xs md:text-sm lg:text-base leading-relaxed">
         Imran has also worked with the best fashion designers in the Bollywood industry - Mr. Manish Malhotra, Archana Kochhar, Rohit Bal. National TV shows like "Mujh Se Shadi Karoge" (by Shehnaz Gill), BIGG BOSS 13, Fashion shows like GQ, GRAZIA, VAN HEUSEN, BOMBAY TIMES and many more.
       </p>
       <p className="text-muted-foreground text-xs md:text-sm lg:text-base leading-relaxed">
         The vision of La Coiffure Salon is to be a leading salon brand and employer of choice at national level. To provide consistent amazing experience at value price and create highly skilled, passionate and energetic team. Our organisation is also backed by a culture of creativity, ownership, integrity for our guests to achieve their desire and aspirations in an environment that is pleasing, safe and hygienic, supported by our certified professional and talented team members.
       </p>
       <p className="text-muted-foreground text-xs md:text-sm lg:text-base leading-relaxed">
         All the hair stylists and beauty therapists joining La Coiffure Salon undergo mandatory, rigorous in-house training before they serve you at our salon.
       </p>
     </div>
   </div>
            {/* Slideshow Container - Proper Sizing */}
            <div className="rounded-xl overflow-hidden border border-border aspect-[4/3] md:aspect-[4/3] lg:aspect-[4/3] xl:aspect-[3/2] relative">
              <Image 
                src={images[currentImageIndex]} 
                alt="Salon" 
                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out" 
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-3 hover:bg-black/80 transition-colors shadow-lg"
              >
                <Icon name="ChevronLeft" size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-3 hover:bg-black/80 transition-colors shadow-lg"
              >
                <Icon name="ChevronRight" size={24} />
              </button>

            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-10 bg-muted/20">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-card rounded-lg border border-border p-3 md:p-6 text-center">
                <Icon name="Scissors" size={24} className="text-primary mx-auto mb-2 md:mb-3" />
                <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2">Craftsmanship</h3>
                <p className="text-muted-foreground text-xs md:text-base">Precision techniques and premium products for consistently beautiful results.</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-3 md:p-6 text-center">
                <Icon name="Heart" size={24} className="text-primary mx-auto mb-2 md:mb-3" />
                <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2">Care</h3>
                <p className="text-muted-foreground text-xs md:text-base">A warm, welcoming environment where your comfort comes first.</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-3 md:p-6 text-center">
                <Icon name="Lightbulb" size={24} className="text-primary mx-auto mb-2 md:mb-3" />
                <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2">Creativity</h3>
                <p className="text-muted-foreground text-xs md:text-base">Trend-aware artistry tailored to your lifestyle and personality.</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-3 md:p-6 text-center">
                <Icon name="Award" size={24} className="text-primary mx-auto mb-2 md:mb-3" />
                <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2">Excellence</h3>
                <p className="text-muted-foreground text-xs md:text-base">Commitment to delivering exceptional service and exceeding expectations.</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-3 md:p-6 text-center">
                <Icon name="Rocket" size={24} className="text-primary mx-auto mb-2 md:mb-3" />
                <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2">Innovation</h3>
                <p className="text-muted-foreground text-xs md:text-base">Constantly exploring new techniques and trends to keep your style fresh.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Locations CTA */}
        <section className="py-10">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <div className="bg-card rounded-lg border border-border p-8 md:p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">Ready for a Transformation?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-base">
                Discover our world of luxury hair and beauty. Visit one of our premier locations in Thane or Powai.
              </p>
              <a href="/contact-location" className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-luxury">
                Contact & Locations
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;