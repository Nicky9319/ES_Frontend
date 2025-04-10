import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import FeatureItem from "./components/featureItem";
import { Users, Smartphone, TrendingUp, BarChart3, MoveUpRight } from "lucide-react";
import { CheckCircle, Percent, Banknote, Shield, FileText, Send } from "lucide-react";


// Animation variants reused from the CWC component
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Team() {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full py-10 space-y-10 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center"
      >
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 relative">
            Team By Gryork 
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Build Grow and Succedd Together
        </p>
        <motion.div
          className="mt-8 h-1 w-32 bg-[#2E8B57] mx-auto rounded-full"
          animate={{
            width: ["0%", "32%", "24%", "32%"],
            opacity: [0, 1]
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>




      {/* Key Benefits Section with Staggered Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >


        <motion.h2
          variants={fadeInUp}
          className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10 relative inline-block mx-auto"
        >
          <span className="relative z-10">Key Benefits</span>
          <span className="absolute bottom-1 left-0 w-full h-3 bg-green-100 -z-10 rounded-lg"></span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 px-2">
          <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
            <FeatureItem
              icon={Smartphone}
              title="Connect & Grow"
              description="Form your own Skill Team"
              reverse={false}
              color="#2d9350"
              hoverColor="#227a3e"
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
            <FeatureItem
              icon={Users}
              title="Join & Succeed"
              description="No Team? Join one Instantly"
              reverse={true}
              color="#2d9350"
              hoverColor="#227a3e"
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
            <FeatureItem
              icon={MoveUpRight}
              title="Earn More"
              description=" learn more Level up from worker to team head"
              reverse={false}
              color="#2d9350"
              hoverColor="#227a3e"
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
            <FeatureItem
              icon={TrendingUp}
              title="Multiply your Income"
              description="Take Better projects & earn 5x with your team"
              reverse={true}
              color="#2d9350"
              hoverColor="#227a3e"
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="md:col-span-2 transform transition duration-300 hover:scale-105">
            <FeatureItem
              icon={BarChart3}
              title="Explore without Limits"
              description="Go Beyond your local sites"
              reverse={false}
              color="#2d9350"
              hoverColor="#227a3e"
              highlight={true}
            />
          </motion.div>
        </div>
      </motion.div>




      {/* Call-to-Action Section with Enhanced Animation and Styling */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full text-center mt-16 bg-gradient-to-b from-gray-50 to-gray-100 py-14 shadow-inner relative overflow-hidden"
      >
        <div className="relative z-10">
          <p className="text-3xl md:text-5xl font-medium text-gray-700 mb-6 drop-shadow-sm">
            Explore more about <span className="text-[#268044]">TEAM</span>
          </p>
          <motion.button
            className="bg-[#268044] hover:bg-green-800 transition-all duration-300 text-white text-xl md:text-2xl px-12 md:px-16 py-3 rounded-[23px] shadow-lg hover:shadow-xl"
            onClick={toggleDropdown}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? "Show Less" : "Learn More"}
          </motion.button>
        </div>
      </motion.div>

      {/* Animated Dropdown Section - Updated to match cwc.jsx design */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out mb-16"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="bg-gradient-to-b from-white via-gray-50 to-white py-12 px-4 md:px-8 w-full max-w-[98%] mx-auto rounded-3xl shadow-2xl font-sans text-gray-800 border border-gray-100">
          <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-10 leading-tight">
            Team by <span className="text-[#268044]">Gryork</span> – Building Your Skilled Workforce
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-[#268044] text-3xl pt-1">•</span>
                <p className="text-xl leading-relaxed">
                  Build a skilled workforce, deliver top-quality work, and unlock new opportunities with ease!
                </p>
              </div>
              
              <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-[#268044] text-3xl pt-1">•</span>
                <p className="text-xl leading-relaxed">
                  <span className="font-semibold text-[#3c996a]">Connect & Grow</span> – Bring skilled workers together, create your own team, and discover work that matches your expertise while opening doors to new opportunities.
                </p>
              </div>
              
              <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-[#268044] text-3xl pt-1">•</span>
                <p className="text-xl leading-relaxed">
                  <span className="font-semibold text-[#3c996a]">Join & Succeed</span> – Join existing teams, collaborate on projects, and gain hands-on experience.
                </p>
              </div>
            </div>
            
            <div className="flex-1 space-y-8">
              <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-[#268044] text-3xl pt-1">•</span>
                <p className="text-xl leading-relaxed">
                  <span className="font-semibold text-[#3c996a]">Form, Learn, Shine</span> – Start as a worker, evolve into a leader, and eventually become a job provider.
                </p>
              </div>
              
              <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-[#268044] text-3xl pt-1">•</span>
                <p className="text-xl leading-relaxed">
                  <span className="font-semibold text-[#3c996a]">Multiply Your Impact</span> – Increase your earnings up to 5X by working smarter, seizing the right projects, and leveraging teamwork.
                </p>
              </div>
              
              <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-[#268044] text-3xl pt-1">•</span>
                <p className="text-xl leading-relaxed">
                  <span className="font-semibold text-[#3c996a]">Explore More</span> – Find jobs, manage your team, track performance, and unlock better opportunities—all from one place.
                </p>
              </div>
              
              <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-[#268044] text-3xl pt-1">•</span>
                <p className="text-xl leading-relaxed">
                  Take the first step toward success—Build Your Team Today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
