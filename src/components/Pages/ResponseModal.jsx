import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const ResponseModal = ({ isOpen, onClose, response }) => {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('Show My Workout');

  if (!isOpen) return null;

  const responseText = response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response text available';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm mt-16">
      <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full mx-4 pt-16
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]
        border border-gray-100">
        <div className="flex items-center mb-0">
          <div className="flex-grow text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Your Personalized Plan
            </h2>
          </div>
          <div className="p-0">
            <CloseIcon onClick={onClose} className="cursor-pointer" />
          </div>
        </div>
        
        <div className="w-32 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        

        <div className="prose prose-lg prose-blue max-w-none text-left px-4 mt-8">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-6 text-gray-800 border-b pb-2" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-4 text-gray-700" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-semibold my-3 text-gray-700" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 space-y-3" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-600 leading-relaxed" {...props} />,
              p: ({node, ...props}) => <p className="my-4 text-gray-600 leading-relaxed text-lg" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-gray-800" {...props} />,
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-collapse" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => <thead className="bg-gray-50" {...props} />,
              tbody: ({node, ...props}) => <tbody {...props} />,
              tr: ({node, ...props}) => <tr className="even:bg-white odd:bg-gray-50" {...props} />,
              th: ({node, ...props}) => (
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b" {...props} />
              ),
              td: ({node, ...props}) => (
                <td className="px-6 py-4 text-sm text-gray-800 border-b" {...props} />
              ),
            }}
          >
            {responseText}
          </ReactMarkdown>

              <div className="flex justify-center mt-8 mb-4">
                <button
                  onClick={() => {
                    // Disable click functionality
                    // onClose();
                    // navigate(`/workout?data=${JSON.stringify(response)}`);
                  }}
                  onMouseEnter={() => setButtonText('Upcoming')}
                  onMouseLeave={() => setButtonText('Show My Workout')}
                  onMouseOver={() => setButtonText('Upcoming')}
                  onMouseOut={() => setButtonText('Show My Workout')}
                  className="bg-blue-600 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg 
                    shadow-md transition-colors duration-200 flex items-center gap-2 cursor-not-allowed"
                  disabled // Disable the button
                >
                  {buttonText}
                </button>
              </div>

        </div>
      </div>
    </div>
  );
};

export default ResponseModal; 