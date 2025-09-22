import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Routes from "./Routes";
import CriticalResourcePreloader from "./components/CriticalResourcePreloader";

function App() {
  return (
    <HelmetProvider>
      <CriticalResourcePreloader />
      <Routes />
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;
