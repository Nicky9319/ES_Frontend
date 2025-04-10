import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const FeatureItem = ({ icon: Icon, title, description, reverse, color, hoverColor, highlight }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    
    return (
        <div 
            className={`flex flex-col md:flex-row w-full my-3 relative ${reverse ? 'md:flex-row-reverse' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full md:w-[45%] flex justify-center items-center">
                <motion.div 
                    className={`
                        w-full h-full flex justify-center items-center 
                        ${reverse ? 'md:ml-3 rounded-t-3xl md:rounded-t-none md:rounded-l-3xl' : 'md:mr-3 rounded-t-3xl md:rounded-t-none md:rounded-r-3xl'} 
                        py-8 shadow-lg relative overflow-hidden
                    `}
                    style={{ 
                        backgroundColor: isHovered ? hoverColor : color,
                        transition: "background-color 0.3s ease" 
                    }}
                    whileHover={{ y: -5 }}
                >
                    {highlight && (
                        <div className="absolute inset-0 bg-[2d9350] bg-opacity-10"></div>
                    )}
                    
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full mix-blend-overlay filter blur-lg"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full mix-blend-overlay filter blur-lg"></div>
                    </div>
                    
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Icon className="w-16 h-16 md:w-18 md:h-18 text-white drop-shadow-md" />
                    </motion.div>
                </motion.div>
            </div>
            
            <div className="w-full md:w-[55%] flex items-center bg-white rounded-b-3xl md:rounded-none shadow-sm md:shadow-none">
                <div className={`w-full p-4 md:py-0 ${reverse ? 'text-right md:pr-6' : 'text-left md:pl-6'}`}>
                    <motion.p 
                        className="text-xl md:text-2xl font-bold text-gray-800 mb-2"
                        initial={{ opacity: 0.9 }}
                        animate={{ opacity: isHovered ? 1 : 0.9 }}
                    >
                        {title}
                    </motion.p>
                    {description && (
                        <motion.p 
                            className="text-base md:text-lg text-gray-600"
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: isHovered ? 1 : 0.8 }}
                        >
                            {description}
                        </motion.p>
                    )}
                </div>
            </div>
        </div>
    );
};

FeatureItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    reverse: PropTypes.bool,
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    highlight: PropTypes.bool
};

FeatureItem.defaultProps = {
    description: "",
    reverse: false,
    color: "#268044",
    hoverColor: "#1a6330",
    highlight: false
};

export default FeatureItem;