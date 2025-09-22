import { useEffect } from 'react';
import { preloadImages } from '../utils/imageOptimization';

const CriticalResourcePreloader = () => {
  useEffect(() => {
    // Critical images that should be preloaded
    const criticalImages = [
      '/1.jpg',
      '/2.jpg',
      '/3.jpg',
      '/4.jpg',
      '/logo.jpg',
      '/lcsg.png',
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
