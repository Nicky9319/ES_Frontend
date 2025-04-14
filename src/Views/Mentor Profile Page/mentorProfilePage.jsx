import React, { useState, useEffect, useMemo, useRef } from 'react';
import mentorProfile from './mentorprofile.json';

const MentorProfilePage = () => {
  const [mentor, setMentor] = useState(null);
  const [bannerError, setBannerError] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const profilePicInputRef = useRef(null);
  const bannerImageInputRef = useRef(null);

  const transformedMentorData = useMemo(() => {
    if (!mentorProfile) return null;

    const baseData = {
      ...mentorProfile,
      PROFILE_BANNER: bannerError
        ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
        : mentorProfile.PROFILE_BANNER,
      PROFILE_PIC: profileError
        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        : mentorProfile.PROFILE_PIC,
    };

    const createdAt = new Date(baseData.CREATED_AT.$date);
    return {
      ...baseData,
      FORMATTED_DATE: createdAt.toLocaleDateString(),
      PRICE_FORMATTED: `$${baseData.PRICE_PER_SESSION}/hr`,
    };
  }, [bannerError, profileError]);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (transformedMentorData) {
          setMentor(transformedMentorData);
          setEditedData(transformedMentorData);
        } else {
          throw new Error("Failed to transform mentor data");
        }
      } catch (error) {
        console.error("Error loading mentor profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentorData();
  }, [transformedMentorData]);

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedData((prev) => ({ ...prev, PROFILE_PIC: event.target.result }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error handling profile picture upload:", error);
    }
  };

  const handleBannerImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedData((prev) => ({ ...prev, PROFILE_BANNER: event.target.result }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error handling banner image upload:", error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMentor(editedData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleListChange = (field, index, value) => {
    const updatedList = [...editedData[field]];
    updatedList[index] = value;
    setEditedData((prev) => ({ ...prev, [field]: updatedList }));
  };

  const handleAddListItem = (field) => {
    setEditedData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const handleRemoveListItem = (field, index) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setEditedData((prev) => ({
      ...prev,
      SOCIAL_LINKS: { ...prev.SOCIAL_LINKS, [platform]: value },
    }));
  };

  if (isLoading && !mentor) {
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

  const displayData = isEditing ? editedData : mentor;

  const {
    GAMES,
    PROFILE_BANNER,
    PROFILE_PIC,
    LOCATION,
    EXPERIENCE_YEARS,
    PRICE_PER_SESSION,
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
    LANGUAGES,
    USER_NAME,
  } = displayData;

  const currentPriceFormatted = `$${displayData.PRICE_PER_SESSION}/hr`;

  const statsData = [
    { label: "Sessions", value: SESSIONS_COMPLETED, icon: "🎮", field: "SESSIONS_COMPLETED" },
    { label: "Experience", value: `${EXPERIENCE_YEARS}+ Years`, icon: "⚡", field: "EXPERIENCE_YEARS" },
    { label: "Success Rate", value: `${SUCCESS_RATE}%`, icon: "📈", field: "SUCCESS_RATE" },
    { label: "Rate", value: currentPriceFormatted, icon: "💎", field: "PRICE_PER_SESSION" },
  ];

  return (
    <div className="bg-[#292B35] min-h-screen text-[#E0E0E0] font-sans">
      <div className="fixed top-4 right-4 z-50">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleProfileUpdate}
              disabled={isLoading}
              className={`bg-[#95C5C5] text-[#292B35] px-4 py-2 rounded-lg font-semibold hover:bg-[#95C5C5]/80 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => {
                setEditedData(mentor);
                setIsEditing(false);
              }}
              disabled={isLoading}
              className="bg-[#EE8631]/20 text-[#EE8631] px-4 py-2 rounded-lg font-semibold hover:bg-[#EE8631]/30 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#EE8631] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#EE8631]/80 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center bg-[#1a1b21]"
          style={{
            backgroundImage: `url(${bannerError
              ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
              : PROFILE_BANNER})`,
            backgroundPosition: "center 30%",
          }}
          onError={() => setBannerError(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#292B35]/30 via-[#292B35]/50 to-[#292B35] opacity-90"></div>
        </div>

        {isEditing && (
          <div className="absolute top-16 right-4 z-10">
            <button
              onClick={() => bannerImageInputRef.current.click()}
              className="bg-[#292B35]/80 text-[#E0E0E0] p-2 rounded-lg hover:bg-[#292B35] transition-colors"
              aria-label="Change banner image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <input
              type="file"
              ref={bannerImageInputRef}
              onChange={handleBannerImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
          <div className="max-w-5xl mx-auto flex items-end gap-6">
            <div className="relative">
              <img
                src={PROFILE_PIC}
                alt="Profile"
                className="w-40 h-40 rounded-xl border-4 border-[#EE8631] shadow-lg object-cover transform hover:scale-105 transition-transform duration-300"
                onError={() => setProfileError(true)}
              />
              {isEditing && (
                <div className="absolute bottom-2 right-2">
                  <button
                    onClick={() => profilePicInputRef.current.click()}
                    className="bg-[#292B35]/80 text-[#E0E0E0] p-2 rounded-full hover:bg-[#292B35] transition-colors"
                    aria-label="Change profile picture"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <input
                    type="file"
                    ref={profilePicInputRef}
                    onChange={handleProfilePicUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-[#95C5C5] text-[#292B35] px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                ⭐ {RATING}
              </div>
            </div>

            <div className="flex-1 mb-4">
              <div className="flex items-center gap-4 mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={USER_NAME}
                    onChange={(e) => handleInputChange("USER_NAME", e.target.value)}
                    className="text-4xl font-bold text-[#E0E0E0] bg-transparent border-b border-[#95C5C5]/50 focus:outline-none focus:border-[#EE8631] px-1 py-0 leading-tight"
                    placeholder="Username"
                  />
                ) : (
                  <h1 className="text-4xl font-bold text-[#E0E0E0] drop-shadow-lg">{USER_NAME}</h1>
                )}
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold shadow-lg ${
                    VERIFIED ? "bg-[#EE8631] text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {VERIFIED ? "VERIFIED" : "UNVERIFIED"}
                </span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={TAGLINE}
                  onChange={(e) => handleInputChange("TAGLINE", e.target.value)}
                  className="w-full text-[#95C5C5] text-xl font-medium bg-transparent border-b border-[#95C5C5]/50 focus:outline-none focus:border-[#EE8631] px-1 py-0 leading-tight mb-2"
                  placeholder="Your Tagline"
                />
              ) : (
                <p className="text-[#95C5C5] text-xl font-medium mb-2">{TAGLINE}</p>
              )}
              <div className="flex items-center text-[#E0E0E0]/80 text-sm mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {isEditing ? (
                  <input
                    type="text"
                    value={LOCATION}
                    onChange={(e) => handleInputChange("LOCATION", e.target.value)}
                    className="bg-transparent border-b border-[#95C5C5]/50 focus:outline-none focus:border-[#EE8631] px-1 text-sm"
                    placeholder="Location"
                  />
                ) : (
                  LOCATION
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-24 relative z-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#292B35] p-4 rounded-xl border border-[#95C5C5]/20 hover:border-[#EE8631]/50 transition-colors"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-[#95C5C5] text-sm">{stat.label}</div>
              {isEditing && (stat.field === "EXPERIENCE_YEARS" || stat.field === "PRICE_PER_SESSION" || stat.field === "SESSIONS_COMPLETED" || stat.field === "SUCCESS_RATE") ? (
                <input
                  type="number"
                  value={displayData[stat.field]}
                  onChange={(e) => handleInputChange(stat.field, parseInt(e.target.value) || 0)}
                  className="w-full bg-[#292B35] text-[#E0E0E0] font-bold border border-[#95C5C5]/20 rounded p-1 focus:outline-none focus:border-[#EE8631] mt-1"
                  min="0"
                  step={stat.field === "SUCCESS_RATE" ? "1" : stat.field === "PRICE_PER_SESSION" ? "10" : "1"}
                />
              ) : (
                <div className="text-[#E0E0E0] font-bold">{stat.value}</div>
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
              <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                <span>📋</span> About
              </h2>
              {isEditing ? (
                <textarea
                  value={BIO}
                  onChange={(e) => handleInputChange("BIO", e.target.value)}
                  className="w-full bg-[#292B35] text-[#E0E0E0]/90 leading-relaxed border border-[#95C5C5]/20 rounded p-2 focus:outline-none focus:border-[#EE8631] min-h-[120px]"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-[#E0E0E0]/90 leading-relaxed">{BIO}</p>
              )}
            </div>

            <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
              <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                <span>🎮</span> Games & Expertise
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[#95C5C5]">Games</h3>
                    {isEditing && (
                      <button
                        onClick={() => handleAddListItem("GAMES")}
                        className="text-xs bg-[#95C5C5]/10 text-[#95C5C5] px-2 py-1 rounded hover:bg-[#95C5C5]/20"
                      >
                        +
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {GAMES.map((game, index) => (
                      <div
                        key={index}
                        className="relative group bg-[#EE8631]/10 text-[#EE8631] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#EE8631]/20 transition-colors cursor-pointer"
                      >
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={game}
                              onChange={(e) => handleListChange("GAMES", index, e.target.value)}
                              className="bg-transparent border-none focus:outline-none w-24 text-[#EE8631]"
                              placeholder="Game Name"
                            />
                            <button
                              onClick={() => handleRemoveListItem("GAMES", index)}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          game
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[#95C5C5]">Specialties</h3>
                    {isEditing && (
                      <button
                        onClick={() => handleAddListItem("SPECIALITIES")}
                        className="text-xs bg-[#95C5C5]/10 text-[#95C5C5] px-2 py-1 rounded hover:bg-[#95C5C5]/20"
                      >
                        +
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALITIES.map((specialty, index) => (
                      <div key={index} className="relative group bg-[#95C5C5]/10 text-[#95C5C5] px-4 py-2 rounded-lg text-sm font-medium">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={specialty}
                              onChange={(e) => handleListChange("SPECIALITIES", index, e.target.value)}
                              className="bg-transparent border-none focus:outline-none w-24 text-[#95C5C5]"
                              placeholder="Specialty"
                            />
                            <button
                              onClick={() => handleRemoveListItem("SPECIALITIES", index)}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          specialty
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[#95C5C5]">Languages</h3>
                    {isEditing && (
                      <button
                        onClick={() => handleAddListItem("LANGUAGES")}
                        className="text-xs bg-[#95C5C5]/10 text-[#95C5C5] px-2 py-1 rounded hover:bg-[#95C5C5]/20"
                      >
                        +
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((language, index) => (
                      <div key={index} className="relative group bg-[#95C5C5]/10 text-[#95C5C5] px-4 py-2 rounded-lg text-sm font-medium">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={language}
                              onChange={(e) => handleListChange("LANGUAGES", index, e.target.value)}
                              className="bg-transparent border-none focus:outline-none w-20 text-[#95C5C5]"
                              placeholder="Language"
                            />
                            <button
                              onClick={() => handleRemoveListItem("LANGUAGES", index)}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          language
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20 sticky top-4">
              <div className="text-center mb-6">
                {isEditing ? (
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-[#EE8631]">$</span>
                    <input
                      type="number"
                      value={PRICE_PER_SESSION}
                      onChange={(e) => handleInputChange("PRICE_PER_SESSION", parseInt(e.target.value) || 0)}
                      className="w-20 bg-[#292B35] text-2xl font-bold text-[#EE8631] border border-[#95C5C5]/20 rounded p-1 focus:outline-none focus:border-[#EE8631] text-center"
                      min="0"
                      step="10"
                    />
                    <span className="text-2xl font-bold text-[#EE8631]">/hr</span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-[#EE8631]">{currentPriceFormatted}</div>
                )}
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
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(SOCIAL_LINKS).map(([platform, link]) => (
                  <div key={platform} className="flex items-center gap-2">
                    <span className="text-[#95C5C5] w-6 text-center">
                      {platform === "DISCORD"
                        ? "💬"
                        : platform === "TWITTER"
                        ? "🐦"
                        : platform === "YOUTUBE"
                        ? "📺"
                        : platform === "INSTAGRAM"
                        ? "📸"
                        : platform === "LINKEDIN"
                        ? "💼"
                        : platform === "WEBSITE"
                        ? "🔗"
                        : "🔗"}
                    </span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={link}
                        onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                        className="flex-1 bg-[#292B35] text-[#E0E0E0] border-b border-[#95C5C5]/20 focus:outline-none focus:border-[#EE8631] text-sm px-1"
                        placeholder={`${platform.toLowerCase()} link or handle`}
                      />
                    ) : (
                      <a
                        href={link.startsWith("http") ? link : `https://${link}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-[#E0E0E0] hover:text-[#EE8631] transition-colors truncate text-sm"
                      >
                        {link || `${platform.toLowerCase()}`}
                      </a>
                    )}
                  </div>
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