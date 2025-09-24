import { useEffect } from 'react';

const CriticalResourcePreloader = () => {
  useEffect(() => {
    // Only preload truly critical resources for LCP
    const criticalImages = [
      '/la-coiffure-salon-logo.png',
      '/la-coiffure-salon-thane-location.png',
      '/la-coiffure-salon-powai-location.png'
    ];

    // Preload critical images with high priority
    criticalImages.forEach(imageSrc => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageSrc;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Preload likely next page resources
    const nextPageResources = [
      '/mens-haircut-styling-services.png',
      '/womens-haircut-styling-services.png'
    ];

    // Use requestIdleCallback for non-critical resources
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        nextPageResources.forEach(imageSrc => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.as = 'image';
          link.href = imageSrc;
          document.head.appendChild(link);
        });
      });
    }

  }, []);

  return null; // This component doesn't render anything
};

export default CriticalResourcePreloader;
