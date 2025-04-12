import React from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import EsEvents from './Views/ES Events/esEvents';
import Social from './Views/Social/social';
import Connect from './Views/Connect/connect';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Get the base URL from the import.meta.env (injected by Vite)
const baseUrl = import.meta.env.BASE_URL || '/';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 text-gray-800">
      <Router basename={baseUrl}>
        <ScrollToTop />
        <Navbar />

        <Routes>

          <Route path="/" element={<EsEvents />} />
          <Route path="/social" element={<Social />} />
          <Route path="/connect" element={<Connect />} />

        </Routes>



        <Footer />
      </Router>
    </div>
  );
}

export default App;
