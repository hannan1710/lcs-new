import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import fileAdmin from '../../services/fileAdmin';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  const [localData, setLocalData] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // Check if admin is already logged in and load data
  useEffect(() => {
    const adminStatus = localStorage.getItem('admin_logged_in');
    if (adminStatus === 'true') {
      setIsAuthenticated(true);
      const data = fileAdmin.init();
      setLocalData(data);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check (in real app, this would be more secure)
    if (password === 'lcsadmin2024') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_logged_in', 'true');
      const data = fileAdmin.init();
      setLocalData(data);
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_logged_in');
  };

  const updateService = (id, field, value) => {
    const updatedService = fileAdmin.updateService(id, { [field]: value });
    if (updatedService) {
      const data = fileAdmin.getAllData();
      setLocalData(data);
    }
  };

  const updateStylist = (id, field, value) => {
    const updatedStylist = fileAdmin.updateStylist(id, { [field]: value });
    if (updatedStylist) {
      const data = fileAdmin.getAllData();
      setLocalData(data);
    }
  };

  const updateContact = (field, value) => {
    const updatedContact = fileAdmin.updateContact({ [field]: value });
    if (updatedContact) {
      const data = fileAdmin.getAllData();
      setLocalData(data);
    }
  };

  const addService = () => {
    const newService = {
      name: "New Service",
      category: "hair",
      price: 500,
      duration: "30 min",
      description: "Service description",
      image: "/assets/images/no_image.png"
    };
    const added = fileAdmin.addService(newService);
    if (added) {
      const data = fileAdmin.getAllData();
      setLocalData(data);
    }
  };

  const deleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const deleted = fileAdmin.deleteService(id);
      if (deleted) {
        const data = fileAdmin.getAllData();
        setLocalData(data);
      }
    }
  };

  const addStylist = () => {
    const newStylist = {
      name: "New Stylist",
      specialization: "Hair Styling",
      experience: "5 years",
      rating: 4.5,
      image: "/assets/images/no_image.png",
      bio: "Stylist bio"
    };
    const added = fileAdmin.addStylist(newStylist);
    if (added) {
      const data = fileAdmin.getAllData();
      setLocalData(data);
    }
  };

  const deleteStylist = (id) => {
    if (window.confirm('Are you sure you want to delete this stylist?')) {
      const deleted = fileAdmin.deleteStylist(id);
      if (deleted) {
        const data = fileAdmin.getAllData();
        setLocalData(data);
      }
    }
  };

  const exportData = () => {
    fileAdmin.exportData();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      fileAdmin.importData(file)
        .then(data => {
          setLocalData(data);
          alert('Data imported successfully!');
        })
        .catch(error => {
          alert('Error importing data: ' + error.message);
        });
    }
  };

  const generateCode = () => {
    const code = fileAdmin.generateCode();
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'staticData.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      const data = fileAdmin.resetToDefault();
      setLocalData(data);
      alert('Data reset to default values!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} color="white" />
                </div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Admin Login
                </h1>
                <p className="text-muted-foreground">
                  Enter admin password to access the control panel
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    type="password"
                    label="Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Demo Password:</strong> lcsadmin2024
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Note: Changes are local only. To make permanent changes, edit the source code files.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Loading state
  if (!localData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Icon name="Loader" size={48} className="animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading admin data...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Admin Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Admin Panel
              </h1>
              <p className="text-muted-foreground">
                Manage your salon content (changes are local only)
              </p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={exportData} variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </Button>
              <Button onClick={() => document.getElementById('import-file').click()} variant="outline" size="sm">
                <Icon name="Upload" size={16} className="mr-2" />
                Import
              </Button>
              <Button onClick={generateCode} variant="outline" size="sm">
                <Icon name="Code" size={16} className="mr-2" />
                Generate Code
              </Button>
              <Button onClick={resetData} variant="outline" size="sm">
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Reset
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <Icon name="LogOut" size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Hidden file input for import */}
          <input
            id="import-file"
            type="file"
            accept=".json"
            onChange={importData}
            style={{ display: 'none' }}
          />

          {/* Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-8">
            {[
              { id: 'services', label: 'Services', icon: 'Scissors' },
              { id: 'stylists', label: 'Stylists', icon: 'Users' },
              { id: 'contact', label: 'Contact', icon: 'Phone' },
              { id: 'gallery', label: 'Gallery', icon: 'Image' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-luxury flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-card border border-border rounded-lg p-6">
            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Services Management</h2>
                  <Button onClick={addService} size="sm">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Service
                  </Button>
                </div>
                <div className="space-y-4">
                  {localData.services.map(service => (
                    <div key={service.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Service #{service.id}</h3>
                        <Button 
                          onClick={() => deleteService(service.id)} 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Service Name"
                          value={service.name}
                          onChange={(e) => updateService(service.id, 'name', e.target.value)}
                        />
                        <Input
                          label="Price (₹)"
                          type="number"
                          value={service.price}
                          onChange={(e) => updateService(service.id, 'price', parseInt(e.target.value))}
                        />
                        <Input
                          label="Duration"
                          value={service.duration}
                          onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                        />
                        <Input
                          label="Category"
                          value={service.category}
                          onChange={(e) => updateService(service.id, 'category', e.target.value)}
                        />
                      </div>
                      <div className="mt-4">
                        <Input
                          label="Description"
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stylists' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Stylists Management</h2>
                  <Button onClick={addStylist} size="sm">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Stylist
                  </Button>
                </div>
                <div className="space-y-4">
                  {localData.stylists.map(stylist => (
                    <div key={stylist.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Stylist #{stylist.id}</h3>
                        <Button 
                          onClick={() => deleteStylist(stylist.id)} 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Name"
                          value={stylist.name}
                          onChange={(e) => updateStylist(stylist.id, 'name', e.target.value)}
                        />
                        <Input
                          label="Specialization"
                          value={stylist.specialization}
                          onChange={(e) => updateStylist(stylist.id, 'specialization', e.target.value)}
                        />
                        <Input
                          label="Experience"
                          value={stylist.experience}
                          onChange={(e) => updateStylist(stylist.id, 'experience', e.target.value)}
                        />
                        <Input
                          label="Rating"
                          type="number"
                          step="0.1"
                          value={stylist.rating}
                          onChange={(e) => updateStylist(stylist.id, 'rating', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="mt-4">
                        <Input
                          label="Bio"
                          value={stylist.bio}
                          onChange={(e) => updateStylist(stylist.id, 'bio', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <Input
                    label="Phone"
                    value={localData.contact.phone}
                    onChange={(e) => updateContact('phone', e.target.value)}
                  />
                  <Input
                    label="Email"
                    value={localData.contact.email}
                    onChange={(e) => updateContact('email', e.target.value)}
                  />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Addresses</h3>
                    {localData.contact.addresses.map((address, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 mb-4">
                        <Input
                          label="Location"
                          value={address.location}
                          onChange={(e) => {
                            const newAddresses = [...localData.contact.addresses];
                            newAddresses[index].location = e.target.value;
                            setLocalData(prev => ({
                              ...prev,
                              contact: { ...prev.contact, addresses: newAddresses }
                            }));
                          }}
                        />
                        <Input
                          label="Address"
                          value={address.address}
                          onChange={(e) => {
                            const newAddresses = [...localData.contact.addresses];
                            newAddresses[index].address = e.target.value;
                            setLocalData(prev => ({
                              ...prev,
                              contact: { ...prev.contact, addresses: newAddresses }
                            }));
                          }}
                        />
                        <Input
                          label="Phone"
                          value={address.phone}
                          onChange={(e) => {
                            const newAddresses = [...localData.contact.addresses];
                            newAddresses[index].phone = e.target.value;
                            setLocalData(prev => ({
                              ...prev,
                              contact: { ...prev.contact, addresses: newAddresses }
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Gallery Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {localData.gallery.map(item => (
                    <div key={item.id} className="border border-border rounded-lg p-4">
                      <img 
                        src={item.src} 
                        alt={item.alt}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <Input
                        label="Alt Text"
                        value={item.alt}
                        onChange={(e) => {
                          setLocalData(prev => ({
                            ...prev,
                            gallery: prev.gallery.map(galleryItem => 
                              galleryItem.id === item.id ? { ...galleryItem, alt: e.target.value } : galleryItem
                            )
                          }));
                        }}
                      />
                      <Input
                        label="Category"
                        value={item.category}
                        onChange={(e) => {
                          setLocalData(prev => ({
                            ...prev,
                            gallery: prev.gallery.map(galleryItem => 
                              galleryItem.id === item.id ? { ...galleryItem, category: e.target.value } : galleryItem
                            )
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warning Notice */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Changes made here are <strong>local only</strong> and will be lost when you refresh the page. 
                    To make permanent changes, you need to edit the source code files and redeploy your website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
