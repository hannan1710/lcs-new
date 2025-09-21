// Shared gallery data for both homepage and gallery page
export const galleryData = [
  {
    id: 1,
    image: '/1.jpg',
    alt: 'Professional men\'s haircut and styling at La Coiffure Salon Thane Powai - Expert grooming services'
  },
  {
    id: 2,
    image: '/2.jpg',
    alt: 'Professional women\'s haircut and styling at La Coiffure Salon Thane Powai - Expert hair services'
  },
  {
    id: 3,
    image: '/3.jpg',
    alt: 'Beautiful hair color transformation at La Coiffure Salon Thane Powai - Professional color services'
  },
  {
    id: 4,
    image: '/4.jpg',
    alt: 'Professional hair highlighting at La Coiffure Salon Thane Powai - Expert color techniques'
  },
  {
    id: 5,
    image: '/5.jpg',
    alt: 'Relaxing spa and hair treatments at La Coiffure Salon Thane Powai - Premium wellness services'
  },
  {
    id: 6,
    image: '/6.jpg',
    alt: 'Hair texturizing and styling at La Coiffure Salon Thane Powai - Professional styling'
  },
  {
    id: 7,
    image: '/7.jpg',
    alt: 'Professional facial treatments at La Coiffure Salon Thane Powai - Expert skincare services'
  },
  {
    id: 8,
    image: '/8.jpg',
    alt: 'Hair cleanup and maintenance at La Coiffure Salon Thane Powai - Professional care'
  },
  {
    id: 9,
    image: '/9.jpg',
    alt: 'Manicure and nail care services at La Coiffure Salon Thane Powai - Professional nail care'
  },
  {
    id: 10,
    image: '/10.jpg',
    alt: 'Advanced skin care treatments at La Coiffure Salon Thane Powai - Expert beauty services'
  },
  {
    id: 11,
    image: '/11.jpg',
    alt: 'Hair bleaching and polishing at La Coiffure Salon Thane Powai - Professional color treatments'
  },
  {
    id: 12,
    image: '/12.jpg',
    alt: 'Professional waxing services at La Coiffure Salon Thane Powai - Expert hair removal'
  },
  {
    id: 13,
    image: '/13.jpg',
    alt: 'Creative nail art and designs at La Coiffure Salon Thane Powai - Professional nail design'
  },
  {
    id: 14,
    image: '/14.jpg',
    alt: 'Professional makeup services at La Coiffure Salon Thane Powai - Expert beauty and bridal makeup'
  },
  {
    id: 15,
    image: '/15.png',
    alt: 'Professional hair styling and design at La Coiffure Salon Thane Powai - Expert hair artistry'
  },
  {
    id: 16,
    image: '/16.jpg',
    alt: 'Complete beauty transformation at La Coiffure Salon Thane Powai - Expert beauty services'
  },
  // Add more gallery images here - they will appear in both homepage and gallery page
  {
    id: 17,
    image: '/17.jpg',
    alt: 'Elegant bridal hair styling at La Coiffure Salon Thane Powai - Premium wedding beauty'
  },
  {
    id: 18,
    image: '/18.jpg',
    alt: 'Professional men\'s grooming services at La Coiffure Salon Thane Powai - Expert styling and care'
  },
  {
    id: 19,
    image: '/19.jpg',
    alt: 'Professional hair extension services at La Coiffure Salon Thane Powai - Premium hair treatments'
  },
  {
    id: 20,
    image: '/20.jpg',
    alt: 'Smoothing keratin treatment at La Coiffure Salon Thane Powai - Professional hair smoothing'
  }
];

// Function to get images for homepage (first 8 images)
export const getHomepageGalleryImages = () => {
  return galleryData.slice(0, 8).map(item => ({
    id: item.id,
    src: item.image,
    alt: item.alt
  }));
};

// Function to get random images for slideshow (8 random images)
export const getSlideshowImages = () => {
  const shuffled = [...galleryData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 8).map(item => ({
    id: item.id,
    src: item.image,
    alt: item.alt
  }));
};

// Function to get all images for gallery page
export const getAllGalleryImages = () => {
  return galleryData.map(item => ({
    id: item.id,
    src: item.image,
    alt: item.alt
  }));
};
