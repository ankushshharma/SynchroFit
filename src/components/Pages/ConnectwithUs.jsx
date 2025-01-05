import React from 'react';
import { Activity, Instagram, Github, Linkedin } from 'lucide-react';

const ConnectwithUs = ({ mounted }) => {
  return (
    <section 
      className={`container mx-auto px-4 py-12 bg-white transition-all duration-1000 delay-[1200ms] transform ${
        !mounted ? 'opacity-0 translate-y-12' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-16 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center">
            Join Our Global<br className="md:hidden" /> Fitness Community
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-center leading-relaxed">
            We've helped over 100,000 people transform their lives through intelligent fitness solutions. 
            Our AI-powered platform combines cutting-edge technology with proven fitness science.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-evenly w-full gap-6 md:gap-12">
            <div className="flex items-center gap-6 md:gap-8 whitespace-nowrap">
              <Activity className="w-1 h-1 md:w-9 md:h-9 text-white animate-pulse" />
              <h3 className="text-xl md:text-3xl font-bold tracking-wide whitespace-nowrap">CONNECT WITH US HERE</h3>
            </div>

            <div className="flex items-center gap-6 md:gap-8">
              {[
                { 
                  icon: <Instagram className="w-6 h-6 text-white" />, 
                  href: "https://instagram.com/ankushshharma",
                  hoverColor: "hover:text-pink-400",
                  label: "Instagram"
                },
                { 
                  icon: <Github className="w-6 h-6 text-white" />, 
                  href: "https://github.com/ankushshharma",
                  hoverColor: "hover:text-green-400",
                  label: "Github"
                },
                { 
                  icon: <Linkedin className="w-6 h-6 text-white" />, 
                  href: "https://linkedin.com/in/ankushshharma",
                  hoverColor: "hover:text-blue-400",
                  label: "LinkedIn"
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`transform hover:scale-110 transition-all duration-300 
                            ${social.hoverColor} p-3 rounded-full`}
                >
                  {social.icon}
                </a>
              ))}
              <Activity className="w-6 h-6 text-white animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectwithUs;