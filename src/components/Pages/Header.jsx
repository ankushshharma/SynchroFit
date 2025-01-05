import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

// Icon imports
import { FaBrain, FaBookReader } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { BsArrowRightShort } from "react-icons/bs";
import { Activity } from "lucide-react";

// Styles
import 'animate.css';
import 'react-loading-skeleton/dist/skeleton.css';

// Animation variants
const animationVariants = {
  container: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
};

// Feature data
const features = [
  { text: 'AI-Powered', icon: FaBrain },
  { text: 'Personalized Plans', icon: BiTargetLock },
  { text: 'Real-Time Tracking', icon: FaBookReader },
  { text: 'Expert Guidance', icon: GiWeightLiftingUp }
];

const Header = () => {
  const navigate = useNavigate();

  // Component for Feature Item to reduce complexity in main render
  const FeatureItem = ({ feature, index }) => (
    <motion.div
      key={index}
      variants={animationVariants.item}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100
                 flex items-center gap-2 group cursor-pointer"
    >
      <feature.icon className="w-5 h-5 text-blue-500 group-hover:text-purple-500 
                              transition-colors" />
      <span className="font-medium whitespace-nowrap bg-gradient-to-r 
                      from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {feature.text}
      </span>
    </motion.div>
  );

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={animationVariants.container}
      className="container mx-auto px-4 py-16 text-center relative overflow-hidden"
    >
      <motion.div variants={animationVariants.item} className="relative z-10">
        {/* Logo Section */}
        <Activity className="w-20 h-20 mx-auto text-blue-600 mb-8" />

        {/* Title Section */}
        <motion.h2
                variants={animationVariants.item}
                whileHover={{ scale: 1.1 }}
                className="
                    text-2xl 
                    md:text-3xl 
                    font-medium 
                    mb-2 
                    tracking-wide 
                    uppercase 
                    animate-fade-in 
                    relative
                    before:content-[''] 
                    before:absolute 
                    before:-left-4 
                    before:top-1/2 
                    before:w-3 
                    before:h-3 
                    before:bg-gradient-to-r before:from-blue-600 before:to-purple-600 
                    before:rounded-full 
                    after:content-[''] 
                    after:absolute 
                    after:-right-4 
                    after:top-1/2 
                    after:w-3 
                    after:h-3 
                    after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 
                    after:rounded-full 
                    bg-gradient-to-r 
                    from-blue-600 
                    to-purple-600 
                    bg-clip-text 
                    text-transparent 
                    transition-all 
                    duration-300
                "
                >
                <span className="text-black">Welcome to </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SynchroFit
                </span>
                </motion.h2>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 
                      leading-tight tracking-tight">
          AI-Powered{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 
                         bg-clip-text text-transparent relative
                         after:absolute after:bottom-0 after:left-0 after:w-full 
                         after:h-1 after:bg-gradient-to-r after:from-blue-600 
                         after:to-purple-600 after:transform after:scale-x-0 
                         after:hover:scale-x-100 after:transition-transform 
                         after:duration-300">
            Fitness Revolution
          </span>
        </h1>

        {/* Features Grid */}
        <motion.div
          variants={animationVariants.container}
          className="flex flex-wrap justify-center gap-4 mt-12 mb-32"
        >
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          variants={animationVariants.item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate('/form');
            window.scrollTo(0, 0);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                    px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl 
                    font-semibold transition-all duration-300 flex items-center 
                    justify-center mx-auto shadow-lg hover:shadow-xl relative 
                    overflow-hidden group w-full max-w-md"
        >
          <span className="relative z-10 whitespace-nowrap">Transform Your Life Today</span>
          <BsArrowRightShort 
            className="ml-2 w-6 h-6 relative z-10 group-hover:translate-x-2 
                      transition-transform" 
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-700 
                      to-purple-700"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
    </motion.header>
  );
};

export default Header;