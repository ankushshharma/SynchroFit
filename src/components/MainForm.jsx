import React, { useState } from 'react';
import { Dumbbell, Salad, Target, User } from 'lucide-react';
import ResponseModal from './ResponseModal'; // Import the modal component
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './MainForm.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { generateFitnessPlan } from '../services/apiService';

const MainForm = () => {
  const [formData, setFormData] = useState({
    workoutDays: 6,
    workoutIntensity: 'moderate',
    exerciseTypes: '',
    dietPreference: '',
    dietaryRestrictions: '',
    fitnessGoal: '',
    age: '',
    sex: '',
    height: '',
    weight: '',
    lifestyle: '',
    healthConditions: '',
    planDuration: '4',
    otherNotes: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [apiResponse, setApiResponse] = useState(null); // State to hold API response
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  // Add new state to track touched fields
  const [touchedFields, setTouchedFields] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    // Validate only if the field has been touched and the value is not empty
    if (touchedFields[name] && value !== '') {
      if (name === 'height') {
        const heightValue = parseInt(value);
        if (heightValue < 140) {
          setAlert({
            open: true,
            message: 'Height must be at least 140 cm.',
            severity: 'error'
          });
        }
      } else if (name === 'weight') {
        const weightValue = parseInt(value);
        if (weightValue < 25) {
          setAlert({
            open: true,
            message: 'Weight must be at least 25 kg.',
            severity: 'error'
          });
        }
      } else if (name === 'age') {
        const ageValue = parseInt(value);
        if (ageValue < 16) {
          setAlert({
            open: true,
            message: 'Age must be at least 16 years.',
            severity: 'error'
          });
        }
      }
    }
  };

  // Add new function to handle blur events
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    // Check if field is required and empty
    if (requiredFields.includes(name) && !value) {
      setAlert({
        open: true,
        message: `Please select a value for ${name.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
        severity: 'warning'
      });
    }
  };

  // Move required fields to component level for reuse
  const requiredFields = [
    'workoutDays',
    'workoutIntensity',
    'exerciseTypes',
    'dietPreference',
    'dietaryRestrictions',
    'fitnessGoal',
    'age',
    'sex',
    'height',
    'weight',
    'lifestyle'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Update required fields list - remove healthConditions if it's optional
    const requiredFields = [
      'workoutDays',
      'workoutIntensity',
      'exerciseTypes',
      'dietPreference',
      'dietaryRestrictions',
      'fitnessGoal',
      'age',
      'sex',
      'height',
      'weight',
      'lifestyle'
    ];

    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    setIsLoading(true);

    // Generate a detailed prompt based on form data
    const prompt = `Generate a comprehensive ${formData.planDuration}-week fitness and nutrition plan with the following specifications:

PERSONAL PROFILE:
- Age: ${formData.age} years old
- Sex: ${formData.sex}
- Height: ${formData.height} cm
- Weight: ${formData.weight} kg

WORKOUT PLAN:
- Frequency: ${formData.workoutDays} days per week
- Intensity Level: ${formData.workoutIntensity}
- Preferred Exercise Types: ${formData.exerciseTypes || 'No specific preference'}

DIETARY REQUIREMENTS:
- Diet Type: ${formData.dietPreference || 'Standard balanced diet'}
- Dietary Restrictions: ${formData.dietaryRestrictions || 'None'}

FITNESS GOALS:
${formData.fitnessGoal || 'General fitness improvement'}

LIFESTYLE & HEALTH CONSIDERATIONS:
- Activity Level: ${formData.lifestyle || 'Not specified'}
- Health Conditions: ${formData.healthConditions || 'None reported'}

ADDITIONAL NOTES:
${formData.otherNotes || 'No additional notes'}

Please provide:
1. A detailed weekly workout schedule with specific exercises, sets, reps, and rest periods
2. A comprehensive meal plan with breakfast, lunch, dinner, and snacks
3. Tips for maintaining consistency and proper form
4. Progress tracking recommendations
5. Modifications or alternatives for exercises if needed`;

    // Construct the request body
    const requestBody = {
      workoutPreferences: {
        daysPerWeek: formData.workoutDays,
        workoutIntensity: formData.workoutIntensity,
        preferredExercises: formData.exerciseTypes ? formData.exerciseTypes.split(',') : []
      },
      dietPreferences: {
        dietType: formData.dietPreference,
        dietaryRestrictions: formData.dietaryRestrictions ? formData.dietaryRestrictions.split(',') : []
      },
      fitnessGoals: {
        goal: formData.fitnessGoal
      },
      personalDetails: {
        age: formData.age,
        sex: formData.sex,
        height: formData.height,
        weight: formData.weight
      },
      lifestyleInformation: {
        activityLevel: formData.lifestyle,
        healthConditions: formData.healthConditions ? formData.healthConditions.split(',') : []
      },
      planDuration: `${formData.planDuration} weeks`,
      additionalNotes: formData.otherNotes,
      prompt: prompt // Add the prompt to the request
    };

    // Log the request body
    // console.log('Request Body:', requestBody);

    // Send the POST request
    try {
      const responseData = await generateFitnessPlan(requestBody);
      console.log('Response:', responseData);
      setApiResponse(responseData);
      setIsModalOpen(true);
      setAlert({
        open: true,
        message: 'Your fitness plan has been generated successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error:', error);
      setAlert({
        open: true,
        message: 'Failed to generate fitness plan. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add this new function to check if form is valid
  const isFormValid = () => {
    const requiredFields = [
      'workoutDays',
      'workoutIntensity',
      'exerciseTypes',
      'dietPreference',
      'dietaryRestrictions',
      'fitnessGoal',
      'age',
      'sex',
      'height',
      'weight',
      'lifestyle'
    ];

    return requiredFields.every(field => formData[field] !== '');
  };

  return (
    <div className="form-container max-w-7xl mr-60 ml-60 px-4 py-8">
      <div className="form-section rounded-xl shadow-2xl p-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-10 h-10 text-blue-600" />
            <h1 className="text-2xl font-bold">
              Create Your <span className="text-black">Customized Fitness</span> Plan
            </h1>
          </div>
          <p>Fill in your details below to get a personalized workout and nutrition plan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10" noValidate>
          <div className="form-section p-8 rounded-lg space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Dumbbell className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Workout Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-medium text-gray-700">Days per Week</label>
                <span className="days-badge">
                  {formData.workoutDays} days
                </span>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="7"
                  name="workoutDays"
                  value={formData.workoutDays}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-3 gap-8">
                {['light workout', 'moderate workout', 'intense workout'].map((intensity) => (
                  <label key={intensity} className="flex items-center space-x-2 w-full justify-center">
                    <input
                      type="radio"
                      name="workoutIntensity"
                      value={intensity}
                      checked={formData.workoutIntensity === intensity}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-transparent border border-white rounded-full focus:outline-none"
                    />
                    <span className="text-sm text-black capitalize">{intensity}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  EXERCISE TYPES
                </label>
                <select
                  name="exerciseTypes"
                  value={formData.exerciseTypes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                >
                  <option value="">Select exercise type</option>
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength Training</option>
                  <option value="yoga">Yoga</option>
                  <option value="hiit">HIIT</option>
                  <option value="pilates">Pilates</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section p-8 rounded-lg space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Salad className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Diet Preferences</h2>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Diet Type
              </label>
              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              >
                <option value="">Select diet type</option>
                <option value="balanced" className="text-black">Balanced</option>
                <option value="keto">Keto</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="paleo">Paleo</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Dietary Restrictions
              </label>
              <select
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              >
                <option value="">Select dietary restrictions</option>
                <option value="none">None</option>
                <option value="gluten-free">Gluten-free</option>
                <option value="dairy-free">Dairy-free</option>
                <option value="nut-free">Nut-free</option>
                <option value="shellfish-free">Shellfish-free</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fitness Goal
              </label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              >
                <option value="">Select your goal</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="endurance">Improve Endurance</option>
                <option value="strength">Build Strength</option>
                <option value="general-fitness">General Fitness</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Lifestyle
              </label>
              <select
                name="lifestyle"
                value={formData.lifestyle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              >
                <option value="">Select lifestyle</option>
                <option value="sedentary">Sedentary</option>
                <option value="lightly-active">Lightly Active</option>
                <option value="moderately-active">Moderately Active</option>
                <option value="very-active">Very Active</option>
                <option value="extra-active">Extra Active</option>
              </select>
            </div>
          </div>

          <div className="form-section p-8 rounded-lg space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  AGE
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter your age (minimum 16)"
                  value={formData.age}
                  onChange={handleChange}
                  min="16"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  SEX
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                >
                  <option value="">Select sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  HEIGHT (CM)
                </label>
                <input
                  type="number"
                  name="height"
                  placeholder="Enter height (minimum 140 cm)"
                  value={formData.height}
                  onChange={handleChange}
                  min="140"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  WEIGHT (KG)
                </label>
                <input
                  type="number"
                  name="weight"
                  placeholder="Enter weight (minimum 25 kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  min="25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-2 w-full">
              <label className="block text-sm font-medium text-gray-700">
                ADDITIONAL NOTES
              </label>
              <textarea
                name="otherNotes"
                placeholder="Any other information you'd like to share... (optional)"
                value={formData.otherNotes}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="w-2/3 bg-blue-600 text-white py-3 px-6 rounded-lg 
                         hover:bg-blue-700 dark:hover:bg-white dark:hover:text-black
                         transition-colors duration-200 
                         focus:outline-none focus:ring-4 focus:ring-blue-200 
                         disabled:dark:hover:bg-white disabled:dark:hover:text-black
                         disabled:opacity-50 text-lg font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <CircularProgress size={24} sx={{ color: '#000000' }} />
                  <span className="ml-3">Creating Your Plan...</span>
                </div>
              ) : (
                'Generate Your Personalized Plan'
              )}
            </button>
          </div>
        </form>
      </div>

      <ResponseModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setIsLoading(false);
        }} 
        response={apiResponse} 
      />

      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={() => {
          setAlert({ ...alert, open: false });
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => {
            setAlert({ ...alert, open: false });
          }} 
          severity={alert.severity} 
          variant="outlined"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MainForm;
