import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/ui/Header';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import SEOHead from '../../../components/SEOHead';
import { sendBookingEmail } from '../../../services/emailService';

const SingleStepBooking = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    // Branch selection
    branch: '',
    
    // Contact information
    name: '',
    phone: '',
    
    // Date and time
    date: '',
    time: '',
    
    // Appointment type
    appointmentType: '', // 'appointment' or 'consultation'
    
    // Contact method
    contactMethod: '', // 'whatsapp' or 'phone'
    
    // Additional notes
    notes: ''
  });

  // Branch data
  const branches = [
    {
      id: 'thane',
      name: 'Thane',
      address: 'Anand Nagar',
      phone: '+91 99670 02481',
      whatsapp: '+91 99670 02481',
      mapLink: 'https://maps.app.goo.gl/yourthanemap',
      hours: 'Monday - Sunday: 10:00 AM - 8:00 PM',
      image: '/assets/images/thane.png'
    },
    {
      id: 'powai',
      name: 'Powai',
      address: 'Galleria',
      phone: '+91 74000 68615',
      whatsapp: '+91 74000 68615',
      mapLink: 'https://maps.app.goo.gl/yourpowaimap',
      hours: 'Monday - Sunday: 10:00 AM - 8:00 PM',
      image: '/assets/images/powai.png'
    }
  ];

  // Time slots
  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',"8:00 PM","8:30 PM","9:00 PM","9:30 PM"
  ];

  // Generate calendar days
  const getCalendarDays = () => {
    const days = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get first day of current month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // Get starting day of week (0 = Sunday)
    const startDay = firstDay.getDay();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push({ day: '', date: '', available: false });
    }
    
    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0];
      const isPast = date < today;
      const isSunday = date.getDay() === 0;
      const isAvailable = !isPast && !isSunday;
      
      days.push({
        day: day.toString(),
        date: dateString,
        available: isAvailable
      });
    }
    
    return days;
  };

  // Get available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.branch) newErrors.branch = 'Please select a branch';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    if (!formData.appointmentType) newErrors.appointmentType = 'Please select appointment type';
    if (!formData.contactMethod) newErrors.contactMethod = 'Please select contact method';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted!', formData);
    
    // Validate form and get validation result
    const isValid = validateForm();
    
    if (!isValid) {
      console.log('Form validation failed');
      // Use setTimeout to ensure state is updated before scrolling
      setTimeout(() => {
        scrollToFirstError();
      }, 50);
      return;
    }

    console.log('Form validation passed, starting email send...');
    setIsLoading(true);
    
    try {
      // Send email notification to salon
      console.log('Calling sendBookingEmail...');
      const emailResult = await sendBookingEmail(formData);
      console.log('Email result:', emailResult);
      
      if (emailResult.success) {
        console.log('Email sent successfully');
        setIsConfirmed(true);
      } else {
        console.error('Email sending failed:', emailResult.error);
        // Still show confirmation even if email fails
        alert('Booking submitted! We will contact you soon. (Email notification failed)');
        setIsConfirmed(true);
      }
    } catch (error) {
      console.error('Booking error:', error);
      // Still show confirmation even if email fails
      alert('Booking submitted! We will contact you soon. (Email notification failed)');
      setIsConfirmed(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to first error field
  const scrollToFirstError = () => {
    console.log('=== SCROLL TO FIRST ERROR DEBUG ===');
    console.log('Current errors:', errors);
    console.log('Form data:', formData);
    
    // Check for missing or invalid fields directly
    const missingFields = [];
    
    // Check each field individually
    if (!formData.branch) {
      missingFields.push('branch');
      console.log('❌ Branch missing');
    } else {
      console.log('✅ Branch selected:', formData.branch);
    }
    
    if (!formData.name?.trim()) {
      missingFields.push('name');
      console.log('❌ Name missing');
    } else {
      console.log('✅ Name provided:', formData.name);
    }
    
    // Check phone validation (same as in validateForm)
    if (!formData.phone?.trim()) {
      missingFields.push('phone');
      console.log('❌ Phone missing');
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      missingFields.push('phone');
      console.log('❌ Phone invalid:', formData.phone);
    } else {
      console.log('✅ Phone valid:', formData.phone);
    }
    
    if (!formData.date) {
      missingFields.push('date');
      console.log('❌ Date missing');
    } else {
      console.log('✅ Date selected:', formData.date);
    }
    
    if (!formData.time) {
      missingFields.push('time');
      console.log('❌ Time missing');
    } else {
      console.log('✅ Time selected:', formData.time);
    }
    
    if (!formData.appointmentType) {
      missingFields.push('appointmentType');
      console.log('❌ Appointment type missing');
    } else {
      console.log('✅ Appointment type selected:', formData.appointmentType);
    }
    
    if (!formData.contactMethod) {
      missingFields.push('contactMethod');
      console.log('❌ Contact method missing');
    } else {
      console.log('✅ Contact method selected:', formData.contactMethod);
    }
    
    console.log('Missing fields array:', missingFields);
    
    // Try to scroll to the first missing field
    for (const field of missingFields) {
      console.log(`🔍 Looking for element with data-field="${field}"`);
      const element = document.querySelector(`[data-field="${field}"]`);
      console.log('Element found:', element);
      
      if (element) {
        console.log(`📍 Scrolling to field: ${field}`);
        
        // Add highlight effect
        element.classList.add('ring-2', 'ring-red-500', 'ring-opacity-50');
        
        // Scroll to element
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        // Focus the element if it's an input
        const input = element.querySelector('input, textarea, button');
        if (input) {
          console.log('Focusing input:', input);
          input.focus();
        }
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-red-500', 'ring-opacity-50');
        }, 3000);
        
        console.log(`✅ Successfully scrolled to field: ${field}`);
        break;
      } else {
        console.log(`❌ Element not found for field: ${field}`);
      }
    }
    
    console.log('=== END SCROLL DEBUG ===');
  };

  // Get selected branch details
  const selectedBranch = branches.find(branch => branch.id === formData.branch);

  // Handle new booking
  const handleNewBooking = () => {
    setFormData({
      branch: '',
      name: '',
      phone: '',
      date: '',
      time: '',
      appointmentType: '',
      contactMethod: '',
      notes: ''
    });
    setErrors({});
    setIsConfirmed(false);
  };

  // Handle go home
  const handleGoHome = () => {
    navigate('/homepage');
  };

  // Confirmation component
  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
             <div className="text-center mb-8">
               <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                 Booking Request Submitted! 🎉
               </h1>
               <p className="text-lg text-muted-foreground">
                 Thank you for choosing La Coiffure Salon
               </p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
               {/* Booking Summary Card */}
               <div className="bg-card border border-border rounded-lg p-6">
                 <h2 className="text-xl font-semibold mb-6 flex items-center">
                   <Icon name="Calendar" size={20} className="mr-2 text-accent" />
                   Booking Summary
                 </h2>
                 
                 <div className="space-y-4">
                   <div className="flex items-center space-x-3">
                     <Icon name="User" size={16} className="text-accent" />
                     <div>
                       <span className="text-sm text-muted-foreground">Name</span>
                       <p className="text-foreground font-medium">{formData.name}</p>
                     </div>
                   </div>
                   
                   <div className="flex items-center space-x-3">
                     <Icon name="Phone" size={16} className="text-accent" />
                     <div>
                       <span className="text-sm text-muted-foreground">Phone</span>
                       <p className="text-foreground font-medium">{formData.phone}</p>
                     </div>
                   </div>
                   
                   
                   <div className="flex items-center space-x-3">
                     <Icon name="Calendar" size={16} className="text-accent" />
                     <div>
                       <span className="text-sm text-muted-foreground">Date</span>
                       <p className="text-foreground font-medium">
                         {new Date(formData.date).toLocaleDateString('en-US', { 
                           weekday: 'long', 
                           year: 'numeric', 
                           month: 'long', 
                           day: 'numeric' 
                         })}
                       </p>
                     </div>
                   </div>
                   
                   <div className="flex items-center space-x-3">
                     <Icon name="Clock" size={16} className="text-accent" />
                     <div>
                       <span className="text-sm text-muted-foreground">Time</span>
                       <p className="text-foreground font-medium">{formData.time}</p>
                     </div>
                   </div>
                   
                   <div className="flex items-center space-x-3">
                     <Icon name="MapPin" size={16} className="text-accent" />
                     <div>
                       <span className="text-sm text-muted-foreground">Branch</span>
                       <p className="text-foreground font-medium">{selectedBranch?.name} Branch</p>
                     </div>
                   </div>
                   
                   {formData.notes && (
                     <div className="flex items-start space-x-3">
                       <Icon name="FileText" size={16} className="text-accent mt-1" />
                       <div>
                         <span className="text-sm text-muted-foreground">Notes</span>
                         <p className="text-foreground font-medium">{formData.notes}</p>
                       </div>
                     </div>
                   )}
                 </div>
               </div>

               {/* Confirmation Card */}
               <div className="bg-card border border-border rounded-lg p-4 pb-3">
                 <h2 className="text-lg font-semibold mb-3 flex items-center">
                   <Icon name="MessageCircle" size={18} className="mr-2 text-accent" />
                   Confirmation
                 </h2>
                 
                 <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                   <p className="text-base text-foreground">
                     You will receive a {formData.contactMethod === 'whatsapp' ? 'WhatsApp message' : 'phone call'} from the {selectedBranch?.name} branch to confirm your appointment.
                   </p>
                 </div>
                 
                 {/* Contact Us Section */}
                 <div className="mt-4">
                   <h3 className="text-base font-semibold mb-2 flex items-center">
                     <Icon name="Phone" size={16} className="mr-2 text-accent" />
                     Contact Us
                   </h3>
                   
                   <div className="space-y-1">
                     <div>
                       <span className="text-sm text-muted-foreground">Branch Phone</span>
                       <div className="flex items-start space-x-2 mt-1">
                         <Icon name="Phone" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                         <a 
                           href={`tel:${selectedBranch?.phone}`}
                           className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                         >
                           {selectedBranch?.phone}
                         </a>
                       </div>
                     </div>
                     
                     <div>
                       <span className="text-sm text-muted-foreground">WhatsApp</span>
                       <div className="flex items-start space-x-2 mt-1">
                         <Icon name="MessageCircle" size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                         <a 
                           href={`https://wa.me/${selectedBranch?.whatsapp.replace(/[^\d]/g, '')}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-green-500 hover:text-green-600 font-medium text-sm"
                         >
                           Chat with us
                         </a>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleNewBooking}
                variant="outline"
                size="lg"
                iconName="Plus"
                iconPosition="left"
              >
                Book Another Appointment
              </Button>
              <Button
                onClick={handleGoHome}
                size="lg"
                iconName="Home"
                iconPosition="left"
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Structured data for booking page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Book Appointment - La Coiffure Salon",
    "description": "Book your hair and beauty appointment at La Coiffure Salon in Thane or Powai. Easy online booking for haircuts, coloring, treatments, and more.",
    "url": "https://lacoiffuresalons.com/appointment-booking",
    "mainEntity": {
      "@type": "BeautySalon",
      "name": "La Coiffure Salon",
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "Shop no.11&12, Saraswati School, Anand Nagar",
          "addressLocality": "Thane West",
          "addressRegion": "Maharashtra",
          "postalCode": "400615",
          "addressCountry": "IN"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "SN 161&162 floor 1st, galleriya, Hiranandani Gardens, Panchkutir Ganesh Nagar",
          "addressLocality": "Powai",
          "addressRegion": "Mumbai",
          "postalCode": "400076",
          "addressCountry": "IN"
        }
      ],
      "telephone": ["+91 99670 02481", "+91 74000 68615"],
      "openingHours": "Mo-Su 10:00-20:00"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Book Appointment | La Coiffure Salon Thane & Powai"
        description="Book your hair and beauty appointment at La Coiffure Salon. Choose from Thane or Powai locations. Easy online booking for haircuts, coloring, keratin treatments, and beauty services."
        keywords="book salon appointment, hair appointment Thane, beauty booking Powai, salon booking online, haircut appointment, hair color booking, keratin treatment appointment, bridal makeup booking"
        canonicalUrl="/appointment-booking"
        ogImage="/la-coiffure-salon-logo.png"
        ogType="website"
        structuredData={structuredData}
      />
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Book Your Appointment
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience luxury hair care with our expert stylists. Fill out the form below to schedule your perfect appointment.
            </p>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Branch Selection */}
            <div className="bg-card border border-border rounded-lg p-6" data-field="branch">
              <h2 className="text-3xl font-semibold mb-8 flex items-center">
                <Icon name="MapPin" size={28} className="mr-3" />
                Select Branch
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {branches.map((branch) => (
                  <div
                    key={branch.id}
                    className={`border-2 rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500/20 ${
                      formData.branch === branch.id
                        ? 'border-accent bg-accent/10 shadow-lg shadow-yellow-500/30'
                        : 'border-border hover:border-accent/50'
                    }`}
                    onClick={() => handleInputChange('branch', branch.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} className="text-accent flex-shrink-0" />
                      <div className="flex flex-col text-left">
                        <h3 className="text-lg font-bold">
                          {branch.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{branch.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
                  </div>
                  {errors.branch && <p className="text-error text-sm mt-2">{errors.branch}</p>}
                  
                  {/* Branch Contact Options */}
                  {formData.branch && (
                    <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                      <h3 className="text-base font-medium text-foreground mb-3"> Call or WhatsApp directly</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-base font-medium text-foreground">{selectedBranch?.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedBranch?.phone}</p>
                        </div>
                        <a
                          href={`tel:${selectedBranch?.phone}`}
                          className="flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors text-sm"
                        >
                          <Icon name="Phone" size={16} />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

            {/* Contact Information */}
            <div className="bg-card border border-border rounded-lg p-6" data-field="name">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="User" size={20} className="mr-2" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  error={errors.name}
                  required
                />
                <Input
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your 10-digit phone number"
                  error={errors.phone}
                  required
                />
              </div>
            </div>

            {/* Date and Time Selection */}
            <div className="bg-card border border-border rounded-lg p-6" data-field="date">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="Calendar" size={20} className="mr-2" />
                Select Date & Time
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <div className="grid grid-cols-7 gap-1 mb-3">
                    {/* Calendar Header */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
                        {day}
                      </div>
                    ))}
                    
                    {/* Calendar Days */}
                    {getCalendarDays().map((day, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => day.available && handleInputChange('date', day.date)}
                        disabled={!day.available}
                        className={`p-1.5 text-xs rounded-md transition-all hover:shadow-lg hover:shadow-yellow-500/20 ${
                          day.available
                            ? formData.date === day.date
                              ? 'bg-accent text-accent-foreground shadow-lg shadow-yellow-500/30'
                              : 'hover:bg-muted text-foreground hover:shadow-lg hover:shadow-yellow-500/20'
                            : 'text-muted-foreground cursor-not-allowed opacity-50'
                        }`}
                      >
                        {day.day}
                      </button>
                    ))}
                  </div>
                  {errors.date && <p className="text-error text-sm mt-1">{errors.date}</p>}
                </div>

                {/* Time Selection */}
                {formData.date && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Time
                    </label>
                    <div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      <div className="grid grid-cols-3 gap-1.5 pr-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => handleInputChange('time', time)}
                            className={`p-2 text-xs rounded-md transition-all hover:shadow-lg hover:shadow-yellow-500/20 ${
                              formData.time === time
                                ? 'bg-accent text-accent-foreground shadow-lg shadow-yellow-500/30'
                                : 'hover:bg-muted text-foreground hover:shadow-lg hover:shadow-yellow-500/20'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                    {errors.time && <p className="text-error text-sm mt-1">{errors.time}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Appointment Type */}
            <div className="bg-card border border-border rounded-lg p-6" data-field="appointmentType">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="Scissors" size={20} className="mr-2" />
                Appointment Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500/20 ${
                    formData.appointmentType === 'appointment'
                      ? 'border-accent bg-accent/10 shadow-lg shadow-yellow-500/30'
                      : 'border-border hover:border-accent/50'
                  }`}
                  onClick={() => handleInputChange('appointmentType', 'appointment')}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <Icon name="Calendar" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium">Appointment</h3>
                      <p className="text-sm text-muted-foreground">Regular service booking</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500/20 ${
                    formData.appointmentType === 'consultation'
                      ? 'border-accent bg-accent/10 shadow-lg shadow-yellow-500/30'
                      : 'border-border hover:border-accent/50'
                  }`}
                  onClick={() => handleInputChange('appointmentType', 'consultation')}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <Icon name="MessageCircle" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium">Consultation</h3>
                      <p className="text-sm text-muted-foreground">Discuss your needs</p>
                    </div>
                  </div>
                </div>
              </div>
              {errors.appointmentType && <p className="text-error text-sm mt-2">{errors.appointmentType}</p>}
            </div>

            {/* Contact Method */}
            <div className="bg-card border border-border rounded-lg p-6" data-field="contactMethod">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Preferred Contact Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500/20 ${
                    formData.contactMethod === 'whatsapp'
                      ? 'border-accent bg-accent/10 shadow-lg shadow-yellow-500/30'
                      : 'border-border hover:border-accent/50'
                  }`}
                  onClick={() => handleInputChange('contactMethod', 'whatsapp')}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <Icon name="MessageCircle" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground">Confirmation Through WhatsApp</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500/20 ${
                    formData.contactMethod === 'phone'
                      ? 'border-accent bg-accent/10 shadow-lg shadow-yellow-500/30'
                      : 'border-border hover:border-accent/50'
                  }`}
                  onClick={() => handleInputChange('contactMethod', 'phone')}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <Icon name="Phone" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone Call</h3>
                      <p className="text-sm text-muted-foreground">We'll call you to confirm</p>
                    </div>
                  </div>
                </div>
              </div>
              {errors.contactMethod && <p className="text-error text-sm mt-2">{errors.contactMethod}</p>}
            </div>

            {/* Additional Notes */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Icon name="FileText" size={18} className="mr-2" />
                Additional Notes (Optional)
              </h2>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any specific requirements or questions you'd like to mention..."
                rows={3}
                className="w-full p-3 bg-transparent border-2 border-accent rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-accent via-accent to-yellow-500 text-accent-foreground font-bold text-lg py-4 px-8 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-accent to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center space-x-3">
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <Icon name="Calendar" size={20} className="group-hover:animate-bounce" />
                  )}
                  <span>{isLoading ? 'Booking...' : 'Book Appointment'}</span>
                  {!isLoading && <Icon name="ArrowRight" size={18} className="group-hover:translate-x-2 transition-transform duration-300" />}
                </div>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SingleStepBooking;
