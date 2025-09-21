import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import AboutUs from './pages/about-us';
import GalleryPortfolio from './pages/gallery-portfolio';
import AppointmentBooking from './pages/appointment-booking';
import ContactLocationPage from './pages/contact-location';
import ServicesCatalog from './pages/services-catalog';
// import StylistProfiles from './pages/stylist-profiles';
import Homepage from './pages/homepage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import AdminPanel from './pages/admin/AdminPanel';


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Main Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/services-catalog" element={<ServicesCatalog />} />
        {/** Team page removed */}
        <Route path="/gallery-portfolio" element={<GalleryPortfolio />} />
        <Route path="/contact-location" element={<ContactLocationPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<Navigate to="/login" replace />} />
        
        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        
        {/* Admin Panel */}
        <Route path="/admin" element={<AdminPanel />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
