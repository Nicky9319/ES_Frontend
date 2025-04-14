import React from 'react';

const FAQItem = ({ faq, index, isExpanded, toggleExpand }) => {
  return (
    <div className="bg-[#292B35] border border-[#95C5C5]/30 rounded-lg overflow-hidden">
      <button 
        className="w-full flex items-center justify-between p-4 text-left text-[#EE8631] font-bold hover:bg-[#292B35]/80 transition-colors duration-300"
        onClick={() => toggleExpand(index)}
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <span>{faq.QUESTION}</span>
        </div>
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-[#292B35]/30 border-t border-[#95C5C5]/10">
          <div className="flex items-start space-x-3">
            <div className="bg-[#95C5C5] p-2 rounded-full flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-[#292B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[#E0E0E0]">{faq.ANSWER}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
