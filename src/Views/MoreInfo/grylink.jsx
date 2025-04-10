import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Grylink = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
    });
  }, []);

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
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section with Improved Layout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left Content Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl lg:w-3/5 border-l-4 border-[#268044]"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What is <span className="text-[#268044]">GRYLINK</span>?
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              GRYLINK is an AI-powered SaaS platform that helps companies
              in the infrastructure space manage contractor data and
              streamline Credit on Working Capital (CWC) approvals.
            </p>
            <div className="mt-8">
              <a href="#features" className="inline-block bg-[#268044] hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Discover Features
              </a>
            </div>
          </motion.div>
          
          {/* Right Content Box */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#268044] p-8 lg:p-12 rounded-3xl shadow-xl lg:w-2/5 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why GRYLINK?</h2>
            <ul className="space-y-6">
              {[
                "Faster CWC processing",
                "Reduced manual work",
                "Smarter, data-backed approvals",
                "Easy to integrate and scale"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-xl">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Cards */}
      <motion.section 
        id="features" 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Key Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            GRYLINK offers powerful tools to streamline your contractor management workflow.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="h-2 bg-[#268044]"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-[#268044] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#CFF063]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Digital Contractor Onboarding</h3>
              <p className="text-gray-600">
                Centralize and manage all contractor records — bills, project history, and performance — in one place.
              </p>

            </div>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="h-2 bg-[#268044]"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-[#268044] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#CFF063]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Smart CWC Requests</h3>
              <p className="text-gray-600">
                Contractors can request credit through a simple digital form, sent directly to the company.
              </p>
            </div>
          </motion.div>

          {/* Feature Card 3 */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="h-2 bg-[#268044]"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-[#268044] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#CFF063]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">AI-Based Evaluation</h3>
              <p className="text-gray-600">
                GRYLINK auto-analyzes past data and presents key insights to help companies make faster, data-driven decisions.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>


    </div>
  );
};

export default Grylink;