import React from 'react';
import useInView from '../../../hooks/useInView';
// Import images directly as modules
import flashIcon from '../../../Images/flash.svg';
import bankIcon from '../../../Images/bank.svg';
import verifiedIcon from '../../../Images/verified.svg';

// Reusable FeatureCard component
const FeatureCard = ({ icon, title, description, index }) => {
  const { ref, isInView } = useInView({}, index * 200);

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-xl p-6 sm:p-8 md:p-12 text-center flex-1 shadow-lg transition-all duration-700 transform ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      } hover:-translate-y-2 w-full mb-8 md:mb-0`}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-4 sm:mb-6 md:mb-8 flex justify-center items-center">
        <img src={icon} alt={title} className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28" />
      </div>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 text-black">{title}</h3>
      <p className="text-base sm:text-lg leading-relaxed text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: flashIcon,
      title: 'SPEED',
      description: 'Get credit in a day with full transparency',
    },
    {
      icon: bankIcon,
      title: 'Backed by',
      description: 'NBFC & Bank collaborations and automation',
    },
    {
      icon: verifiedIcon,
      title: 'Reliable',
      description: 'Repayments secured with automatic deductions',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 md:gap-10 lg:gap-20 py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-16 max-w-[1600px] mx-auto">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          index={index}
          {...feature}
        />
      ))}
    </div>
  );
};

export default FeaturesSection;
