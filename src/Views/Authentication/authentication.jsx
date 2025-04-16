import React from "react";

export default function AuthPage() {
  const handleGoogleClick = () => {
    alert("Google Sign-In clicked!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Sign in attempted! (Frontend-only UI)");
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Quantico:wght@400;700&display=swap');
          body {
            font-family: 'Quantico', sans-serif;
          }
        `}
      </style>
      <div className="min-h-screen flex items-center justify-center bg-[#292B35] relative">
        <img
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1500&q=80"
          alt="gaming bg"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#292B35]/90 via-[#292B35]/80 to-[#95C5C5]/10" />
        
        <div className="relative w-full max-w-md bg-[#292B35]/90 backdrop-blur-md p-10 rounded-2xl shadow-[0_0_30px_#95C5C5] text-center border border-[#95C5C5]/30">
          <h1 className="text-4xl font-bold mb-4 text-[#95C5C5] drop-shadow tracking-wider">ELOSphere</h1>
          <p className="text-[#95C5C5] mb-8 tracking-wide text-lg">
            Your Gateway to Competitive Gaming Excellence
          </p>
          
          <button
            onClick={handleGoogleClick}
            className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-[#EE8631] border-none rounded-lg text-white hover:bg-[#AD662F] transition-all duration-300 font-semibold tracking-wide shadow-lg hover:shadow-[#EE8631]/20 hover:shadow-xl"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6 bg-white rounded-full"
            />
            Sign in with Google
          </button>

          <div className="my-8 flex items-center gap-2">
            <div className="flex-1 h-px bg-[#95C5C5]/30" />
            <span className="text-xs text-[#95C5C5]/60 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#95C5C5]/30" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-4 rounded-lg bg-[#1D1E24] border border-[#95C5C5]/20 text-[#E0E0E0] placeholder-[#95C5C5]/50 focus:outline-none focus:border-[#EE8631] focus:ring-1 focus:ring-[#EE8631] transition-all duration-300"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-4 rounded-lg bg-[#1D1E24] border border-[#95C5C5]/20 text-[#E0E0E0] placeholder-[#95C5C5]/50 focus:outline-none focus:border-[#EE8631] focus:ring-1 focus:ring-[#EE8631] transition-all duration-300"
            />
            <button
              type="submit"
              className="w-full px-6 py-4 rounded-lg bg-[#EE8631] text-white font-semibold tracking-wide hover:bg-[#AD662F] transition-all duration-300 shadow-lg hover:shadow-[#EE8631]/20 hover:shadow-xl"
            >
              Sign in
            </button>
          </form>

          <p className="text-sm text-[#95C5C5] mt-6 tracking-wide">
            Don't have an account? <span className="text-[#EE8631] hover:text-[#AD662F] cursor-pointer transition-colors">Create one here</span>
          </p>
        </div>
      </div>
    </>
  );
}