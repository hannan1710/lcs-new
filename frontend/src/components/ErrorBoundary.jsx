import React from "react";
import Icon from "./AppIcon";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    error.__ErrorBoundary = true;
    window.__COMPONENT_ERROR__?.(error, errorInfo);
    // console.log("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
          <div className="text-center p-8 max-w-lg">
            <div className="flex justify-center items-center mb-6">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none" className="text-accent">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-foreground">La Coiffure Salon</h1>
              <p className="text-muted-foreground text-lg">We're enhancing your experience</p>
              <p className="text-sm text-muted-foreground/80 max-w-md mx-auto">
                Our team is working to provide you with the best salon experience. Please try again in a moment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M3 21v-5h5"/>
                </svg>
                Refresh Page
              </button>
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="text-accent hover:text-accent/80 font-semibold py-3 px-6 rounded-lg border border-accent/20 hover:border-accent/40 transition-all duration-200"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props?.children;
  }
}

export default ErrorBoundary;