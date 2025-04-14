import React, { useState, useEffect, useMemo } from 'react';
import mentorProfile from './mentorprofile.json';

const MentorProfilePage = () => {
  const [mentor, setMentor] = useState(null);
  const [bannerError, setBannerError] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const transformedMentorData = useMemo(() => {
    const baseData = {
      ...mentorProfile,
      PROFILE_BANNER: bannerError ? 
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" : 
        mentorProfile.PROFILE_BANNER,
      PROFILE_PIC: profileError ? 
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" : 
        mentorProfile.PROFILE_PIC
    };

    const createdAt = new Date(baseData.CREATED_AT.$date);
    return {
      ...baseData,
      FORMATTED_DATE: createdAt.toLocaleDateString(),
      PRICE_FORMATTED: `$${baseData.PRICE_PER_SESSION}/hr`
    };
  }, [bannerError, profileError]);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setMentor(transformedMentorData);
      } catch (error) {
        console.error('Error loading mentor profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentorData();
  }, [transformedMentorData]);

  if (isLoading) {
    return (
      <div className="bg-[#292B35] min-h-screen flex items-center justify-center text-[#E0E0E0]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#EE8631] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#95C5C5]">Loading mentor profile...</p>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="bg-[#292B35] min-h-screen flex items-center justify-center text-[#E0E0E0]">
        <p className="text-[#95C5C5]">Error loading mentor profile.</p>
      </div>
    );
  }

  const {
    GAMES,
    PROFILE_BANNER,
    PROFILE_PIC,
    LOCATION,
    EXPERIENCE_YEARS,
    PRICE_PER_SESSION,
    PRICE_FORMATTED,
    SOCIAL_LINKS,
    BIO,
    MENTOR_ID,
    RATING,
    SESSIONS_COMPLETED,
    SUCCESS_RATE,
    SPECIALITIES,
    TAGLINE,
    VERIFIED,
    FORMATTED_DATE,
    LANGUAGES
  } = mentor;

  const statsData = [
    { label: 'Sessions', value: SESSIONS_COMPLETED, icon: '🎮' },
    { label: 'Experience', value: `${EXPERIENCE_YEARS}+ Years`, icon: '⚡' },
    { label: 'Success Rate', value: `${SUCCESS_RATE}%`, icon: '📈' },
    { label: 'Rate', value: PRICE_FORMATTED, icon: '💎' }
  ];

  return (
    <div className="bg-[#292B35] min-h-screen text-[#E0E0E0] font-sans">
      {/* Enhanced Banner Section */}
      <div className="relative h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-[#1a1b21]"
          style={{ 
            backgroundImage: `url(${bannerError ? 
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" : 
              PROFILE_BANNER
            })`,
            backgroundPosition: 'center 30%'
          }}
          onError={() => setBannerError(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#292B35]/30 via-[#292B35]/50 to-[#292B35] opacity-90"></div>
        </div>
        
        {/* Profile Stats Overlay with adjusted padding */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
          <div className="max-w-5xl mx-auto flex items-end gap-6">
            <div className="relative">
              <img
                src={PROFILE_PIC}
                alt="Profile"
                className="w-40 h-40 rounded-xl border-4 border-[#EE8631] shadow-lg object-cover transform hover:scale-105 transition-transform duration-300"
                onError={() => setProfileError(true)}
              />
              <div className="absolute -bottom-2 -right-2 bg-[#95C5C5] text-[#292B35] px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                ⭐ {RATING}
              </div>
            </div>
            
            <div className="flex-1 mb-4">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold text-[#E0E0E0] drop-shadow-lg">
                  ProMentor_{MENTOR_ID.slice(0, 6)}
                </h1>
                <span className={`px-4 py-1 rounded-full text-sm font-semibold shadow-lg ${
                  VERIFIED ? 'bg-[#EE8631] text-white' : 'bg-red-500 text-white'
                }`}>
                  {VERIFIED ? 'VERIFIED' : 'UNVERIFIED'}
                </span>
              </div>
              <p className="text-[#95C5C5] text-xl font-medium mb-2">
                {TAGLINE}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with increased top margin */}
      <div className="max-w-5xl mx-auto px-6 mt-24 relative z-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8">
          {statsData.map(stat => (
            <div key={stat.label} className="bg-[#292B35] p-4 rounded-xl border border-[#95C5C5]/20 hover:border-[#EE8631]/50 transition-colors">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-[#95C5C5] text-sm">{stat.label}</div>
              <div className="text-[#E0E0E0] font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
              <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                <span>📋</span> About
              </h2>
              <p className="text-[#E0E0E0]/90 leading-relaxed">{BIO}</p>
            </div>

            <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
              <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                <span>🎮</span> Games & Expertise
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-[#95C5C5] mb-2">Games</h3>
                  <div className="flex flex-wrap gap-2">
                    {GAMES.map(game => (
                      <span key={game} className="bg-[#EE8631]/10 text-[#EE8631] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#EE8631]/20 transition-colors cursor-pointer">
                        {game}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-[#95C5C5] mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALITIES.map(specialty => (
                      <span key={specialty} className="bg-[#95C5C5]/10 text-[#95C5C5] px-4 py-2 rounded-lg text-sm font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[#95C5C5] mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map(language => (
                      <span key={language} className="bg-[#95C5C5]/10 text-[#95C5C5] px-4 py-2 rounded-lg text-sm font-medium">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20 sticky top-4">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-[#EE8631]">{PRICE_FORMATTED}</div>
                <div className="text-[#95C5C5] text-sm">per session</div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-[#EE8631] to-[#AD662F] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 mb-4">
                Book a Session
              </button>
              
              <button className="w-full bg-[#292B35] text-[#95C5C5] py-3 rounded-lg font-semibold border border-[#95C5C5] hover:bg-[#95C5C5]/10 transition-colors">
                Message
              </button>
            </div>

            <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
              <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                <span>🌐</span> Connect
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(SOCIAL_LINKS).map(([platform, link]) => (
                  <a
                    key={platform}
                    href={`https://${link}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[#E0E0E0] hover:text-[#EE8631] transition-colors"
                  >
                    <span className="text-[#95C5C5]">
                      {platform === 'DISCORD' ? '💬' :
                      platform === 'TWITTER' ? '🐦' :
                      platform === 'YOUTUBE' ? '📺' :
                      platform === 'INSTAGRAM' ? '📸' :
                      platform === 'WEBSITE' ? '🔗' : '💼'}
                    </span>
                    <span>{platform.toLowerCase()}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfilePage;