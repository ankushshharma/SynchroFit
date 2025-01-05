import React from 'react';
import { Target } from 'lucide-react';

// Enhanced keyframes focusing on text animations
const keyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.1); opacity: 0.5; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes textReveal {
    from {
      clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
      opacity: 0;
    }
    to {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      opacity: 1;
    }
  }

  @keyframes letterSpacing {
    from {
      letter-spacing: -8px;
      opacity: 0;
    }
    to {
      letter-spacing: normal;
      opacity: 1;
    }
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const FormHeader = () => {
  return (
    <>
      <style>{keyframes}</style>
      <div className="text-center mb-20 p-8 relative">
        {/* Main Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            {/* Icon Container */}
            <div className="relative">
              <Target 
                className="w-12 h-12 transition-all duration-300 ease-in-out hover:scale-110" 
                style={{
                  color: '#3b82f6',
                  filter: 'drop-shadow(0 0 1px rgba(59, 130, 246, 0.1))',
                  animation: 'float 3s ease-in-out infinite'
                }}
              />
              <div 
                className="absolute inset-0 opacity-30 rounded-full"
                style={{
                  background: '#3b82f6',
                  filter: 'blur(8px)',
                  animation: 'pulse 2s infinite'
                }}
              />
            </div>

            {/* Title with enhanced text animation */}
            <h1 
              className="text-3xl md:text-4xl font-bold relative transition-all duration-500 py-4"
              style={{
                color: 'var(--text-color)',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                animation: 'textReveal 1.2s ease-out forwards',
                background: 'linear-gradient(45deg, #3b82f6, #60a5fa, #3b82f6)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animationDelay: '0.2s'
              }}
            >
              With SynchroFit, Create Your Customized Fitness Plan
            </h1>
          </div>

          {/* Animated Divider */}
          <div 
            className="w-full max-w-md mx-auto h-px mb-8 opacity-30 transition-all duration-500"
            style={{
              background: `linear-gradient(to right, 
                transparent, 
                var(--text-color), 
                transparent
              )`,
              animation: 'gradientShift 3s ease-in-out infinite'
            }}
          />

          {/* Subtitle with letter spacing animation */}
          <p 
            className="text-lg md:text-xl transition-all duration-500"
            style={{
              animation: 'letterSpacing 1s ease-out forwards',
              animationDelay: '0.8s',
              opacity: 0
            }}
          >
            Fill in your details below to get a personalized workout and nutrition plan within seconds
          </p>
        </div>
      </div>
    </>
  );
};

export default FormHeader;