import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const ContactCTA = () => {
  const contactInfo = [
    {
      icon: "MapPin",
      title: "Visit Us",
      content: "Thane: Shop 11&12, Saraswati School, Anand Nagar\nPowai: SN 161&162, Galleria, Hiranandani Gardens",
      action: "Get Directions",
      link: "#contact-location",
    },
    {
      icon: "Phone",
      title: "Call Us",
      content: "Thane: +91 99670 02481\nPowai: +91 74000 68615",
      action: "Call Now",
      link: "tel:+919967002481",
    },
    {
      icon: "Clock",
      title: "Hours",
      content: "Mon-Sat: 9AM-8PM\nSun: 10AM-6PM",
      action: "View Schedule",
      link: "#contact-location",
    },
  ];

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-6 sm:py-8 lg:py-14 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          Ready to Transform Your Look?
        </h2>
        <p className="text-base sm:text-lg text-primary-foreground/90 max-w-md mx-auto mb-6 sm:mb-8">
          Book your appointment today and experience the luxury and artistry that sets La Coiffure apart.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="#appointment-booking"
            onClick={(e) => handleSmoothScroll(e, "#appointment-booking")}
          >
            <button 
              className="group relative inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-accent via-accent to-yellow-500 text-accent-foreground font-bold text-lg py-4 px-8 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/40 hover:scale-105 active:scale-95 min-h-[48px] min-w-[48px]"
              aria-label="Book appointment at La Coiffure Salon"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-accent to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center space-x-3">
                <Icon name="Calendar" size={20} className="group-hover:animate-bounce" />
                <span>Book Appointment</span>
                <Icon name="ArrowRight" size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
          </a>
          <a
            href="#services-catalog"
            onClick={(e) => handleSmoothScroll(e, "#services-catalog")}
          >
            <Button
              variant="outline"
              size="sm"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-5 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base"
              iconName="Scissors"
              iconPosition="left"
            >
              View Services
            </Button>
          </a>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10 lg:mt-12 max-w-4xl mx-auto">
          {contactInfo.map((info, i) => (
            <div key={i} className="text-center px-2">
              <div className="bg-accent/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name={info.icon} size={22} className="text-accent" />
              </div>
              <h2 className="font-heading text-base sm:text-lg font-semibold mb-1">
                {info.title}
              </h2>
              <p className="text-sm sm:text-base text-primary-foreground/80 mb-2 whitespace-pre-line">
                {info.content}
              </p>
              {info.link.startsWith("tel:") ? (
                <a href={info.link}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent hover:bg-accent/10 text-sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {info.action}
                  </Button>
                </a>
              ) : (
                <a
                  href={info.link}
                  onClick={(e) => handleSmoothScroll(e, info.link)}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent hover:bg-accent/10 text-sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {info.action}
                  </Button>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="mt-8 sm:mt-10">
          <h3 className="font-heading text-base sm:text-lg font-semibold mb-3">
            Connect With Us
          </h3>
          <div className="flex justify-center gap-3 sm:gap-4">
            {[
              { name: "Instagram", icon: "Instagram", url: "https://instagram.com/lacoiffuresalon" },
              { name: "Facebook", icon: "Facebook", url: "https://facebook.com/lacoiffuresalons" },
              { name: "YouTube", icon: "Youtube", url: "https://youtube.com/@imranlcs" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-all"
                aria-label={`Follow us on ${s.name}`}
              >
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
