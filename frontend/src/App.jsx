import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Routes from "./Routes";
import CriticalResourcePreloader from "./components/CriticalResourcePreloader";

// Enhanced global loading component - localhost optimized
const GlobalLoader = () => {
  // Add localhost-specific timeout handling
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('Loading taking longer than expected on localhost...');
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent/30 rounded-full animate-ping mx-auto"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">La Coiffure Salon</h2>
          <p className="text-muted-foreground">Loading premium experience...</p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          {/* Localhost-specific help text */}
          {window.location.hostname === 'localhost' && (
            <p className="text-xs text-muted-foreground/60 mt-4">
              If this takes too long, try refreshing the page
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <CriticalResourcePreloader />
      <Suspense fallback={<GlobalLoader />}>
        <Routes />
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;
