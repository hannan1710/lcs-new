import React, { useState, useRef, useEffect } from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  loading = "lazy",
  priority = false,
  sizes = "100vw",
  quality = 75,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before image comes into view
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    e.target.src = "/assets/images/no_image.png";
  };

  // Generate optimized image src with WebP support
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc || hasError) return originalSrc;
    
    // For local images, we'll use a simple optimization approach
    // In production, you'd want to use a service like Cloudinary or Next.js Image
    return originalSrc;
  };

  return (
    <div ref={imgRef} className="relative">
      {/* Simple loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Actual image */}
      {(isInView || priority) && (
        <img
          src={getOptimizedSrc(src)}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 ease-out`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          {...props}
        />
      )}
    </div>
  );
}

export default Image;
