import React from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import EsEvents from './Views/ES Events/esEvents';
import Social from './Views/Social/social';
import Connect from './Views/Connect/connect';
import Profile from './Views/Profile Page/profilePage';
import MentorProfile from './Views/Mentor Profile Page/mentorProfilePage';
import DMPage from './Views/DM Page/dmPage';
import Dashboard from './Views/Dashboard/dashboard';
import ChoosePersona from './Views/Choose Persona Page/choosePersonaPage';

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
  const isProfileRoute = location.pathname === "/profile";
  const isChoosePersonaRoute = location.pathname === "/choose-persona";

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 text-gray-800">
      {(!isProfileRoute && !isChoosePersonaRoute) && <Navbar />}
      <Routes>
        <Route path="/" element={<EsEvents />} />
        <Route path="/social" element={<Social />} />
        <Route path="/connect" element={<Connect />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/mentorProfile' element={<MentorProfile />} />
        <Route path='/dm-page' element={<DMPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/choose-persona' element={<ChoosePersona />} />
        {/* Add more routes as needed */}
      </Routes>
      {(!isProfileRoute && !isChoosePersonaRoute) && <Footer />}
    </div>
  );
}

export default App;
