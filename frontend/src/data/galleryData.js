// Shared gallery data for both homepage and gallery page
export const galleryData = [
  {
    id: 1,
    image: '/la-coiffure-powai-ash-brown-highlights.jpg',
    alt: 'Ash Brown Highlights Hair Color at La Coiffure Salon Powai - Professional hair coloring services'
  },
  {
    id: 2,
    image: '/la-coiffure-powai-grey-bob-haircut.jpg',
    alt: 'Grey Bob Haircut at La Coiffure Salon Powai - Trendy short hair styling and coloring'
  },
  {
    id: 3,
    image: '/la-coiffure-thane-balayage-highlights-curly-hair.jpg',
    alt: 'Balayage Highlights on Curly Hair at La Coiffure Salon Thane - Professional hair highlighting techniques'
  },
  {
    id: 4,
    image: '/la-coiffure-thane-men-haircut-and-beard.jpg',
    alt: 'Men\'s Haircut and Beard Styling at La Coiffure Salon Thane - Professional men\'s grooming services'
  },
  {
    id: 5,
    image: '/la-coiffure-powai-purple-bob-haircut.jpg',
    alt: 'Purple Bob Haircut at La Coiffure Salon Powai - Bold hair color and modern bob styling'
  },
  {
    id: 6,
    image: '/la-coiffure-powai-red-highlights.jpg',
    alt: 'Red Highlights Hair Color at La Coiffure Salon Powai - Vibrant hair coloring and highlighting'
  },
  {
    id: 7,
    image: '/la-coiffure-thane-red-highlight-haircut.jpg',
    alt: 'Red Highlight Haircut at La Coiffure Salon Thane - Professional hair coloring and styling'
  },
  {
    id: 8,
    image: '/la-coiffure-powai-wavy-brown-hair.jpg',
    alt: 'Wavy Brown Hair Styling at La Coiffure Salon Powai - Natural wavy hair styling and care'
  },
  {
    id: 9,
    image: '/la-coiffure-thane-wavy-auburn-hair.jpg',
    alt: 'Wavy Auburn Hair Color at La Coiffure Salon Thane - Beautiful auburn hair coloring and styling'
  },
  {
    id: 10,
    image: '/la-coiffure-thane-wavy-hair-copper-ombre.jpg',
    alt: 'Copper Ombre Hair Color at La Coiffure Salon Thane - Trendy ombre hair coloring techniques'
  },
  {
    id: 11,
    image: '/la-coiffure-powai-men-haircut-stylist.jpg',
    alt: 'Men\'s Haircut by Professional Stylist at La Coiffure Salon Powai - Expert men\'s hair styling'
  },
  {
    id: 12,
    image: '/la-coiffure-powai-mens-haircut.jpg',
    alt: 'Professional Men\'s Haircut at La Coiffure Salon Powai - Modern men\'s grooming and styling'
  },
  {
    id: 13,
    image: '/sunil-grover-la-coiffure-powai.png',
    alt: 'Celebrity Hair Styling at La Coiffure Salon Powai - Professional celebrity hair services'
  },
  {
    id: 14,
    image: '/red-underlights-hair-color-thane-powai.jpg',
    alt: 'Red Underlights Hair Color at La Coiffure Salon Thane Powai - Professional hair coloring techniques'
  }
  // Add more gallery images here - they will appear in both homepage and gallery page
  // {
  //   id: 17,
  //   image: '/17.jpg',
  //   alt: 'Elegant bridal hair styling at La Coiffure Salon Thane Powai - Premium wedding beauty'
  // },
  // {
  //   id: 18,
  //   image: '/18.jpg',
  //   alt: 'Professional men\'s grooming services at La Coiffure Salon Thane Powai - Expert styling and care'
  // },
  // {
  //   id: 19,
  //   image: '/19.jpg',
  //   alt: 'Professional hair extension services at La Coiffure Salon Thane Powai - Premium hair treatments'
  // },
  // {
  //   id: 20,
  //   image: '/20.jpg',
  //   alt: 'Smoothing keratin treatment at La Coiffure Salon Thane Powai - Professional hair smoothing'
  // }
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
