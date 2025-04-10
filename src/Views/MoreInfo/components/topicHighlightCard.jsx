import React from "react";
// Import images directly as modules
import hillIcon from '../../../Images/hill.svg';
import barsIcon from '../../../Images/bars.svg';

const TopicHighlightCard = () => {
  return (
    <div className="relative w-full h-screen bg-white">
      {/* Back button */}
      <button className="absolute top-4 left-4 text-black text-2xl">←</button>

      {/* Text Header */}
      {/* <div className="text-center mt-20 px-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          CWC (Credit on Working Capital) by <br className="md:hidden" />
          Gryork – AI-Powered Smart Financing
        </h1>
      </div> */}

    <div className="absolute bottom-0 left-0 w-full h-2/3">
        <img src={hillIcon} alt="" className="w-full object-cover" />
    </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-32 h-32 md:w-40 md:h-40">
        <img
          src={barsIcon}
          alt="illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default TopicHighlightCard;
