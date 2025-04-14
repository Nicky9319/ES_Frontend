import React from 'react';

const SectionHeader = ({ title }) => {
  return (
    <h2 className="text-3xl font-bold text-[#95C5C5] mb-6 border-b border-[#95C5C5]/20 pb-4">
      {title}
    </h2>
  );
};

export default SectionHeader;
