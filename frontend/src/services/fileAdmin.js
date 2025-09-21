// File-based Admin System for Static Website
// This allows you to make changes that persist in localStorage
// and can be exported/imported for backup

class FileAdmin {
  constructor() {
    this.storageKey = 'lcs_admin_data';
    this.defaultData = {
      services: [
        {
          id: 1,
          name: "Haircut Men",
          category: "hair",
          price: 500,
          duration: "30 min",
          description: "Professional men's haircuts and styling with modern techniques.",
          image: "/assets/images/haircut-men.jpg"
        },
        {
          id: 2,
          name: "Haircut Women",
          category: "hair",
          price: 800,
          duration: "45 min",
          description: "Trendy women's haircuts and styling for all hair types.",
          image: "/assets/images/haircut-women.jpg"
        },
        {
          id: 3,
          name: "Hair Color",
          category: "color",
          price: 1500,
          duration: "120 min",
          description: "Professional hair coloring and highlights with premium products.",
          image: "/assets/images/hair-color.jpg"
        },
        {
          id: 4,
          name: "Facial",
          category: "spa",
          price: 1200,
          duration: "60 min",
          description: "Deep cleansing facial treatment for radiant, healthy skin.",
          image: "/assets/images/facial.jpg"
        },
        {
          id: 5,
          name: "Manicure",
          category: "nails",
          price: 600,
          duration: "45 min",
          description: "Professional nail care and polish application.",
          image: "/assets/images/manicure.jpg"
        },
        {
          id: 6,
          name: "Pedicure",
          category: "nails",
          price: 800,
          duration: "60 min",
          description: "Complete foot care and nail treatment.",
          image: "/assets/images/pedicure.jpg"
        }
      ],
      stylists: [
        {
          id: 1,
          name: "Afsan",
          specialization: "Hair Styling",
          experience: "8 years",
          rating: 4.8,
          image: "/afsan.jpg",
          bio: "Expert in modern haircuts and hair coloring techniques"
        },
        {
          id: 2,
          name: "Ajaz",
          specialization: "Hair & Beard",
          experience: "10 years",
          rating: 4.9,
          image: "/ajaz.webp",
          bio: "Specialist in men's grooming and beard styling"
        },
        {
          id: 3,
          name: "Imsa",
          specialization: "Beauty & Makeup",
          experience: "6 years",
          rating: 4.7,
          image: "/imsa.jpg",
          bio: "Professional makeup artist and beauty specialist"
        },
        {
          id: 4,
          name: "Nizam",
          specialization: "Hair & Color",
          experience: "12 years",
          rating: 4.9,
          image: "/nizam.jpg",
          bio: "Master colorist with expertise in highlights and treatments"
        },
        {
          id: 5,
          name: "Pooja",
          specialization: "Skin Care",
          experience: "5 years",
          rating: 4.6,
          image: "/pooja.webp",
          bio: "Certified skin care specialist and facial expert"
        },
        {
          id: 6,
          name: "Preety",
          specialization: "Nail Art",
          experience: "4 years",
          rating: 4.5,
          image: "/preety.webp",
          bio: "Creative nail artist specializing in unique designs"
        }
      ],
      contact: {
        phone: "+91-9876543210",
        email: "info@lacoiffuresalons.com",
        addresses: [
          {
            location: "Thane",
            address: "Shop No. 5, Ground Floor, Anand Nagar, Thane West, Maharashtra 400601",
            phone: "+91-9876543210"
          },
          {
            location: "Powai",
            address: "Shop No. 161&162, First Floor, Galleria, Hiranandani Gardens, Powai, Maharashtra 400076",
            phone: "+91-9876543211"
          }
        ],
        hours: {
          weekdays: "10:00 AM - 8:00 PM",
          weekends: "10:00 AM - 8:00 PM"
        }
      },
      gallery: [
        {
          id: 1,
          src: "/assets/images/afsan.jpg",
          alt: "Hair Styling Work",
          category: "Hair"
        },
        {
          id: 2,
          src: "/assets/images/ajaz.webp",
          alt: "Men's Grooming",
          category: "Men"
        },
        {
          id: 3,
          src: "/assets/images/imsa.jpg",
          alt: "Makeup Work",
          category: "Makeup"
        },
        {
          id: 4,
          src: "/assets/images/nizam.jpg",
          alt: "Hair Color Work",
          category: "Hair"
        },
        {
          id: 5,
          src: "/assets/images/pooja.webp",
          alt: "Facial Treatment",
          category: "Skin"
        },
        {
          id: 6,
          src: "/assets/images/preety.webp",
          alt: "Nail Art",
          category: "Nails"
        }
      ]
    };
  }

  // Initialize data
  init() {
    const existingData = this.loadData();
    if (!existingData) {
      this.saveData(this.defaultData);
    }
    return this.loadData();
  }

  // Load data from localStorage
  loadData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading admin data:', error);
      return null;
    }
  }

  // Save data to localStorage
  saveData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving admin data:', error);
      return false;
    }
  }

  // Get all data
  getAllData() {
    return this.loadData() || this.defaultData;
  }

  // Update service
  updateService(id, updates) {
    const data = this.loadData() || this.defaultData;
    const serviceIndex = data.services.findIndex(service => service.id === id);
    if (serviceIndex !== -1) {
      data.services[serviceIndex] = { ...data.services[serviceIndex], ...updates };
      this.saveData(data);
      return data.services[serviceIndex];
    }
    return null;
  }

  // Add new service
  addService(service) {
    const data = this.loadData() || this.defaultData;
    const newId = Math.max(...data.services.map(s => s.id)) + 1;
    const newService = { ...service, id: newId };
    data.services.push(newService);
    this.saveData(data);
    return newService;
  }

  // Delete service
  deleteService(id) {
    const data = this.loadData() || this.defaultData;
    data.services = data.services.filter(service => service.id !== id);
    this.saveData(data);
    return true;
  }

  // Update stylist
  updateStylist(id, updates) {
    const data = this.loadData() || this.defaultData;
    const stylistIndex = data.stylists.findIndex(stylist => stylist.id === id);
    if (stylistIndex !== -1) {
      data.stylists[stylistIndex] = { ...data.stylists[stylistIndex], ...updates };
      this.saveData(data);
      return data.stylists[stylistIndex];
    }
    return null;
  }

  // Add new stylist
  addStylist(stylist) {
    const data = this.loadData() || this.defaultData;
    const newId = Math.max(...data.stylists.map(s => s.id)) + 1;
    const newStylist = { ...stylist, id: newId };
    data.stylists.push(newStylist);
    this.saveData(data);
    return newStylist;
  }

  // Delete stylist
  deleteStylist(id) {
    const data = this.loadData() || this.defaultData;
    data.stylists = data.stylists.filter(stylist => stylist.id !== id);
    this.saveData(data);
    return true;
  }

  // Update contact info
  updateContact(updates) {
    const data = this.loadData() || this.defaultData;
    data.contact = { ...data.contact, ...updates };
    this.saveData(data);
    return data.contact;
  }

  // Update gallery item
  updateGalleryItem(id, updates) {
    const data = this.loadData() || this.defaultData;
    const itemIndex = data.gallery.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      data.gallery[itemIndex] = { ...data.gallery[itemIndex], ...updates };
      this.saveData(data);
      return data.gallery[itemIndex];
    }
    return null;
  }

  // Add gallery item
  addGalleryItem(item) {
    const data = this.loadData() || this.defaultData;
    const newId = Math.max(...data.gallery.map(i => i.id)) + 1;
    const newItem = { ...item, id: newId };
    data.gallery.push(newItem);
    this.saveData(data);
    return newItem;
  }

  // Delete gallery item
  deleteGalleryItem(id) {
    const data = this.loadData() || this.defaultData;
    data.gallery = data.gallery.filter(item => item.id !== id);
    this.saveData(data);
    return true;
  }

  // Export data as JSON
  exportData() {
    const data = this.loadData() || this.defaultData;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lcs-admin-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Import data from JSON file
  importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.saveData(data);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }

  // Reset to default data
  resetToDefault() {
    this.saveData(this.defaultData);
    return this.defaultData;
  }

  // Get backup data for code generation
  generateCode() {
    const data = this.loadData() || this.defaultData;
    return `// Generated from admin panel
export const staticData = ${JSON.stringify(data, null, 2)};

export default staticData;`;
  }
}

// Create singleton instance
const fileAdmin = new FileAdmin();

export default fileAdmin;
