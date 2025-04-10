import React, { useState, useRef, useEffect } from "react";
import FeatureItem from "./components/featureItem";
import { ShieldCheck, Calendar, Hourglass, FileText } from "lucide-react";
import { CheckCircle, Percent, Banknote, Smartphone, Shield, Send } from "lucide-react";
import { motion } from "framer-motion";

const CwcVestInfo = () => {
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>

      <div className="w-full py-10 space-y-10 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">
        {/* Hero Section with Animation */}
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
              Introducing Financial Safety Net <span className="text-[#268044] drop-shadow-sm">
                (CWC VEST)
              </span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our AI-powered financing solution designed specifically for contractors and infrastructure projects
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
                icon={ShieldCheck}
                title="Shield against Payment Delays"
                description="Get Funds when Payments are Delayed"
                reverse={false}
                color="#2d9350"
              hoverColor="#227a3e"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
              <FeatureItem
                icon={Calendar}
                title="Project Insurance"
                description="Secure your business against project delays"
                reverse={true}
                color="#2d9350"
              hoverColor="#227a3e"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
              <FeatureItem
                icon={Hourglass}
                title="Working Capital Backup"
                description="Bridge the gap when bills are approved but not paid"
                reverse={false}
                color="#2d9350"
              hoverColor="#227a3e"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
              <FeatureItem
                icon={FileText}
                title="Secure Your Business"
                description="Ensure your business is safe in hard times"
                reverse={true}
                color="#2d9350"
              hoverColor="#227a3e"
              />
            </motion.div>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full text-center mt-12 bg-gradient-to-b from-gray-50 to-gray-100 py-14 shadow-inner relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNjgwNDQiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUtN2g0djFoLTR2LTF6bTAtMmgxdjRoLTF2LTR6bS03IDExaDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTctMTFoNHYxaC00di0xem0wLTJoMXY0aC0xdi00em0tNyA5aDJ2MWgtMnYtMXptNC0xMWgydjFoLTJ2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-75"></div>
          <div className="relative z-10">
            <p className="text-3xl md:text-5xl font-medium text-gray-700 mb-6 drop-shadow-sm">
              Explore more about <span className="text-[#268044]">CWC Vest</span>
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

        <div
          className="overflow-hidden transition-all duration-500 ease-in-out mb-16"
          style={{ height: `${height}px` }}
        >
          <div ref={contentRef} className="bg-gradient-to-b from-white via-gray-50 to-white py-12 px-4 md:px-8 w-full max-w-[98%] mx-auto rounded-3xl shadow-2xl font-sans text-gray-800 border border-gray-100">
            <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-10 leading-tight">
              CWC VEST by <span className="text-[#268044]">Gryork</span> – Financial Protection for Your Projects
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-8">
                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="text-[#268044] text-3xl pt-1">•</span>
                  <p className="text-xl leading-relaxed">
                    VEST offers comprehensive financial protection for contractors, ensuring business continuity
                    even when facing payment delays and project uncertainties.
                  </p>
                </div>
                
                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="text-[#268044] text-3xl pt-1">•</span>
                  <p className="text-xl leading-relaxed">
                    <span className="font-semibold text-[#3c996a]">Payment Shield Protection</span> – Access funds immediately when client payments
                    are delayed, ensuring your operational expenses are always covered.
                  </p>
                </div>
                
                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="text-[#268044] text-3xl pt-1">•</span>
                  <p className="text-xl leading-relaxed">
                    <span className="font-semibold text-[#3c996a]">Project Risk Insurance</span> – Safeguard against unexpected project delays and challenges
                    with our comprehensive coverage options.
                  </p>
                </div>
              </div>
              
              <div className="flex-1 space-y-8">
                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="text-[#268044] text-3xl pt-1">•</span>
                  <p className="text-xl leading-relaxed">
                    <span className="font-semibold text-[#3c996a]">Working Capital Solutions</span> – Maintain steady cash flow with quick access to funds
                    when bills are approved but payment hasn't arrived yet.
                  </p>
                </div>
                
                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="text-[#268044] text-3xl pt-1">•</span>
                  <p className="text-xl leading-relaxed">
                    <span className="font-semibold text-[#3c996a]">Business Continuity Protection</span> – Complete business protection that works alongside
                    our CWC solution to ensure your operations never face financial disruption.
                  </p>
                </div>
                
                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="text-[#268044] text-3xl pt-1">•</span>
                  <p className="text-xl leading-relaxed">
                    CWC VEST works with our financing solutions to create a complete safety net for your construction
                    business, ensuring you're protected from all financial risks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default CwcVestInfo;
