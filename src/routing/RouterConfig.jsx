import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Import your page components here
// For example:
// import HomePage from '../pages/HomePage';
// import ProductPage from '../pages/ProductPage';
// ...other imports

// This component scrolls to top when navigating between pages
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Define your routes here */}
        {/* For example: */}
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/gryork-explained" element={<GryorkExplainedPage />} />
        <Route path="/dispute-resolution" element={<DisputeResolutionPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/help-support" element={<HelpSupportPage />} />
        <Route path="/cwc" element={<CwcPage />} /> */}
        
        {/* Add a catch-all route to handle 404s */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;
