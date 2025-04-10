import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Users, Truck, DollarSign, ShieldCheck, Briefcase, Link2 } from "lucide-react";

const features = [
  {
    icon: <Users className="w-6 h-6 text-green-600" />,
    title: "AI–Driven workforce management",
    description: "Streamline operations with intelligent tools that simplify hiring, deployment, and tracking.",
  },
  {
    icon: <Truck className="w-6 h-6 text-green-600" />,
    title: "On–Demand hiring",
    description: "Access skilled labor exactly when you need it – faster, smarter, and hassle-free.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-green-600" />,
    title: "Timely & Transparent payments",
    description: "Ensure every worker is paid on time with fair and transparent payment systems.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    title: "Fair wage assurance",
    description: "We advocate for equitable pay, eliminating the issue of low wages in the sector.",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-green-600" />,
    title: "Job security for workers",
    description: "We’re building trust and stability with consistent opportunities and structured workflows.",
  },
  {
    icon: <Link2 className="w-6 h-6 text-green-600" />,
    title: "Solving the skilled labour shortage",
    description: "Connecting contractors with verified, skilled professionals to bridge the talent gap.",
  },
];

export default function GryorkExplanation() {
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
    <div className="w-full bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] bg-green-600 overflow-hidden">
        {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f')] bg-cover bg-center opacity-20"></div> */}
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
                GRYORK Explained
              </h1>
              <div className="w-32 h-2 bg-yellow-400 mb-10 rounded-full ml-32"></div>
              <div className="bg-white/85 border border-white backdrop-blur-[6px] p-6 rounded-r-lg shadow-xl shadow-2xl ring-1 ring-white/40">
                <p className="text-[20px] text-black drop-shadow-md">
                  GRYORK is an AI-powered technology platform transforming the infrastructure industry with smart, seamless solutions.
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
                GRYORK Explained
              </h1>
              <div className="w-32 h-2 bg-yellow-400 mb-8 rounded-full"></div>
              <p className="text-xl md:text-2xl text-[#000] leading-relaxed ">
                GRYORK is an AI-powered technology platform transforming the infrastructure industry with smart, seamless solutions.
              </p>
            </motion.div>
          </div>
        )}




        {/* Semi-transparent overlay for text readability extending below the wave */}
        <div className="absolute left-0 right-0 botto</div>m-0 h-32 bg-gradient-to-b from-transparent to-gray-100 opacity-90"></div>

        {/* Wave on top of semi-transparent overlay </svg>*/}
        <div className="absolute bottom-0 left-0 w-full" style={{ transform: 'translateY(1px)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none">
            <path fill={isDesktop ? "#E6E8EC" : "#f3f4f6"} fillOpacity="1" d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,170.7C672,149,768,107,864,90.7C960,75,1056,85,1152,112C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative inline-block">
            <span className="text-green-600">How We Make It Happen</span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-400"></div>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Here's how we make it happen with innovative solutions and cutting-edge technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
              whileHover={{ scale: 1.03 }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-blue-400 blur-sm group-hover:blur opacity-0 group-hover:opacity-70 transition-all duration-300"></div>
              <Card className="shadow-xl relative bg-white rounded-xl overflow-hidden border-0 h-full">
                <CardContent className="p-8">
                  <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    {React.cloneElement(feature.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
