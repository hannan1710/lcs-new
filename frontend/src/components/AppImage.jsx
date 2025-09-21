import React, { useState } from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  loading = "lazy",
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    e.target.src = "/assets/images/no_image.png";
  };

  return (
    <div className="relative">
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={loading === "eager" ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

export default Image;
