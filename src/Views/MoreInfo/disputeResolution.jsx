import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DisputeResolution = () => {
  useEffect(() => {
    // Add animation library if needed
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@next/dist/aos.js';
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      window.AOS.init({
        duration: 800,
        once: false,
      });
    };
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  // Updated animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const [isDesktop, setIsDesktop] = useState(false);
  
    useEffect(() => {
      // Function to check the viewport width
      const checkSize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };
  
      // Check initially
      checkSize();
      // Add event listener on resize
      window.addEventListener('resize', checkSize);
      // Cleanup listener on unmount
      return () => window.removeEventListener('resize', checkSize);
    }, []);

  
  return (
    <div className="w-full bg-gradient-to-b from-gray-100 to-white overflow-hidden">
      {/* Hero Section - Full Width */}
      <div className="relative w-full h-[60vh] bg-green-600 overflow-hidden">
        {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f')] bg-cover bg-center opacity-20"></div> */}
        <div className="absolute inset-0 bg-pattern bg-cover bg-center opacity-20"></div>

        
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        


               {isDesktop ? (
                  // Desktop version
                  <div className="container h-full flex items-center relative z-10">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={fadeIn}
                      className="max-w-3xl"
                    >
                      <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 [text-shadow:_0_3px_5px_rgba(0,0,0,0.6)] pl-32">
                      Dispute Resolution
                      </h1>
                      <div className="w-32 h-2 bg-yellow-400 mb-10 rounded-full ml-32"></div>
                      <div className="bg-white/85 border border-white backdrop-blur-[6px] p-6 rounded-r-lg shadow-xl shadow-2xl ring-1 ring-white/40">
                        <p className="text-[20px] text-black drop-shadow-md">
                        At GRYORK, we believe in fair and accessible justice for
                      everyone in the industry, with faster resolutions and lower costs than traditional legal processes.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  // Mobile version
                  <div className="container mx-auto h-full flex items-center px-4 sm:px-8 lg:px-16 relative z-10">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={fadeIn}
                      className="max-w-3xl"
                    >
                      <h1 className="text-5xl md:text-7xl font-bold text-slate-200 mb-6 [text-shadow:_0_3px_5px_rgba(0,0,0,0.6)]">
                      Dispute Resolution
                      </h1>
                      <div className="w-32 h-2 bg-yellow-400 mb-8 rounded-full"></div>
                      <p className="text-xl md:text-2xl text-[#000] leading-relaxed ">
                      At GRYORK, we believe in fair and accessible justice for
                      everyone in the industry, with faster resolutions and lower costs than traditional legal processes.
                      </p>
                    </motion.div>
                  </div>
                )}


        
        {/* Semi-transparent overlay for text readability extending below the wave */}
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-gray-100 opacity-90"></div>
        
        {/* Wave on top of semi-transparent overlay */}
        <div className="absolute bottom-0 left-0 w-full" style={{ transform: 'translateY(1px)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none">
            <path fill={isDesktop ? "#E6E8EC" : "#f3f4f6"} fillOpacity="1" d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,170.7C672,149,768,107,864,90.7C960,75,1056,85,1152,112C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Quote Section with proper spacing */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10 pt-16 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-purple-500"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-0">
            <div className="text-purple-500 sm:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 italic font-medium text-center sm:text-left">
              "Whether you're a subcontractor, worker, or industry professional, you can
              resolve conflicts efficiently and fairly—all within a trusted digital platform designed to
              protect your rights and bring you peace of mind."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Benefits Grid - Colorful Cards - Increased padding to create more space between sections */}
      <div className="w-full pt-32 md:pt-20 pb-20 px-4 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center relative">
            <span className="bg-clip-text text-transparent bg-green-500">Key Benefits</span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fair Justice",
                description: "At GRYORK, we ensure fair and accessible justice for all.",
                icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 a12.078 12.078 0 01.665-6.479L12 14z",
                color: "from-green-400 to-green-600",
                delay: 0
              },
              {
                title: "Strategic Partnership",
                description: "Partnered with e-Courts for quick, affordable resolutions.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                color: "from-green-400 to-green-600",
                delay: 0.1
              },
              {
                title: "Cost-Effective",
                description: "Hassle-free process – no need for expensive legal help.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "from-green-400 to-green-600",
                delay: 0.2
              },
              {
                title: "For Everyone",
                description: "Ideal for subcontractors and workers facing disputes.",
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                color: "from-green-400 to-green-600",
                delay: 0.3
              },
              {
                title: "Digital Justice",
                description: "Justice, simplified and digital.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                color: "from-green-400 to-green-600",
                delay: 0.4
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: benefit.delay * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${benefit.color} blur-sm group-hover:blur opacity-70 group-hover:opacity-100 transition-all duration-300`}></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full flex flex-col">
                  <div className={`bg-gradient-to-r ${benefit.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


      
    </div>
  );
};

export default DisputeResolution;
