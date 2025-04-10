import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import AIPoweredSection from './components/AIPoweredSection';
import ServicesSection from './components/ServicesSection';
import FeaturesSection from './components/FeaturesSection';
import SpeedSection from './components/SpeedSection';

function MainPage() {
  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <AIPoweredSection />
      <ServicesSection />
      <FeaturesSection />
      <SpeedSection />
    </>
  );
}
  
export default MainPage;
