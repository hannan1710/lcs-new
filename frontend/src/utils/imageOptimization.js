// Image optimization utilities
export const optimizeImage = (src, options = {}) => {
  const {
    width = null,
    height = null,
    quality = 75,
    format = 'auto',
    blur = 0
  } = options;

  // For now, return the original src
  // In production, you would integrate with a service like:
  // - Cloudinary
  // - ImageKit
  // - Next.js Image Optimization
  // - Custom image optimization service
  
  return src;
};

// Generate responsive image sources
export const generateResponsiveImage = (baseSrc, sizes = []) => {
  const baseName = baseSrc.replace(/\.[^/.]+$/, '');
  const extension = baseSrc.split('.').pop();
  
  return sizes.map(size => ({
    src: `${baseName}-${size}w.${extension}`,
    width: size,
    media: `(max-width: ${size}px)`
  }));
};

// Preload critical images
export const preloadImage = (src) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
  
  return () => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  };
};

// Batch preload images
export const preloadImages = (srcs) => {
  return srcs.map(src => preloadImage(src));
};

// Check if image is above the fold
export const isAboveTheFold = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  return rect.top < windowHeight;
};

// Image compression utility (client-side)
export const compressImage = (file, quality = 0.8, maxWidth = 1920) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// WebP support detection
export const supportsWebP = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Get optimal image format
export const getOptimalFormat = (originalFormat = 'jpg') => {
  if (supportsWebP()) {
    return 'webp';
  }
  
  if (originalFormat === 'png' && supportsWebP()) {
    return 'webp';
  }
  
  return originalFormat;
};
