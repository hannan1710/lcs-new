import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageLightbox = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onPrevious, 
  onNext 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e?.key === 'Escape') onClose();
      if (e?.key === 'ArrowLeft') onPrevious();
      if (e?.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen || !images?.[currentIndex]) return null;

  const currentImage = images?.[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-end p-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1 rounded-full bg-black/20 hover:bg-black/40 transition-luxury"
            aria-label="Close lightbox"
          >
            <Icon name="X" size={20} color="white" />
          </button>
        </div>
      </div>
      {/* Navigation Arrows */}
      {images?.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/20 hover:bg-black/40 transition-luxury"
            aria-label="Previous image"
          >
            <Icon name="ChevronLeft" size={24} color="white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/20 hover:bg-black/40 transition-luxury"
            aria-label="Next image"
          >
            <Icon name="ChevronRight" size={24} color="white" />
          </button>
        </>
      )}
      {/* Main Image */}
      <div 
        className="flex items-center justify-center h-full cursor-pointer"
        onClick={onClose}
      >
        <div 
          className="relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-full w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={currentImage?.src}
            alt={currentImage?.alt}
            className="w-full h-full object-contain rounded-lg"
          />
          
          {/* Before/After Indicator */}
          {currentImage?.isBeforeAfter && (
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">Before & After</span>
            </div>
          )}
        </div>
      </div>
      {/* Bottom Info & Actions */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-1">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="text-white">
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <span>{currentIndex + 1} of {images?.length}</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="default"
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                iconName="Calendar"
                iconPosition="left"
              >
                Book Similar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;