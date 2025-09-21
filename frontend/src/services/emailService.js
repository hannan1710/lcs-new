// src/services/emailService.js
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = EMAILJS_CONFIG.SERVICE_ID;
const EMAILJS_TEMPLATE_ID = EMAILJS_CONFIG.TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = EMAILJS_CONFIG.PUBLIC_KEY;

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendBookingEmail = async (bookingData) => {
  try {
    console.log('EmailJS Config:', {
      SERVICE_ID: EMAILJS_SERVICE_ID,
      TEMPLATE_ID: EMAILJS_TEMPLATE_ID,
      PUBLIC_KEY: EMAILJS_PUBLIC_KEY
    });
    
    console.log('Booking data received:', bookingData);
    
    // Format the date for better readability
    const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Get selected branch details
    const selectedBranch = bookingData.branch === 'thane' ? 'Thane' : 'Powai';
    const branchPhone = bookingData.branch === 'thane' ? '+91 99670 02481' : '+91 74000 68615';

    // Template parameters for EmailJS
    const templateParams = {
      // Template variables (matching your EmailJS template)
      from_name: bookingData.name,
      from_email: bookingData.phone, // Using phone as contact since no email collected
      to_name: `${selectedBranch} Branch Team`,
      message: `Appointment Details:
Date: ${formattedDate}
Time: ${bookingData.time}
Branch: ${selectedBranch}
Type: ${bookingData.appointmentType === 'appointment' ? 'Appointment' : 'Consultation'}
Contact Method: ${bookingData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Phone Call'}
Phone: ${bookingData.phone}
${bookingData.notes ? `\nNotes: ${bookingData.notes}` : ''}`,
      
      // Additional details for reference
      customer_name: bookingData.name,
      customer_phone: bookingData.phone,
      appointment_date: formattedDate,
      appointment_time: bookingData.time,
      branch_name: selectedBranch,
      branch_phone: branchPhone,
      appointment_type: bookingData.appointmentType === 'appointment' ? 'Appointment' : 'Consultation',
      contact_method: bookingData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Phone Call',
      notes: bookingData.notes || 'No additional notes',
      salon_name: 'La Coiffure Salon',
      salon_email: 'info@lacoiffuresalons.com',
      to_email: 'info@lacoiffuresalons.com',
      reply_to: bookingData.phone,
    };

    console.log('Sending email with params:', templateParams);

    // Send email using EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Send customer confirmation email
export const sendCustomerConfirmation = async (bookingData) => {
  try {
    const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const selectedBranch = bookingData.branch === 'thane' ? 'Thane' : 'Powai';
    const branchPhone = bookingData.branch === 'thane' ? '+91 99670 02481' : '+91 74000 68615';

    const templateParams = {
      customer_name: bookingData.name,
      customer_email: bookingData.phone, // Using phone as contact
      appointment_date: formattedDate,
      appointment_time: bookingData.time,
      branch_name: selectedBranch,
      branch_phone: branchPhone,
      appointment_type: bookingData.appointmentType === 'appointment' ? 'Appointment' : 'Consultation',
      contact_method: bookingData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Phone Call',
      salon_name: 'La Coiffure Salon',
      salon_phone: branchPhone,
      salon_email: 'info@lacoiffuresalons.com',
    };

    // You can create a separate template for customer confirmation
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'customer_confirmation_template', // Different template for customer
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return { success: true, result };
  } catch (error) {
    console.error('Customer confirmation email failed:', error);
    return { success: false, error: error.message };
  }
};
