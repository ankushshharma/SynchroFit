import { motion } from "framer-motion";
import { FaDumbbell, FaAppleAlt, FaBrain, FaBullseye } from "react-icons/fa";
import { BiRun } from "react-icons/bi";
import { GiMeal } from "react-icons/gi";

const LandingPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <FaDumbbell className="text-4xl text-primary-600" />,
      title: "Customized Workout Plans",
      description: "Personalized exercise routines tailored to your goals and preferences"
    },
    {
      icon: <GiMeal className="text-4xl text-primary-600" />,
      title: "Personalized Nutrition Guidance",
      description: "Custom meal plans that align with your dietary needs and goals"
    },
    {
      icon: <FaBrain className="text-4xl text-primary-600" />,
      title: "Smart Adaptation",
      description: "AI-powered plans that evolve with your progress"
    },
    {
      icon: <FaBullseye className="text-4xl text-primary-600" />,
      title: "Goal-Focused Planning",
      description: "Strategic approaches to achieve your specific fitness targets"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section 
        className="container mx-auto px-6 py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-5xl font-bold mb-8 text-gray-800"
          {...fadeIn}
        >
          AI-Powered Personalized<br />
          <span className="text-primary-600">Fitness & Nutrition Planner</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          {...fadeIn}
        >
          Transform your health journey with our intelligent fitness planning tool that creates
          customized workout and nutrition plans tailored specifically to you.
        </motion.p>

        <motion.button
          className="bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Journey
        </motion.button>
      </motion.section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 text-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
            {[1, 2, 3, 4].map((step, index) => (
              <motion.div
                key={step}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold mb-4">
                  {step}
                </div>
                <p className="text-gray-600 text-center max-w-xs">
                  {step === 1 && "Fill out our comprehensive questionnaire"}
                  {step === 2 && "Our AI analyzes your unique requirements"}
                  {step === 3 && "Receive your personalized 4-week plan"}
                  {step === 4 && "Get detailed instructions and modifications"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="container mx-auto px-6 py-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Ready to Transform Your Health?</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Your path to better health begins with a plan that's as unique as you are.
        </p>
        <motion.button
          className="bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Now
        </motion.button>
      </motion.section>
    </div>
  );
};

export default LandingPage;
