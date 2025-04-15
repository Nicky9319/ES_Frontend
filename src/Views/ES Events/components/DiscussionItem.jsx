import React from 'react';

const DiscussionItem = ({ discussion, index }) => {
  return (
    <div className="bg-[#292B35] p-4 rounded-lg border border-[#95C5C5]/30">
      <div className="flex items-start">
        <div className="bg-[#EE8631] p-2 rounded-full mr-3 mt-1">
          <span className="text-white font-bold text-sm">{index + 1}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[#EE8631] font-bold">{discussion.QUESTION}</h3>
            <span className="text-[#95C5C5]/70 text-xs">2 days ago</span>
          </div>
          <div className="bg-[#E0E0E0]/10 p-3 rounded-lg">
            <p className="text-[#E0E0E0]">{discussion.ANSWER}</p>
          </div>
          <div className="mt-2 flex justify-end gap-3">
            <button className="text-sm text-[#95C5C5]/70 hover:text-[#95C5C5] transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
              </svg>
              Like
            </button>
            <button className="text-sm text-[#95C5C5]/70 hover:text-[#95C5C5] transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
              </svg>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionItem;
