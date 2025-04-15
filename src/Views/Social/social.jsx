import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSlider from '../components/rightSlider';
import LeftSlider from '../components/leftSlider';

// Simulated API call returning news data based on search query
function simulateNewsAPICall(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const articles = [
        { title: `Latest update on ${query} #1`, description: `Detailed insights about ${query} in today’s news.`, link: 'https://example.com/news1' },
        { title: `Breaking: ${query} Story`, description: `Exclusive report covering ${query} developments.`, link: 'https://example.com/news2' },
        { title: `${query} - Exclusive Insights`, description: `In-depth analysis and breakdown of ${query}.`, link: 'https://example.com/news3' }
      ];
      resolve(articles);
    }, 1000);
  });
}

function Social() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [newsArticles, setNewsArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    const articles = await simulateNewsAPICall(searchQuery);
    setNewsArticles(articles);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#292B35] to-[#2A2C36] text-[#E0E0E0]">
      <LeftSlider/>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Esports News</h1>
        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#292B35] border border-[#3A3D4A] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#95C5C5] transition-colors placeholder-[#6b7280]"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#EE8631] text-white px-3 py-2 rounded-lg hover:bg-[#AD662F] transition-colors"
          >
            Search
          </button>
        </div>
        {/* News Display */}
        {isLoading ? (
          <div className="text-center text-lg">Loading news...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.length > 0 ? newsArticles.map((news, idx) => (
              <div key={idx} className="rounded-lg shadow-lg overflow-hidden bg-[#2F3140] border border-[#3A3D4A] transform transition-all duration-300 hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-[#E0E0E0]">{news.title}</h3>
                  <p className="text-sm text-[#95C5C5] mb-4">{news.description}</p>
                  <a 
                    href={news.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block px-4 py-2 rounded-lg text-white bg-[#EE8631] hover:bg-[#AD662F] transition-colors"
                  >
                    Read More
                  </a>
                </div>
              </div>
            )) : (
              <div className="text-center text-lg">No news to display. Enter a query above.</div>
            )}
          </div>
        )}
      </div>
      <RightSlider />
    </div>
  );
}

export default Social;
