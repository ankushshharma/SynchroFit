import React, { useState, useEffect } from 'react';
import { Users, Activity, Target } from 'lucide-react';

const AnimatedStatsSection = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    users: 0,
    goals: 0,
    workouts: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { key: 'users', number: 10000, label: 'Active Users', icon: Users, suffix: '+' },
    { key: 'goals', number: 95, label: 'Goal Achievement Rate', icon: Target, suffix: '%' },
    { key: 'workouts', number: 1000000, label: 'Workouts Generated', icon: Activity, suffix: '+' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // Animation duration in milliseconds
      const steps = 60; // Number of steps in the animation
      const interval = duration / steps;

      stats.forEach(stat => {
        let currentStep = 0;
        const increment = stat.number / steps;

        const timer = setInterval(() => {
          if (currentStep < steps) {
            setAnimatedNumbers(prev => ({
              ...prev,
              [stat.key]: Math.round(increment * currentStep)
            }));
            currentStep++;
          } else {
            setAnimatedNumbers(prev => ({
              ...prev,
              [stat.key]: stat.number
            }));
            clearInterval(timer);
          }
        }, interval);

        return () => clearInterval(timer);
      });
    }
  }, [isVisible]);

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
      <div id="stats" data-animate className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="bg-white rounded-xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.key} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto text-blue-500 mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatNumber(animatedNumbers[stat.key])}{stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedStatsSection;