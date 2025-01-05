import { motion } from "framer-motion";

// Animation variants
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: index => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + index * 0.2,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => (
  <motion.div
    custom={index}
    variants={featureCardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="relative p-8 rounded-2xl bg-white group
               transform transition-all duration-300
               hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]
               border border-gray-100"
  >
    {/* Decorative Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 
                    rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity 
                    duration-500" />

    {/* Content Container */}
    <div className="relative z-10">
      {/* Icon Container */}
      <div className="relative inline-block mb-6">
        <div className="text-4xl text-blue-600 transform transition-transform duration-300
                       group-hover:scale-110 flex justify-center">
          {feature.icon}
        </div>
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 
                       rounded-full opacity-0 group-hover:opacity-20 transition-opacity 
                       duration-300 -z-10" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600
                     transition-colors duration-300">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700
                    transition-colors duration-300">
        {feature.description}
      </p>
    </div>
  </motion.div>
);

// Main Features Section Component
const FeaturesSection = ({ features, mounted }) => {
  return (
    <motion.section
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      variants={sectionVariants}
      className="container mx-auto px-4 py-24 bg-white overflow-hidden"
    >
      {/* Section Title */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900
                   relative inline-block w-full"
      >
        Powerful Features
        
      </motion.h2>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default FeaturesSection;