import React, { useState, useEffect } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const StylistSpotlight = () => {
  const [currentStylist, setCurrentStylist] = useState(0);

  const stylists = [
    
    {
        id: 1,
        name: "Imran Salmani",
        title: "Founder",
        experience: "8 years",
        image: "/imran.png",
        bio:"Imran, Founder of La Coiffure Salon, has built the brand on a vision of luxury, innovation, and premium client experiences."

      },
      {
        id: 2,
        name: "Nizam Shaikh",
        title: "Creative Director",
        experience: "6 years",
        image: "/nizam.jpg",
        bio: "As Creative Director, Nizam leads with innovation, specializing in bold color transformations and personalized styles that reflect each client's individuality."
      },
      {
        id: 3,
        name: "Shahista Salmani",
        title: "Senior Skin Expert",
        experience: "10 years",
        image: "/shahi.png",
        bio: "With a decade of experience, Shahista is a Senior Skin Expert renowned for luxury bridal makeovers. She blends traditional elegance with modern artistry for flawless, radiant results."
      },
      {
        id: 4,
        name: "Abdul Hannan Ansari",
        title: "Marketing Head & Website Developer",
        experience: "7 years",
        image: "/hannan.jpg",
        bio: "Hannan drives the salon's digital presence and marketing strategy while developing its modern website, ensuring clients enjoy a seamless and premium brand experience."
      
    }
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStylist((prev) => (prev + 1) % stylists?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [stylists?.length]);

  const nextStylist = () =>
    setCurrentStylist((prev) => (prev + 1) % stylists?.length);
  const prevStylist = () =>
    setCurrentStylist((prev) => (prev - 1 + stylists?.length) % stylists?.length);

  const currentStylistData = stylists?.[currentStylist];

  return (
    <section className="py-8 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 lg:mb-12">
          <h2 className="font-heading text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-2">
            Meet Our Core Team
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Our expert team brings creativity, skill, and years of experience to
            help you look your best.
          </p>
        </div>

         {/* Stylist Spotlight */}
         <div className="max-w-3xl lg:max-w-2xl mx-auto">
           <div className="bg-card rounded-xl shadow-luxury overflow-hidden border border-border">
             {/* Full Width Image with Overlay Text */}
             <div className="relative h-[500px] lg:h-[600px]">
               <Image
                 src={currentStylistData?.image}
                 alt={currentStylistData?.name}
                 className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                 loading={currentStylist === 0 ? "eager" : "lazy"}
               />
               
               {/* Dark overlay for better text readability */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
               
               {/* Compact Text Overlay at Bottom */}
               <div className="absolute bottom-0 left-0 right-0">
                 <div className="bg-black/20 backdrop-blur-sm p-4 sm:p-6">
                   <h3 className="font-heading text-xl lg:text-2xl font-bold text-white mb-1">
                     {currentStylistData?.name}
                   </h3>
                   <p className="text-accent font-medium text-sm sm:text-base mb-2">
                     {currentStylistData?.title}
                   </p>
                   <p className="text-white/90 leading-relaxed text-xs sm:text-sm">
                     {currentStylistData?.bio}
                   </p>
                 </div>
               </div>

               {/* Navigation Arrows */}
               <button
                 onClick={prevStylist}
                 className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-luxury"
               >
                 <Icon name="ChevronLeft" size={24} className="text-white" />
               </button>

               <button
                 onClick={nextStylist}
                 className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-luxury"
               >
                 <Icon name="ChevronRight" size={24} className="text-white" />
               </button>
             </div>
           </div>

          {/* Dots Indicator */}
          {/* <div className="flex justify-center mt-4 sm:mt-6 gap-2">
  {stylists?.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentStylist(index)}
      className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full transition-luxury ${
        index === currentStylist ? "bg-accent scale-150" : "bg-muted"
      }`}
    />
  ))}
</div> */}
        </div>
      </div>
    </section>
  );
};

export default StylistSpotlight;