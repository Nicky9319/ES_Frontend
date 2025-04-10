import React, { useState, useEffect } from 'react';
import useInView from '../../../hooks/useInView';
// Import images directly as modules
import buildingImage2 from '../../../Images/2BuildingImages.jpg';
import buildingImage from '../../../Images/BuildingImages.jpg';

const HeroSection = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className={`relative flex flex-col justify-center items-center overflow-hidden bg-cover bg-center w-full px-4 transition-opacity duration-1000 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${buildingImage2})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: dimensions.width <= 640 ? 'auto' : '85vh',
        minHeight: dimensions.width <= 640 ? '500px' : '600px',
      }}
    >
      <img
        src={buildingImage}
        alt="Background"
        className={`absolute top-0 left-0 w-full h-auto object-cover ${
          dimensions.width <= 640 ? 'block' : 'hidden'
        }`}
        style={{ visibility: 'hidden', position: 'absolute' }}
        onLoad={(e) => {
          const section = e.target.closest('section');
          if (dimensions.width <= 640) {
            section.style.height = `${e.target.offsetHeight}px`;
          }
        }}
      />
      <h1
        className={`font-bold text-[#4A4A4A] text-center mb-4 relative z-10 px-4 shadow-text transform transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } ${
          dimensions.width <= 640 ? 'text-5xl sm:text-6xl md:text-8xl absolute top-8' : 'text-7xl lg:text-9xl absolute top-10'
        }`}
      >
        Grow your work
      </h1>

      <div
        className={`relative z-10 flex shadow-md mt-auto transform transition-all duration-1000 delay-500 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } ${
          dimensions.width <= 640
            ? 'w-full max-w-[350px] mb-12'
            : 'w-2/3 md:w-2/5 max-w-[800px] justify-center mb-24'
        }`}
      >
        <div
          className={`flex-grow flex items-center border-none outline-none bg-gray-200 rounded-full placeholder-gray-500 text-gray-700 ${
            dimensions.width <= 640 ? 'py-2 px-3' : 'py-3 px-4'
          }`}
        >
          <input
            type="text"
            className="flex-grow bg-transparent outline-none placeholder-gray-500 text-gray-700 w-3/4 pl-4 sm:pl-6 md:pl-10"
            placeholder="enter your company name"
            style={{ fontSize: dimensions.width <= 640 ? '0.875rem' : '1.25rem' }}
          />
          <button
            className={`border-none rounded-full bg-[#268044] text-white cursor-pointer transition-colors duration-300 hover:bg-green-900 ${
              dimensions.width <= 640 ? 'py-1 px-3 text-sm md:text-base' : 'py-2 px-5 md:px-10 text-lg md:text-xl'
            }`}
          >
            submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
