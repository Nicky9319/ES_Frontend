import React, { useState, useEffect } from 'react';
// Import the image directly as a module
import laptopIcon from '../../../Images/laptop.svg';

const AIPoweredSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="flex flex-col px-4 py-12 sm:px-6 lg:px-16 xl:px-24 lg:py-16 bg-gray-50">
      {windowWidth <= 640 ? (
        <>
          <div className="flex flex-row justify-between items-center mb-8">
            <h1 className="font-bold text-gray-800 text-2xl leading-tight mr-4 w-3/5">
              AI-Powered Financing &amp; Workforce Management for the Infrastructure Industry
            </h1>
            <div className="relative flex justify-center w-2/5">
              <div
                className="absolute bg-[#268044] rounded-full z-10"
                style={{
                  width: '28vw',
                  height: '28vw',
                  top: '55%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              ></div>
              <div className="relative z-20 max-w-[50vw]">
                <svg className="w-full h-auto" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                  <image
                    href={laptopIcon}
                    alt="Laptop illustration"
                    x="-190"
                    y="-50"
                    width="200%"
                    height="140%"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="leading-relaxed text-gray-700 mb-6 text-base">
              Empowering subcontractors with smart credit solutions, real-time payments, and seamless workflow management.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="bg-[#268044] text-white px-6 py-2.5 rounded-[18px] font-semibold cursor-pointer text-center transition-all duration-300 hover:bg-[#1e6a36] shadow-md shadow-gray-500/50 text-base"
              >
                Get started
              </a>
              <a
                href="/cwc"
                className="bg-white text-gray-800 px-6 py-2.5 rounded-[18px] font-semibold border border-gray-300 cursor-pointer text-center transition-all duration-300 hover:bg-gray-200 shadow-md shadow-gray-500/50 text-base"
              >
                Learn more
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-8">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left md:pl-0 lg:pl-8">
            <h1 className="font-bold text-gray-800 mb-4 leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              AI-Powered<br />
              Financing &amp; Workforce Management for the Infrastructure Industry
            </h1>

            <div className="w-full text-center md:text-left mt-6">
              <p className="leading-relaxed text-gray-700 mb-6 text-lg md:text-xl">
                Empowering subcontractors with smart credit solutions, real-time payments, and seamless workflow management.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="#"
                  className="bg-[#268044] text-white px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-[18px] font-semibold cursor-pointer text-center transition-all duration-300 hover:bg-[#1e6a36] shadow-md shadow-gray-500/50 text-base md:text-lg"
                >
                  Get started
                </a>
                <a
                  href="/cwc  "
                  className="bg-white text-gray-800 px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-[18px] font-semibold border border-gray-300 cursor-pointer text-center transition-all duration-300 hover:bg-gray-200 shadow-md shadow-gray-500/50 text-base md:text-lg"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 flex justify-center">
            <div
              className="absolute bg-[#268044] rounded-full z-10"
              style={{
                width: windowWidth < 768 ? '300px' : '400px',
                height: windowWidth < 768 ? '300px' : '400px',
                maxWidth: '90%',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            ></div>
            <div className="relative z-20" style={{ 
              width: windowWidth < 768 ? '350px' : '500px', 
              height: windowWidth < 768 ? '350px' : '500px',
              maxWidth: '95%' 
            }}>
              <svg className="w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <image
                  href={laptopIcon}
                  alt="Laptop illustration"
                  x="-200"
                  y="-100"
                  width="200%"
                  height="150%"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AIPoweredSection;
