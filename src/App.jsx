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
import ViewUserProfilePage from './Views/Profile Page/viewUserProfilePage';
import ViewMentorProfilePage from './Views/Mentor Profile Page/viewMentorProfilePage';

import EventInfo from './Views/ES Events/eventInfo';
import CreateEvent from './Views/ES Events/createEvent';

import LandingPage from './Views/Landing Page/landingPage';

import UserProfileCreationPage from './Views/User profile Creation Page/userProfileCreationPage';
import MentorProfileCreationPage from './Views/Mentor Profile Creation Page/mentorProfileCreationPage';

import Teams from './Views/Teams/teams';

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
  const isProfilePageRoute = location.pathname.startsWith('/profile');
  const isChoosePersonaRoute = location.pathname === '/choose-persona';
  const isMentorProfileRoute = location.pathname.startsWith('/mentorProfile');
  const isLandingPageRoute = location.pathname === '/landing-page';
  const isDMPageRoute = location.pathname === '/dm-page';
  const isUserProfileCreationPageRoute = location.pathname === '/user-profile-creation-page';
  const isMentorProfileCreationPageRoute = location.pathname === '/mentor-profile-creation-page';

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 text-gray-800">
      {(!isProfilePageRoute && !isChoosePersonaRoute && !isMentorProfileRoute &&
         !isLandingPageRoute && !isDMPageRoute && !isUserProfileCreationPageRoute && !isMentorProfileCreationPageRoute) && <Navbar />}
      <Routes>
        <Route path="/" element={<EsEvents />} />
        <Route path="/social" element={<Social />} />
        <Route path="/connect" element={<Connect />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/mentorProfile' element={<MentorProfile />} />
        <Route path='/dm-page' element={<DMPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/choose-persona' element={<ChoosePersona />} />
        <Route path='/profile/:userId' element={<ViewUserProfilePage />} />
        <Route path='/mentorProfile/:mentorId' element={<ViewMentorProfilePage />} />
        <Route path='/create-event' element={<CreateEvent />} />
        <Route path='/event-info' element={<EventInfo />} />
        <Route path='/landing-page' element={<LandingPage />} />
        <Route path='/teams' element={<Teams />} />

        <Route path='/user-profile-creation-page' element={<UserProfileCreationPage />} />
        <Route path='/mentor-profile-creation-page' element={<MentorProfileCreationPage />} />



        {/* Add more routes as needed */}
      </Routes>
      {(!isProfilePageRoute && !isChoosePersonaRoute && !isMentorProfileRoute &&
        !isLandingPageRoute && !isDMPageRoute && !isUserProfileCreationPageRoute && !isMentorProfileCreationPageRoute) && <Footer />}
    </div>
  );
}

export default App;
