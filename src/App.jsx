import React from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import EsEvents from './Views/ES Events/esEvents';
import Social from './Views/Social/social';
import Connect from './Views/Connect/connect';
import Profile from './Views/Profile Page/profilePage';
import MentorProfile from './Views/Mentor Profile Page/mentorProfilePage';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Get the base URL from the import.meta.env (injected by Vite)
const baseUrl = import.meta.env.BASE_URL || '/';

function App() {
  // Wrap the routing in a separate component so useLocation can run inside the Router.
  return (
    <Router basename={baseUrl}>
      <ScrollToTop />
      <AppInner />
    </Router>
  );
}

function AppInner() {
  const location = useLocation();
  const isSpecialRoute = location.pathname === "/profile" || location.pathname === "/dm-page";
  
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#95C5C5] text-gray-800">
      {!isSpecialRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<EsEvents />} />
        <Route path="/social" element={<Social />} />
        <Route path="/connect" element={<Connect />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/mentorProfile' element={<MentorProfile />} />
        {/* Add more routes as needed */}
      </Routes>
      {!isSpecialRoute && <Footer />}
    </div>
  );
}

export default App;
