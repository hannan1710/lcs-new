import { useEffect } from 'react';
import { preloadImages } from '../utils/imageOptimization';

const CriticalResourcePreloader = () => {
  useEffect(() => {
    // Critical images that should be preloaded
    const criticalImages = [
      '/la-coiffure-powai-ash-brown-highlights.jpg',
      '/la-coiffure-powai-grey-bob-haircut.jpg',
      '/la-coiffure-thane-balayage-highlights-curly-hair.jpg',
      '/la-coiffure-thane-men-haircut-and-beard.jpg',
      '/logo.jpg',
      '/la-coiffure-salon-logo.png',
      '/assets/images/logo.jpg'
    ];

    // Preload critical images
    preloadImages(criticalImages);

    // Preload critical fonts (if any)
    const criticalFonts = [
      // Add any critical font URLs here
    ];

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = fontUrl;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload critical CSS (if any)
    const criticalCSS = [
      // Add any critical CSS URLs here
    ];

    criticalCSS.forEach(cssUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = cssUrl;
      document.head.appendChild(link);
    });

  }, []);

  return null; // This component doesn't render anything
};

export default CriticalResourcePreloader;
