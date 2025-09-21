import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();


  const navigationItems = [
    { label: "Home", path: "/homepage", icon: "Home" },
    { label: "Services", path: "/services-catalog", icon: "Scissors" },
    { label: "Gallery", path: "/gallery-portfolio", icon: "Image" },
    // { label: "Our Products", path: "/products", icon: "Package" }, // This is commented out
    { label: "Contact", path: "/contact-location", icon: "MapPin" },
    { label: "About Us", path: "/about-us", icon: "Info" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-luxury ${
          isScrolled ? "shadow-luxury" : ""
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/homepage"
              className="flex items-center space-x-3 transition-luxury hover:opacity-80"
              onClick={closeMobileMenu}
            >
              <img
                src="/lcsg.png" // or {logo}
                alt="La Coiffure Logo"
                className="h-12 w-auto object-contain lg:h-14"
              />

              <div className="flex flex-col">
                <span className="font-heading font-semibold text-lg lg:text-xl text-primary">
                  La Coiffure Salon
                </span>
              
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-luxury hover:text-accent ${
                    isActivePath(item?.path) ? "text-accent" : "text-foreground"
                  }`}
                >
                  {item?.label}
                  {isActivePath(item?.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/*
              <Link to="/cart" className="relative">
                <Button variant="outline" size="sm">
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  Cart
                </Button>
              </Link>
              */}
              {/*
              <Link to="/book-now">
                <Button size="sm">Book Now</Button>
              </Link>
              */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-3 rounded-lg hover:bg-muted transition-luxury touch-manipulation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-border py-4 mobile-menu-container">
              <nav className="space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-lg transition-luxury touch-manipulation ${
                      isActivePath(item?.path)
                        ? "bg-accent/10 text-accent"
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </nav>

            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;