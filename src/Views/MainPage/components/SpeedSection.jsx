import React from 'react';
import useInView from '../../../hooks/useInView';
// Import the image directly as a module
import bankingIcon from '../../../Images/banking.svg';

const SpeedSection = () => {
  const { ref, isInView } = useInView({}, 200);

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between max-w-[1400px] mx-auto py-10 md:py-16 px-4 gap-8 md:gap-16">
        <div className="w-full md:flex-[1.2]">
          {/* Mobile layout - heading and image side by side */}
          <div className="flex flex-row items-center gap-4 mb-6 md:hidden">
            <h2 className="text-3xl font-bold text-[#268044] leading-tight flex-1">
              Speed, transparency, and reliability you can trust
            </h2>
            <div className="w-1/2">
              <img
                src={bankingIcon}
                alt="Banking"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Desktop heading */}
          <h2 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#268044] mb-6 md:mb-8 leading-tight">
            Speed, transparency, and reliability you can trust
          </h2>

          {/* Points in boxes with animations */}
          <div className="grid grid-cols-1 gap-4" ref={ref}>
            {[
              'CWC funds disbursed in days',
              'AI-driven automation from approvals to repayment',
              'Transparent processes to eliminate headaches'
            ].map((item, index) => (
              <div
                key={index}
                className={`transform transition-all duration-300 ease-in-out 
                  p-4 rounded-lg border-2 border-[#268044] bg-white shadow-md 
                  hover:shadow-lg hover:scale-[1.02] hover:bg-[#f0f9f2]
                  ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                  `}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#268044] text-xl font-bold">✓</span>
                  <p className="text-lg">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop image */}
        <div className="hidden md:flex flex-1 justify-center md:justify-end">
          <div className="relative">
            <div className="feature-icon-bank">
              <img
                src={bankingIcon}
                alt="Banking"
                className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[530px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <br /><br />
    </>
  );
};

export default SpeedSection;
