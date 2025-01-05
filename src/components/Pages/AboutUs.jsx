import React, { useEffect, useState } from 'react';
import { LineChart, Users, Lightbulb, Target, Award, Code,Github, Facebook, Instagram, Twitter, Linkedin, Youtube, Mail,
  Salad, // For nutrition
  Calendar, // For scheduling
  ChartLine, // For progress tracking
  Activity, // For fitness tracking
  Brain,
  Dumbbell
 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedStatsSection from './AnimatedStatsSection';
import ConnectwithUs from './ConnectwithUs';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      setMounted(false);
    };
  }, []);

  const stats = [
    { number: '10K+', label: 'Active Users', icon: Users },
    { number: '95%', label: 'Goal Achievement Rate', icon: Target },
    { number: '1M+', label: 'Workouts Generated', icon: Activity }
  ];

  const values = [
    {
      title: 'Personalized Fitness',
      description: 'AI-powered workout and nutrition plans tailored to your unique goals and preferences.',
      icon: Brain
    },
    {
      title: 'Smart Adaptation',
      description: 'Continuous plan optimization based on your progress and feedback.',
      icon: ChartLine
    },
    {
      title: 'Comprehensive Support',
      description: 'From workouts to nutrition, we provide all the tools you need for success.',
      icon: Dumbbell
    }
  ];

  const milestones = [
    { 
      year: '2021', 
      title: 'Platform Launch', 
      description: 'SynchroFit launches with AI-powered fitness planning' 
    },
    { 
      year: '2022', 
      title: 'Nutrition Integration', 
      description: 'Added personalized meal planning and tracking' 
    },
    { 
      year: '2023', 
      title: 'Community Features', 
      description: 'Introduced social features and progress sharing' 
    },
    { 
      year: '2024', 
      title: 'Smart Adaptation', 
      description: 'Enhanced AI algorithms for better personalization' 
    }
  ];

  return (
    <div className="min-h-screen">
      <style>
        {`
          /* Removed the zoom animation CSS */
        `}
      </style>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-24">
        {/* Keep the same animation structure */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div id="hero" data-animate className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Enhanced Welcome Section */}
            <div id="about" data-animate className={`mt-12 transform transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                {/* Enhanced Decorative Elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/10  blur-2xl" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10  blur-2xl" />
                
                {/* Enhanced Section Content */}
                <div className="relative space-y-12">
                  <h2 className="text-6xl md:text-7xl font-extrabold text-black mb-8 leading-tight py-4">
                    Welcome to <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent" style={{ textShadow: '0px 0px 0px rgba(0, 0, 0, 0.2)' }}>SynchroFit</span>
                  </h2>
                  
                  <div className="max-w-6xl mx-auto">
                    <p className="text-xl text-gray-700 leading-relaxed mb-12">
                      Where <span className="text-blue-600 font-semibold">artificial intelligence</span> meets your fitness aspirations, 
                      creating a personalized journey that evolves with you.
                    </p>
                    
                    {/* Enhanced Feature Pills */}
                    <div className="flex flex-nowrap justify-center gap-4 mt-12 overflow-x-auto pb-4 px-4 max-w-full 
                    scrollbar-hide hover:scrollbar-default">
                      {[
                        { text: 'AI-Powered', icon: Brain },
                        { text: 'Personalized Plans', icon: Target },
                        { text: 'Real-Time Adaptation', icon: ChartLine },
                        { text: 'Expert Guidance', icon: Award }
                      ].map((feature, index) => (
                        <div 
                          key={index}
                          className="group px-6 py-3 bg-white rounded-full text-gray-700 shadow-lg border border-gray-100 
                          flex items-center gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300
                          animate-fade-in-up"
                          style={{
                            animationDelay: `${index * 200}ms`,
                            minWidth: 'fit-content'
                          }}
                        >
                          <feature.icon className="w-5 h-5 text-blue-500 group-hover:text-purple-500 transition-colors" />
                          <span className="font-medium whitespace-nowrap">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <AnimatedStatsSection />
      
       {/* Testimonials Section */}
       <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Key Features
          </h2>
          <div className="grid md:grid-cols-4 gap-8 justify-items-center">
            {[
              {
                icon: Dumbbell,
                title: "Custom Workouts",
                description: "Personalized exercise plans for your goals"
              },
              {
                icon: Salad,
                title: "Nutrition Plans",
                description: "Tailored meal guidance and tracking"
              },
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                description: "Workouts that fit your lifestyle"
              },
              {
                icon: ChartLine,
                title: "Progress Tracking",
                description: "Monitor your fitness journey"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex justify-center">
                  <feature.icon className="w-10 h-10 text-purple-500 mb-4" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div className="bg-gray-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                id={`value-${index}`}
                data-animate
                className={`transform transition-all duration-700 delay-${index * 200} ${isVisible[`value-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-all duration-300 h-full flex flex-col items-center">
                  <value.icon className="w-12 h-12 text-blue-500 mb-6 transform transition-transform duration-300 group-hover:scale-110 mx-auto" />
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      


      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-400" />
          {milestones.map((milestone, index) => (
            <div 
              key={index}
              id={`milestone-${index}`}
              data-animate
              className={`relative flex md:items-center mb-12 transform transition-all duration-700 delay-${index * 200} ${isVisible[`milestone-${index}`] ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
            >
              <div className={`flex items-center md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:ml-[50%]'}`}>
                <div className={`bg-white p-6 rounded-lg shadow-lg w-full relative ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  {/* Add dot marker */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 
                    ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`} />
                  <div className="text-2xl font-bold text-blue-500 mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      {/* Modified CTA Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 py-20 rounded-lg">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-white mb-8">
            Join SynchroFit today and experience the power of AI-driven fitness planning
          </p>
          <Link to="/form" onClick={() => window.scrollTo(0, 0)}>
            <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-50 transition-all duration-300">
              Start Your Journey
            </button>
          </Link>
          <div className="flex flex-col items-center justify-center gap-6 mt-12">
            {/* Section Header */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-sm">
                <Activity className="w-6 h-6 text-white animate-pulse" />
                <h3 className="text-xl font-semibold text-white">Connect With Us</h3>
              </div>

              {/* Social Media Icons - With consistent white hover */}
              {[
                { 
                  icon: <Instagram className="w-7 h-7" />, 
                  href: "https://instagram.com/ankushshharma",
                  label: "Instagram"
                },
                { 
                  icon: <Github className="w-7 h-7" />, 
                  href: "https://github.com/ankushshharma",
                  label: "Github"
                },
                { 
                  icon: <Linkedin className="w-7 h-7" />, 
                  href: "https://linkedin.com/in/ankushshharma",
                  label: "LinkedIn"
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="transform hover:scale-110 transition-all duration-300 
                    text-white hover:text-white hover:bg-white/20
                    p-4 rounded-full backdrop-blur-sm
                    hover:shadow-lg hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
              <Activity className="w-6 h-6 text-white animate-pulse" />
                
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AboutUs;