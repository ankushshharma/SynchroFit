import React, { useState, useMemo, useEffect } from 'react';
import { X } from 'lucide-react';

const DynamicResponseModal = ({ response, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (response) {
      setIsLoading(false);
    }
  }, [response]);

  // Return null if there's no response prop passed
  if (!response) {
    return null;
  }

  // Only show loading state if we have a response prop but it's still loading
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Only show error state if we have a response but no parsed content
  if (!parsedContent.length) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center text-yellow-800">
          <span className="text-sm">No response data available or invalid format.</span>
        </div>
      </div>
    );
  }

  // Updated parsing logic to handle dynamic response structure
  const parsedContent = useMemo(() => {
    try {
      const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // First try to parse as JSON in case it's structured data
      try {
        const jsonData = JSON.parse(text);
        return Array.isArray(jsonData) ? jsonData : [jsonData];
      } catch {
        // Fallback to text parsing if not JSON
        const sections = text.split(/(?=\d+\.)|(?=#{1,6}\s)/g).filter(Boolean);
        
        return sections.map(section => {
          const lines = section.split('\n').filter(Boolean);
          const titleLine = lines[0];
          
          // Handle different title formats (numbered, markdown headers, or plain text)
          const title = titleLine
            .replace(/^\d+\.\s*/, '') // Remove numbering
            .replace(/^#{1,6}\s*/, '') // Remove markdown headers
            .trim();
          
          return {
            title: title,
            content: lines.slice(1).join('\n').trim(),
            type: determineContentType(lines.slice(1).join('\n'))
          };
        });
      }
    } catch (error) {
      console.error('Error parsing response:', error);
      return [];
    }
  }, [response]);

  // New helper function to determine content type
  const determineContentType = (content) => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('sets') || lowerContent.includes('reps')) return 'workout';
    if (lowerContent.includes('calories') || lowerContent.includes('serving')) return 'meal';
    return 'text';
  };

  const parseWorkoutData = (content) => {
    const workoutLines = content.split('\n');
    const exercises = [];
    
    workoutLines.forEach(line => {
      if (line.includes(':')) {
        const [exercise, details] = line.split(':').map(s => s.trim());
        if (details && details.toLowerCase().includes('set')) {
          exercises.push({ name: exercise, details: details });
        }
      }
    });
    return exercises;
  };

  const renderWorkoutSection = (content) => {
    const exercises = parseWorkoutData(content);
    return (
      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="font-medium text-gray-900">{exercise.name}</div>
            <div className="text-sm text-gray-600 mt-1">{exercise.details}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderMealSection = (content) => {
    const meals = content.split('\n').filter(Boolean);
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {meals.map((meal, index) => {
          if (meal.includes(':')) {
            const [category, options] = meal.split(':');
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium text-gray-900 mb-2">{category.trim()}</h3>
                <ul className="list-disc pl-4 text-sm space-y-1 text-gray-600">
                  {options.split(',').map((option, i) => (
                    <li key={i}>{option.trim()}</li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const renderContent = (section) => {
    switch (section.type) {
      case 'workout':
        return renderWorkoutSection(section.content);
      case 'meal':
        return renderMealSection(section.content);
      default:
        return (
          <div className="prose prose-sm max-w-none">
            {section.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-600">{paragraph}</p>
            ))}
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!response || !parsedContent.length) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center text-yellow-800">
          <span className="text-sm">No response data available or invalid format.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative max-w-4xl w-full bg-white rounded-lg shadow-lg">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Tabs */}
          <div className="mb-6 border-b">
            <div className="flex flex-wrap gap-2">
              {parsedContent.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                    ${activeTab === index 
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mt-6 p-4">
            {parsedContent[activeTab] && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  {parsedContent[activeTab].title}
                </h2>
                {renderContent(parsedContent[activeTab])}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicResponseModal;