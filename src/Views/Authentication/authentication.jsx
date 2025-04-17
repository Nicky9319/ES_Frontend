import React from "react";

export default function AuthPage() {
  const handleGoogleClick = () => {
    alert("Google Sign-In clicked!");
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          body {
            font-family: 'Space Grotesk', sans-serif;
          }
        `}
      </style>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[900px] overflow-hidden rounded-lg opacity-20">
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1500&q=80"
            alt="gaming bg"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>

        <div className="relative w-full max-w-md bg-slate-800/50 backdrop-blur-sm p-10 rounded-xl shadow-lg text-center border border-slate-600/30">
          <h1 className="text-4xl font-bold mb-4 text-slate-200 tracking-wider">
            ELOSphere
          </h1>
          <p className="text-slate-400 mb-8 tracking-wide text-lg">
            Your Gateway to Competitive Gaming Excellence
          </p>

          <button
            onClick={handleGoogleClick}
            className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 hover:bg-slate-600 transition-all duration-300 font-medium tracking-wide"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6 bg-white rounded-full"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
}
