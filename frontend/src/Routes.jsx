import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

// Critical pages - load immediately
import Homepage from './pages/homepage';

// Non-critical pages - lazy load for better performance
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutUs = lazy(() => import('./pages/about-us'));
const GalleryPortfolio = lazy(() => import('./pages/gallery-portfolio'));
const AppointmentBooking = lazy(() => import('./pages/appointment-booking'));
const ContactLocationPage = lazy(() => import('./pages/contact-location'));
const ServicesCatalog = lazy(() => import('./pages/services-catalog'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));

// Enhanced page loader with better UX
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading page...</p>
    </div>
  </div>
);


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Main Pages */}
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/appointment-booking" element={
            <Suspense fallback={<PageLoader />}>
              <AppointmentBooking />
            </Suspense>
          } />
          <Route path="/services-catalog" element={
            <Suspense fallback={<PageLoader />}>
              <ServicesCatalog />
            </Suspense>
          } />
          <Route path="/services" element={
            <Suspense fallback={<PageLoader />}>
              <ServicesCatalog />
            </Suspense>
          } />
          <Route path="/gallery-portfolio" element={
            <Suspense fallback={<PageLoader />}>
              <GalleryPortfolio />
            </Suspense>
          } />
          <Route path="/gallery" element={
            <Suspense fallback={<PageLoader />}>
              <GalleryPortfolio />
            </Suspense>
          } />
          <Route path="/contact-location" element={
            <Suspense fallback={<PageLoader />}>
              <ContactLocationPage />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<PageLoader />}>
              <ContactLocationPage />
            </Suspense>
          } />
          <Route path="/about-us" element={
            <Suspense fallback={<PageLoader />}>
              <AboutUs />
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<PageLoader />}>
              <AboutUs />
            </Suspense>
          } />
          
          
          {/* User Dashboard */}
          <Route path="/dashboard" element={
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          } />
          
          
          {/* 404 */}
          <Route path="*" element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          } />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
