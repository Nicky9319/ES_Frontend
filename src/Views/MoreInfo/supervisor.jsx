import React, { useState, useRef, useEffect } from 'react';
import FeatureItem from "./components/featureItem";
import { ClipboardCheck, CreditCard, LineChart, Users, FileBox, Settings, Bell } from "lucide-react";
import { CheckCircle, Percent, Banknote, Smartphone, Shield, FileText, Send } from "lucide-react";
import { motion } from "framer-motion";

const Supervisor = () => {
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
                            Supervisor By Gryork
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
                                icon={ClipboardCheck}
                                title="Smart attendance management"
                                description=""
                                reverse={false}
                                color="#2d9350"
                                hoverColor="#227a3e"
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
                            <FeatureItem
                                icon={CreditCard}
                                title="Seamless Buld Payments"
                                description=""
                                reverse={true}
                                color="#2d9350"
              hoverColor="#227a3e"
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
                            <FeatureItem
                                icon={Bell}
                                title="Real Time bill checker"
                                description=""
                                reverse={false}
                                color="#2d9350"
              hoverColor="#227a3e"
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
                            <FeatureItem
                                icon={LineChart}
                                title="AI Powered Growth Insights"
                                description=""
                                reverse={true}
                                color="#2d9350"
              hoverColor="#227a3e"
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
                            <FeatureItem
                                icon={Users}
                                title="Instant Team Communication"
                                description=""
                                reverse={false}
                                color="#2d9350"
              hoverColor="#227a3e"
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="transform transition duration-300 hover:scale-105">
                            <FeatureItem
                                icon={FileBox}
                                title="Secure Digital Document Hub"
                                description=""
                                reverse={true}
                                color="#2d9350"
              hoverColor="#227a3e"  
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="md:col-span-2 transform transition duration-300 hover:scale-105">
                            <FeatureItem
                                icon={Settings}
                                title="More AI-Powered Features"
                                description="Coming Soon !"
                                reverse={false}
                                color="#2d9350"
              hoverColor="#227a3e"
                                highlight={true}
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
                            Explore more about <span className="text-[#268044]">Supervisor</span>
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
                            SuperVisor by <span className="text-[#268044]">Gryork</span> – Smart Management Platform
                        </h1>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-1 space-y-8">
                                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <span className="text-[#268044] text-3xl pt-1">•</span>
                                    <p className="text-xl leading-relaxed">
                                        Work smarter with GRYORK – featuring SUPERVISOR, the AI-powered tool designed for subcontractors that replaces paperwork,
                                        automates tasks, and brings your entire workflow to your fingertips!
                                    </p>
                                </div>

                                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <span className="text-[#268044] text-3xl pt-1">•</span>
                                    <p className="text-xl leading-relaxed">
                                        <span className="font-semibold text-[#3c996a]">Smart Attendance Management</span> – Digitally track and manage worker attendance with automated reports and insights.
                                    </p>
                                </div>

                                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <span className="text-[#268044] text-3xl pt-1">•</span>
                                    <p className="text-xl leading-relaxed">
                                        <span className="font-semibold text-[#3c996a]">Seamless Bulk Payments</span> – Process multiple payments at once, saving time and reducing administrative overhead.
                                    </p>
                                </div>

                                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <span className="text-[#268044] text-3xl pt-1">•</span>
                                    <p className="text-xl leading-relaxed">
                                        <span className="font-semibold text-[#3c996a]">Real-time Bill Tracker</span> – Instantly view and manage bill statuses, ensuring financial clarity and improved cash flow management.
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 space-y-8">
                                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <span className="text-[#268044] text-3xl pt-1">•</span>
                                    <p className="text-xl leading-relaxed">
                                        <span className="font-semibold text-[#3c996a]">AI Growth Insights</span> – Get AI-driven monitoring of your workers' progress and development.
                                    </p>
                                </div>

                                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <span className="text-[#268044] text-3xl pt-1">•</span>
                                    <p className="text-xl leading-relaxed">
                                        <span className="font-semibold text-[#3c996a]">Instant Team Communication</span> – Broadcast messages and create a seamless channel between contractors and workers for efficient collaboration.
                                    </p>
                                </div>

                                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <span className="text-[#268044] text-3xl pt-1">•</span>
                                    <p className="text-xl leading-relaxed">
                                        <span className="font-semibold text-[#3c996a]">Secure Digital Document Hub</span> – Store and access all essential documents in one secure location.
                                    </p>
                                </div>

                                <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <span className="text-[#268044] text-3xl pt-1">•</span>
                                    <p className="text-xl leading-relaxed">
                                        With continuous AI-driven improvements and new features on the horizon, SuperVisor evolves with your business needs!
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

export default Supervisor;