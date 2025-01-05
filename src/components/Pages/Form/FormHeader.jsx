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

  @keyframes typewriter {
    from { 
      width: 0;
    }
    to { 
      width: 100%;
    }
  }

  @keyframes fadeInTypewriter {
    from { 
      opacity: 0;
    }
    to { 
      opacity: 1;
    }
  }

  @keyframes blinkCursor {
    from, to { border-color: transparent }
    50% { border-color: var(--text-color); }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const FormHeader = () => {
  return (
    <>
      <style>{keyframes}</style>
      <div className="text-center mb-10 md:mb-20 p-4 md:p-8 relative">
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-8">
            {/* Icon Container */}
            {/* Updated title with smaller responsive sizing */}
            <h1 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold relative transition-all duration-500 py-2 md:py-4 whitespace-nowrap w-full"
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
              With SynchroFit,<br className="sm:hidden" /> Create Your Customized Plan
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

          {/* Text container */}
          <div 
            className="mt-6 font-mono text-sm md:text-base max-w-2xl ml-0"
            style={{
              animation: 'fadeInUp 0.5s ease-out forwards',
              animationDelay: '1.4s',
              opacity: 0,
              whiteSpace: 'nowrap'
            }}
          >
            "Fill in your details below to get a personalized plan within seconds"
          </div>
          
          {/* Second text container */}
          <div 
            className="mt-4 font-mono text-sm md:text-base max-w-2xl ml-0"
            style={{
              animation: 'fadeInUp 0.5s ease-out forwards',
              animationDelay: '1.6s',
              opacity: 0,
              whiteSpace: 'nowrap'
            }}
          >
            "Our AI will analyze your inputs to create the perfect plan for you"
          </div>
        </div>
      </div>
    </>
  );
};

export default FormHeader;