import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useInView from '../../../hooks/useInView';
import { useMediaQuery } from 'react-responsive';
// Import images directly as modules
import rupeeIcon from '../../../Images/rupee (1).svg';
import verifiedIcon from '../../../Images/verified.svg';
import learningIcon from '../../../Images/learning (1).svg';
import hierarchyIcon from '../../../Images/hierarchy-structure.svg';
import grylinkIcon from '../../../Images/grylink.svg';

// Mobile-optimized Service Card component
const MobileServiceCard = ({ title, icon, description, urlLink, onNavigate, delay = 0 }) => {
  const { ref, isInView } = useInView({ threshold: 0.1 }, delay);

  return (
    <div 
      ref={ref}
      className={`relative w-[260px] h-[260px] flex flex-col items-center
                transition-all duration-700 ease-out mb-20 ${
        isInView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-20'
      }`}
    >
      <div 
        className={`absolute -top-[40px] left-1/2 transform -translate-x-1/2 z-10 transition-all duration-700 delay-200 ${
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`} 
        style={{ background: 'none' }}
      >
        <img src={icon} alt={title} className="w-24 h-24" />
      </div>
      
      <div className="w-full h-full rounded-full overflow-hidden relative shadow-xl">
        <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1/2 before:bg-white before:z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/2 after:bg-[#268044] after:z-[1]">
          <div className="relative z-[2] w-full h-full flex flex-col justify-center items-center p-6 text-center">
            <br /><br />
            <h3 className="text-3xl font-bold uppercase z-[2] mb-2">{title}</h3>
            <br />
            <p className="text-sm leading-snug z-[2] text-white mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      <a 
        href={urlLink || "/"} 
        onClick={(e) => onNavigate(urlLink || "/", e)} 
        className={`absolute -bottom-[20px] left-1/2 transform -translate-x-1/2 bg-[#CFF063] py-2 px-6 rounded-full text-black no-underline text-sm font-bold z-10 shadow-md transition-all duration-700 delay-300 hover:bg-[#b5d650] ${
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        learn more
      </a>
    </div>
  );
};

// Reusable Service Card component (desktop version)
const ServiceCard = ({ title, icon, description, urlLink, onNavigate, delay = 0 }) => {
  const { ref, isInView } = useInView({ threshold: 0.1 }, delay);
  
  return (
    <div 
      ref={ref}
      className={`relative w-[450px] h-[450px] flex flex-col items-center 
                md:w-[380px] md:h-[380px] 
                sm:w-[300px] sm:h-[300px]
                xs:w-[260px] xs:h-[260px]
                transition-all duration-700 ease-out ${
        isInView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-20'
      }`}
    >
      <div 
        className={`absolute -top-[55px] left-1/2 transform -translate-x-1/2 z-10 transition-all duration-700 delay-200 ${
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`} 
        style={{ background: 'none' }}
      >
        <img src={icon} alt={title} className="w-36 h-36 sm:w-28 sm:h-28 xs:w-24 xs:h-24" />
      </div>
      
      <div className="w-full h-full rounded-full overflow-hidden relative shadow-xl">
        <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1/2 before:bg-white before:z-[1] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/2 after:bg-[#268044] after:z-[1]">
          <div className="relative z-[2] w-full h-full flex flex-col justify-center items-center p-12 sm:p-8 xs:p-6 text-center">
            <br className="xs:hidden" /><br className="xs:hidden" />
            <h3 className="text-5xl font-bold uppercase z-[2] mb-3 mt-10 sm:text-4xl xs:text-3xl">{title}</h3>
            <br className="xs:hidden" />
            <p className="text-2xl leading-snug text-black z-[2] relative -top-[15%] md:text-xl sm:text-base xs:text-sm text-white">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      <a 
        href={urlLink || "/"} 
        onClick={(e) => onNavigate(urlLink || "/", e)} 
        className={`absolute -bottom-[25px] left-1/2 transform -translate-x-1/2 bg-[#CFF063] py-4 px-10 rounded-full text-black no-underline text-xl font-bold z-10 shadow-md sm:text-lg sm:py-3 sm:px-8 xs:text-sm xs:py-2 xs:px-6 transition-all duration-700 delay-300 hover:bg-[#b5d650] ${
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        learn more
      </a>
    </div>
  );
};

const ServicesSection = () => {
  const navigate = useNavigate();
  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Check screen size to determine if mobile view should be shown
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint is 640px in tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0); // Scroll to the top of the page after navigation
  };

  const services = [
    {
      title: 'CWC',
      icon: rupeeIcon,
      description: 'Short Term credit Solution for subcontractors',
      urlLink: '/cwc'
    },
    {
      title: 'CWC VEST',
      icon: verifiedIcon,
      description: 'Your projects\'s finance safety against payment delays',
      urlLink: '/cwc-vest'
    },
    {
      title: 'SUPERVISOR',
      icon: learningIcon,
      description: 'An AI-powered tool that automate your workflow',
      urlLink: '/supervisor'
    },
    {
      title: 'TEAMS',
      icon: hierarchyIcon,
      description: 'Build and grow a skilled work balance',
      urlLink: '/team'
    },
    {
      title: 'GRYLINK',
      icon: grylinkIcon,
      description: 'Smarter Credit Decisions. Seamless Integration',
      urlLink: '/grylink'
    }
  ];

  // Mobile view - vertical stacked layout
  if (isMobile) {
    return (
      <div 
        id="services-section"
        ref={sectionRef}
        className={`max-w-[1600px] mx-auto my-12 px-4 transition-all duration-700 ${
          sectionInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <br /><br />
        <div className="flex flex-col items-center space-y-8">
          {services.map((service, index) => (
            <div key={index} className="flex justify-center">
              <MobileServiceCard 
                {...service} 
                onNavigate={handleNavigation} 
                delay={index * 100}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop view - original layout
  return (
    <div 
      id="services-section"
      ref={sectionRef}
      className={`max-w-[1600px] mx-auto my-12 px-8 sm:px-4 transition-all duration-700 ${
        sectionInView ? 'opacity-100' : 'opacity-0'
      }`}
    >

      <br /><br />

      <div className="flex flex-col space-y-20 md:space-y-16 sm:space-y-12">
          <div className="flex justify-evenly md:flex-wrap md:justify-center md:gap-x-25 md:gap-y-20 sm:gap-x-6 sm:gap-y-16">
            {services.slice(0, 3).map((service, index) => (
              <div key={index} className="flex justify-center">
                <ServiceCard 
                  {...service} 
                  onNavigate={handleNavigation} 
                  delay={index * 150}
                />
              </div>
            ))}
          </div>
          
          <br /><br /><br />
          
          <div className="flex justify-evenly md:flex-wrap md:justify-center md:gap-x-25 md:gap-y-20 sm:gap-x-6 sm:gap-y-16">
            {services.slice(3).map((service, index) => (
              <div key={index} className="flex justify-center">
                <ServiceCard 
                  {...service} 
                  onNavigate={handleNavigation} 
                  delay={(index + 3) * 150}
                />
              </div>
            ))}
          </div>

          <br /><br />
      </div>
    </div>
  );
};

export default ServicesSection;
