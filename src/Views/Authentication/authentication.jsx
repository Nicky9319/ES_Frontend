import React from "react";

export default function AuthPage() {
  const handleGoogleClick = () => {
    alert("Google Sign-In clicked! (Frontend-only UI)");
  };

  return (
    <>
      {/* 🌀 Inline Google Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
          body {
            font-family: 'Orbitron', sans-serif;
          }
        `}
      </style>
      {/* Background image and overlay */}
      <div className="min-h-screen flex items-center justify-center bg-[#292B35] relative">
        <img
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1500&q=80"
          alt="gaming bg"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#292B35]/90 via-[#292B35]/80 to-[#95C5C5]/10" />
        <div className="relative w-full max-w-md bg-[#292B35]/80 backdrop-blur-md p-10 rounded-2xl shadow-[0_0_30px_#95C5C5] text-center border border-[#95C5C5]/30">
          <h1 className="text-4xl font-bold mb-4 text-[#95C5C5] drop-shadow">ELOSphere Login</h1>
          <p className="text-[#E0E0E0] mb-8">Connect and conquer the arena.</p>
          <button
            onClick={handleGoogleClick}
            className="w-full flex items-center justify-center gap-4 px-6 py-3 bg-[#EE8631] border border-[#95C5C5] rounded-lg text-white hover:bg-[#AD662F] transition duration-300 font-semibold shadow"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Sign in with Google
          </button>
          <div className="my-8 flex items-center gap-2">
            <div className="flex-1 h-px bg-[#95C5C5]/30" />
            <span className="text-xs text-[#95C5C5]/60">or</span>
            <div className="flex-1 h-px bg-[#95C5C5]/30" />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-[#292B35]/80 border border-[#95C5C5]/20 text-[#E0E0E0] placeholder-[#E0E0E0]/50 focus:outline-none focus:border-[#EE8631] transition"
            disabled
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-[#292B35]/80 border border-[#95C5C5]/20 text-[#E0E0E0] placeholder-[#E0E0E0]/50 focus:outline-none focus:border-[#EE8631] transition"
            disabled
          />
          <button
            className="w-full px-6 py-3 rounded-lg bg-[#EE8631]/20 text-[#95C5C5] font-semibold border border-[#95C5C5]/40 cursor-not-allowed"
            disabled
          >
            Sign in (Coming Soon)
          </button>
          <p className="text-sm text-[#E0E0E0]/70 mt-6">
            No account? Just sign in to create one.
          </p>
        </div>
      </div>
    </>
  );
}