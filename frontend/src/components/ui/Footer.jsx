import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const salonLocations = [
    {
      name: "La Coiffure Salon, Thane",
      address:
        "La Coiffure Salon, Thane,Shop no. 11&12, Saraswati school, Anand Nagar, Thane West, Thane, Maharashtra 400615",
      phone: "+91 99670 02481",
      email: "info@lacoiffuresalons.com",
      hours: "Mon-Sun: 10AM-9PM",
    },
    {
      name: "La Coiffure Salon, Powai",
      address:
        " La Coiffure Salon,SN 161&162 floor 1st, Galleria, Hiranandani Gardens, Panchkutir Ganesh Nagar, Powai, Mumbai, Maharashtra 400076",
      phone: "+91 74000 68615",
      email: "info@lacoiffuresalons.com",
      hours: "Mon-Sun: 10AM-9PM",
    },
  ];

  const quickLinks = [
    { label: "Home", path: "/" }, // fixed route
    { label: "Services", path: "/services-catalog" },
    { label: "Gallery", path: "/gallery-portfolio" },
    { label: "Book Appointment", path: "/appointment-booking" },
    { label: "Contact", path: "/contact-location" },
    { label: "About Us", path: "/about-us" },
  ];

  const services = [
    "Hair Color & Highlights",
    "Precision Cuts & Styling",
    "Special Occasion Hair",
    "Bridal Services",
    "Hair Treatments",
    "Men's Grooming",
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: "Instagram",
      url: "https://instagram.com/lacoiffuresalon",
    },
    {
      name: "Facebook",
      icon: "Facebook",
      url: "https://facebook.com/lacoiffuresalons",
    },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/@imranlcs" }, // fixed
  ];

  const handleSocialClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handlePhoneClick = (phone) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleEmailClick = (email) => {
    window.open(`mailto:${email}`, "_self");
  };

  const handleLocationClick = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://maps.google.com/?q=${encodedAddress}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <footer className="bg-black text-white py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <img
                  src="/la-coiffure-salon-logo.png"
                  alt="La Coiffure Salon Logo"
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-primary">
                  La Coiffure Salon 
                </h3>
               
              </div>
            </div>
            <p className="text-white/80 mb-4 max-w-md text-sm">
              Creating beautiful transformations with artistry, expertise, and
              luxury service since 2020. Experience the pinnacle of hair and
              beauty services at our exclusive salons.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.url)}
                  className="w-10 h-10 bg-white/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-luxury"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Icon name={social.icon} size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-white/80 hover:text-accent transition-luxury ${
                      location.pathname === link.path ? "text-accent" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services
          <div>
            <h4 className="font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>
            <div className="space-y-2 text-sm text-white/80">
              <p className="font-medium text-white">Main Office</p>
              <p>La Coiffure Salon</p>
              <p>Thane & Powai Locations</p>
              <div className="pt-2">
                <p className="font-medium text-white">General Inquiries</p>
                <p>info@lacoiffuresalons.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Salon Locations */}
        <div className="border-t border-white/20 pt-4 sm:pt-8 mb-4 sm:mb-8">
          <h4 className="font-semibold mb-4 sm:mb-6 text-lg text-center text-white">
            Our Stores
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {salonLocations.map((location, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg p-3 sm:p-4 lg:p-6 border border-white/10"
              >
                <h5 className="font-semibold text-lg mb-3 text-accent">
                  {location.name}
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <Icon
                      name="MapPin"
                      size={16}
                      className="text-accent mt-0.5 flex-shrink-0"
                    />
                    <button
                      onClick={() => handleLocationClick(location.address)}
                      className="text-white/80 hover:text-accent transition-luxury text-left"
                      aria-label={`Open map for ${location.name}`}
                    >
                      {location.address}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-accent" />
                    <button
                      onClick={() => handlePhoneClick(location.phone)}
                      className="text-white/80 hover:text-accent transition-luxury"
                      aria-label={`Call ${location.phone}`}
                    >
                      {location.phone}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} className="text-accent" />
                    <button
                      onClick={() => handleEmailClick(location.email)}
                      className="text-white/80 hover:text-accent transition-luxury"
                      aria-label={`Email ${location.email}`}
                    >
                      {location.email}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-accent" />
                    <span className="text-white/80">{location.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/60">
              © 2020 La Coiffure Salon. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-white/60 hover:text-accent transition-luxury"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-white/60 hover:text-accent transition-luxury"
              >
                Terms of Service
              </Link>
              <Link
                to="/cancellation-policy"
                className="text-white/60 hover:text-accent transition-luxury"
              >
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
