import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";

const solutions = [
  {
    title: "CWC bill payment",
    description: "On-time worker payouts ensure financial stability.",
  },
  {
    title: "Smart labor matching",
    description: "Helps subcontractors find the right talent fast.",
  },
  {
    title: "Transparent systems",
    description: "Enable fair pricing and better negotiations.",
  },
  {
    title: "AI-powered platform",
    description: "Built for modern workforce management.",
  },
  {
    title: "Streamlined operations",
    description: "Reduce friction, errors, and delays.",
  },
];

const problems = [
  {
    title: "Delayed Payments",
    description: "Subcontractors struggle to pay workers on time.",
  },
  {
    title: "Skilled Labor Shortage",
    description: "Hiring skilled labor when needed is difficult.",
  },
  {
    title: "Unfair Rates",
    description: "Fair rates are hard to secure without strong connections.",
  },
  {
    title: "Industry Challenges",
    description: "Low wages, job insecurity, and a shortage of skilled workers.",
  },
  {
    title: "Undervalued Sector",
    description: "Construction is often overlooked and undervalued.",
  },
];



const AboutUsSection = () => {
  useEffect(() => {
    // Add animation library
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@next/dist/aos.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.AOS.init({
        duration: 800,
        once: false,
      });
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Function to check the viewport width
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Check initially
    checkSize();
    // Add event listener on resize
    window.addEventListener('resize', checkSize);
    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkSize);
  }, []);



  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-100 to-white overflow-hidden">
      <div className="relative w-full h-[50vh] bg-green-600 overflow-hidden">
        <div className="absolute inset-0 bg-pattern bg-cover bg-center opacity-20"></div>

        <div className="absolute top-0 left-0 w-32 h-32 bg-green-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>



        {isDesktop ? (
          // Desktop version
          <div className="container h-full flex items-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 [text-shadow:_0_3px_5px_rgba(0,0,0,0.6)] pl-32">
                About Us
              </h1>
              <div className="w-32 h-2 bg-yellow-400 mb-10 rounded-full ml-32"></div>
              <div className="bg-white/85 border border-white backdrop-blur-[6px] p-6 rounded-r-lg shadow-xl shadow-2xl ring-1 ring-white/40">
                <p className="text-[30px] text-black drop-shadow-md">
                  GRYORK is transforming the infrastructure industry with innovative solutions to long-standing challenges.
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          // Mobile version
          <div className="container mx-auto h-full flex items-center px-4 sm:px-8 lg:px-16 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-slate-200 mb-6 [text-shadow:_0_3px_5px_rgba(0,0,0,0.6)]">
                About Us
              </h1>
              <div className="w-32 h-2 bg-yellow-400 mb-8 rounded-full"></div>
              <p className="text-xl md:text-2xl text-[#000] leading-relaxed ">
                GRYORK is transforming the infrastructure industry with innovative solutions to long-standing challenges.
              </p>
            </motion.div>
          </div>
        )}






        {/* Semi-transparent overlay for text readability extending below the wave */}
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-gray-100 opacity-90"></div>

        {/* Wave on top of semi-transparent overlay */}
        <div className="absolute bottom-0 left-0 w-full" style={{ transform: 'translateY(1px)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none">
            <path fill={isDesktop ? "#E6E8EC" : "#f3f4f6"} fillOpacity="1" d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,170.7C672,149,768,107,864,90.7C960,75,1056,85,1152,112C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Problem & Solution Section - Adjusted padding to ensure no overlap with wave */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-start gap-10">


          {/* Left Section: Problems */}

          <div className="w-full lg:w-1/2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-semibold mb-8 relative"
            >
              <span className="bg-clip-text text-transparent bg-red-500">
                🛠️ Problem
              </span>
              <div className="absolute -bottom-4 left-0 w-20 h-1 bg-red-400"></div>
            </motion.h3>
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 to-orange-400 blur-sm group-hover:blur opacity-0 group-hover:opacity-70 transition-all duration-300"></div>
                  <Card className="shadow-lg relative bg-white rounded-xl overflow-hidden border-0">
                    <CardContent className="p-6">
                      <h4 className="text-2xl font-semibold text-gray-800 mb-3">{problem.title}</h4>
                      <p className="text-gray-700 text-lg">{problem.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>


          {/* Right Section: Solutions */}

          <div className="w-full lg:w-1/2">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-semibold mb-8 relative"
            >
              <span className="bg-clip-text text-transparent bg-green-500">
                💡 GRYORK Solution
              </span>
              <div className="absolute -bottom-4 left-0 w-20 h-1 bg-green-400"></div>
            </motion.h3>
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-blue-400 blur-sm group-hover:blur opacity-0 group-hover:opacity-70 transition-all duration-300"></div>
                  <Card className="shadow-lg relative bg-white rounded-xl overflow-hidden border-0">
                    <CardContent className="p-6">
                      <h4 className="text-2xl font-semibold text-gray-800 mb-3">
                        {solution.title}
                      </h4>
                      <p className="text-gray-700 text-lg">{solution.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>




        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
