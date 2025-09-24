import React, { useState, useRef, useEffect, memo } from 'react';

// Memoized component to prevent unnecessary re-renders
const Image = memo(({
  src,
  alt = "Image Name",
  className = "",
  loading = "lazy",
  priority = false,
  sizes = "100vw",
  quality = 75,
  placeholder = "blur",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  // Intersection Observer for aggressive lazy loading
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
        // More aggressive lazy loading - load closer to viewport
        rootMargin: priority ? '0px' : '50px',
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
    // Better fallback image
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='16'%3EImage not found%3C/text%3E%3C/svg%3E";
  };

  // Generate optimized image src with modern formats
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc || hasError) return originalSrc;
    
    // Check for WebP support and optimize
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    // For local images, apply client-side compression
    if (originalSrc.startsWith('/') || originalSrc.startsWith('./')) {
      return originalSrc; // Local images are already optimized by Vite
    }

    // For external images or when using image optimization services
    const url = new URL(originalSrc, window.location.origin);
    
    // Add compression hints for different image types
    if (originalSrc.includes('.jpg') || originalSrc.includes('.jpeg')) {
      // For JPEG images, add quality parameter
      url.searchParams.set('q', '80'); // 80% quality for good compression
      url.searchParams.set('f', 'auto'); // Auto format selection
    } else if (originalSrc.includes('.png')) {
      // For PNG images, add compression level
      url.searchParams.set('f', 'auto'); // Auto format selection
    }
    
    // Add responsive image parameters
    url.searchParams.set('w', 'auto'); // Auto width
    url.searchParams.set('h', 'auto'); // Auto height
    
    return url.toString();
  };

  // Generate blur placeholder for better UX
  const getBlurDataURL = () => {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='400' height='300' fill='%23f1f5f9' filter='url(%23b)'/%3E%3C/svg%3E";
  };

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {/* Enhanced loading placeholder with blur effect */}
      {isLoading && placeholder === 'blur' && (
        <div className="absolute inset-0">
          <img
            src={getBlurDataURL()}
            alt=""
            className="w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      
      {/* Simple loading placeholder */}
      {isLoading && placeholder !== 'blur' && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Actual image with performance optimizations */}
      {(isInView || priority) && (
        <img
          src={getOptimizedSrc(src)}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-out`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          style={{
            // Prevent layout shift
            aspectRatio: 'auto',
            contentVisibility: 'auto',
            containIntrinsicSize: '1px 1px',
          }}
          {...props}
        />
      )}
    </div>
  );
});

Image.displayName = 'Image';

export default Image;
