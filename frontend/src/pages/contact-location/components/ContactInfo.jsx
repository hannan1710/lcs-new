import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactDetails = [
   
    {
      icon: 'Phone',
      title: 'Call Us',
      content: 'Thane: +91 99670 02481\nPowai: +91 74000 68615',
      action: 'Call Now'
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      content: 'thane@lacoiffure.com\npowai@lacoiffure.com',
      action: 'Send Email'
    },
    {
      icon: 'Clock',
      title: 'Business Hours',
      content: 'Mon-Sat: 9:00 AM - 8:00 PM\nSunday: 10:00 AM - 6:00 PM',
      action: 'Book Now'
    }
  ];

  const handleAction = (title, action) => {
    switch (title) {
      case 'Visit Our Salons':
        // Open Thane location by default
        const thaneAddress = 'Shop no. 11&12, Saraswati school, Anand Nagar, Thane West, Thane, Maharashtra 400615';
        const encodedAddress = encodeURIComponent(thaneAddress);
        window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
        break;
      case 'Call Us':
        // Call Thane location by default
        window.location.href = 'tel:+919967002481';
        break;
      case 'Email Us':
        window.location.href = 'mailto:thane@lacoiffure.com';
        break;
      case 'Business Hours':
        window.location.href = '/appointment-booking';
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactDetails?.map((detail, index) => (
        <div
          key={index}
          className="bg-card rounded-lg p-6 shadow-luxury hover:shadow-luxury-hover transition-luxury border border-border"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4">
            <Icon name={detail?.icon} size={24} className="text-accent" />
          </div>
          
          <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
            {detail?.title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 whitespace-pre-line">
            {detail?.content}
          </p>
          
          <button
            onClick={() => handleAction(detail?.title, detail?.action)}
            className={`${
              detail?.action === 'Book Now' 
                ? 'group relative inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-accent via-accent to-yellow-500 text-accent-foreground font-bold text-sm py-2 px-4 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105 active:scale-95'
                : 'text-accent hover:text-accent/80 text-sm font-medium transition-luxury flex items-center space-x-2'
            }`}
          >
            {detail?.action === 'Book Now' ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-accent to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="group-hover:animate-pulse" />
                  <span>{detail?.action}</span>
                  <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </>
            ) : (
              <>
                <span>{detail?.action}</span>
                <Icon name="ArrowRight" size={16} />
              </>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;