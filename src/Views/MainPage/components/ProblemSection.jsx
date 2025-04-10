import React, { useState, useEffect } from 'react';
import useInView from '../../../hooks/useInView';

// Define keyframes animation styles outside of component
const floatingKeyframes = `
  @keyframes floatLeft {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-15px, -25px) rotate(-2deg); }
    50% { transform: translate(0, -40px) rotate(0deg); }
    75% { transform: translate(15px, -25px) rotate(2deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
  
  @keyframes floatRight {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(15px, -30px) rotate(2deg); }
    50% { transform: translate(0, -45px) rotate(0deg); }
    75% { transform: translate(-15px, -30px) rotate(-2deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
`;

const ProblemSection = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Animation triggers when section comes into view
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const { ref: textRef, isInView: textInView } = useInView({ threshold: 0.2 }, 200);
  
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

  const getCircleDimensions = (side) => {
    const size = dimensions.width < 640 ? 120 : dimensions.width < 1024 ? 250 : 350;
    
    if (side === 'left') {
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: dimensions.width < 640 ? '-60px' : '-120px',
        top: dimensions.width < 640 ? '30px' : '40px',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'scale(1)' : 'scale(0.5)',
        transition: 'opacity 0.8s ease-out, transform 1s ease-out',
        animation: isInView ? 'floatLeft 10s ease-in-out infinite' : 'none',
      };
    } else {
      return {
        width: `${size}px`,
        height: `${size}px`,
        right: dimensions.width < 640 ? '-60px' : '-120px',
        bottom: dimensions.width < 640 ? '-60px' : '-120px',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'scale(1)' : 'scale(0.5)',
        transition: 'opacity 0.8s ease-out, transform 1s ease-out',
        animation: isInView ? 'floatRight 12s ease-in-out infinite' : 'none',
      };
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: floatingKeyframes }} />
      <section 
        ref={sectionRef}
        className="bg-[#20282B] text-white py-16 sm:py-20 px-4 sm:px-5 relative text-center min-h-[500px] sm:min-h-[600px] md:min-h-[800px] flex justify-center items-center"
      >
          <div className="absolute bg-[#268044] rounded-full z-0"
            style={getCircleDimensions('left')}>
          </div>
          
          <div 
            ref={textRef}
            className="max-w-[100%]  relative z-10 flex flex-col justify-center items-center space-y-6 sm:space-y-8 md:space-y-12 sm:px-6"
          >
            <h2 
              className="text-[45px] md:text-[100px] sm:text-6xl md:text-8xl leading-tight"
              style={{
                opacity: textInView ? 1 : 0,
                transform: textInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.8s ease-out',
                transitionDelay: '0.2s'
              }}
            >
              <strong>pending bills?</strong>
            </h2>
            <h2 
              className="text-[42px] sm:text-5xl md:text-[100px] leading-tight text-[#268044] font-bold"
              style={{
                opacity: textInView ? 1 : 0,
                transform: textInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.8s ease-out',
                transitionDelay: '0.4s'
              }}
            >
              <strong>unpaid workers?</strong>
            </h2>
            <h2 
              className="text-[45px] sm:text-5xl md:text-[100px] leading-tight"
              style={{
                opacity: textInView ? 1 : 0,
                transform: textInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.8s ease-out',
                transitionDelay: '0.6s'
              }}
            >
              <strong>delayed work?</strong>
            </h2>
          </div>
          
          {/* Right Circle */}
          <div className="absolute right-0 bottom-0 z-0">
            <div className="relative bg-[#268044] rounded-full"
              style={getCircleDimensions('right')}>
            </div>
          </div>
      </section>
    </>
  );
};

export default ProblemSection;
