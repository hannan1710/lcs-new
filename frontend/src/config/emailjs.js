// src/config/emailjs.js
// EmailJS Configuration
// Replace these with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  // Get these from your EmailJS dashboard
  SERVICE_ID: 'service_z44qhsm', // Your actual service ID
  TEMPLATE_ID: 'template_u3zxx1m', // Your actual template ID
  PUBLIC_KEY: 'nmcCmD8lVfU4vzYv0', // Your actual public key
  
  // Email templates
  TEMPLATES: {
    BOOKING_NOTIFICATION: 'your_booking_template_id', // For salon staff
    CUSTOMER_CONFIRMATION: 'your_customer_template_id', // For customers
  },
  
  // Email recipients
  RECIPIENTS: {
    SALON_EMAIL: 'info@lacoiffuresalons.com', // Your salon email
    ADMIN_EMAIL: 'info@lacoiffuresalons.com', // Admin email (optional)
  }
};

// Instructions for setup:
/*
1. Go to https://www.emailjs.com/
2. Sign in to your account
3. Go to Email Services and create a new service (Gmail, Outlook, etc.)
4. Go to Email Templates and create templates
5. Go to Account > API Keys to get your Public Key
6. Replace the values above with your actual credentials

TEMPLATE VARIABLES AVAILABLE:
- {{customer_name}} - Customer's name
- {{customer_phone}} - Customer's phone
- {{appointment_date}} - Formatted appointment date
- {{appointment_time}} - Appointment time
- {{branch_name}} - Selected branch (Thane/Powai)
- {{branch_phone}} - Branch phone number
- {{appointment_type}} - Appointment or Consultation
- {{contact_method}} - WhatsApp or Phone Call
- {{notes}} - Additional notes
- {{salon_name}} - La Coiffure Salon
- {{salon_email}} - Salon email
- {{to_email}} - Recipient email
- {{reply_to}} - Reply to email
*/
