import React, { useState } from 'react';
import { Dumbbell, Salad, Target, User } from 'lucide-react';
import ResponseModal from './ResponseModal'; // Import the modal components
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './MainForm.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import FormHeader from './Form/FormHeader';
import { LiaRunningSolid } from "react-icons/lia";
import { CiDumbbell } from "react-icons/ci";
import { FaDumbbell } from "react-icons/fa";
import { BiDumbbell } from "react-icons/bi";
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

  const [heightInFeet, setHeightInFeet] = useState(0); // New state for height in feet

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    // Convert height to feet if the field is height
    if (name === 'height') {
      const feet = (value / 30.48).toFixed(2); // Convert cm to feet
      setHeightInFeet(feet); // Update the height in feet state
    }

    // Debugging: Log formData and touchedFields
    console.log('Form Data:', formData);
    console.log('Touched Fields:', touchedFields);
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

    // Debugging: Log formData and touchedFields
    console.log('Form Data on Blur:', formData);
    console.log('Touched Fields on Blur:', touchedFields);
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
    console.log('Request Body:', requestBody);

    // Send the POST request
    try {
      const response = await fetch('https://synchrofit-backend-production.up.railway.app/generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      // Handle the response
      const responseData = await response.json();
      console.log('Response:', responseData);
      setApiResponse(responseData); // Set the API response
      setIsModalOpen(true); // Open the modal
      setIsLoading(false); // Don't forget to stop loading
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); // Make sure to stop loading on error
      setAlert({
        open: true,
        message: 'Failed to generate plan. Please try again.',
        severity: 'error'
      });
    }
  };

  // Update the isFormValid function to check if all required fields have valid values
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

    // Check if all required fields have valid values
    const valid = requiredFields.every(field => {
      const value = formData[field];
      
      // For numeric fields, ensure they're not only non-empty but also valid numbers
      if (['age', 'height', 'weight'].includes(field)) {
        const numValue = Number(value);
        return !isNaN(numValue) && numValue > 0; // Check for valid numbers
      }
      
      // For other fields, check if they're non-empty strings
      return value !== undefined && value !== null && value !== '';
    });

    return valid; // Return the validity status
  };

  return (
    <div className="form-container max-w-[100rem] mx-auto px-2 sm:px-4 py-6 sm:py-12 bg-white min-h-screen hide-scrollbar">
        <FormHeader/>
        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-12" noValidate>
          <div className="form-section p-4 sm:p-8 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 space-y-4 sm:space-y-6 border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8 justify-center">
              <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Workout Preferences</h2>
            </div>

            {/* Days per Week */}
            <div className="relative">
              <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2 mb-4 sm:mb-6 uppercase">
                DAYS PER WEEK
              </label>
              <span 
                className="days-badge absolute transform -translate-x-1/2 text-sm sm:text-base"
                style={{
                  left: `${((formData.workoutDays - 1) / 6) * 100}%`,
                  top: '1rem'
                }}
              >
                {formData.workoutDays} days
              </span>
              <div className="mt-6 sm:mt-8 relative">
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
            </div>


            {/* Workout Intensity */ }
            <div className="workout-intensity-container">
              <h3 className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2 mb-4 sm:mb-6 uppercase">
                Workout Intensity
              </h3>
              <div className="intensity-grid grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
                {['light workout', 'moderate workout', 'intense workout'].map((intensity) => (
                  <label 
                    key={intensity} 
                    className={`intensity-option flex flex-col items-center p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                      ${formData.workoutIntensity === intensity 
                        ? 'selected border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    <input
                      type="radio"
                      name="workoutIntensity"
                      value={intensity}
                      checked={formData.workoutIntensity === intensity}
                      onChange={handleChange}
                      className="radio-input hidden"
                    />
                    <div className="intensity-content text-center">
                      <span className="intensity-icon text-xl sm:text-2xl mb-1 sm:mb-2 block">
                        {intensity === 'light workout' && <CiDumbbell className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />}
                        {intensity === 'moderate workout' && <BiDumbbell className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />}
                        {intensity === 'intense workout' && <FaDumbbell className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />}
                      </span>
                      <span className="intensity-label capitalize text-xs sm:text-sm">{intensity}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Exercise Types */}
            <div className="space-y-2">
              <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2">
                EXERCISE TYPES
              </label>
              <select
                name="exerciseTypes"
                value={formData.exerciseTypes}
                onChange={handleChange}
                className="w-full px-2 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         bg-transparent dark:bg-gray-700
                         text-gray-900 dark:text-gray-100"
              >
                <option value="">✨ Select exercise type</option>
                <option value="cardio">🏃‍♂️ Cardio - Running, Swimming, Cycling</option>
                <option value="strength">💪 Strength Training - Weights, Resistance</option>
                <option value="yoga">🧘‍♀️ Yoga - Flexibility & Balance</option>
                <option value="hiit">🔥 HIIT - High Intensity Training</option>
                <option value="pilates">🌟 Pilates - Core & Posture</option>
                <option value="crossfit">🏋️‍♂️ CrossFit - Mixed Training</option>
                <option value="martial">🥋 Martial Arts - Boxing, Kickboxing</option>
              </select>
            </div>
          </div>

          <div className="form-section p-4 sm:p-8 rounded-xl bg-green-50/50 dark:bg-green-900/20 space-y-4 sm:space-y-6 border border-green-100 dark:border-green-800">
            <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8 justify-center">
              <Salad className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Diet Preferences</h2>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2">
                DIET TYPE
              </label>
              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
                className="w-full px-2 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         bg-transparent dark:bg-gray-700
                         text-gray-900 dark:text-gray-100"
              >
                <option value="">✨ Select diet type</option>
                <option value="balanced">⚖️ Balanced - Well-rounded nutrition</option>
                <option value="keto">🥑 Keto - Low-carb, high-fat</option>
                <option value="vegetarian">🥗 Vegetarian - Plant-based with dairy</option>
                <option value="vegan">🌱 Vegan - Purely plant-based</option>
                <option value="paleo">🍖 Paleo - Ancient diet inspired</option>
                <option value="mediterranean">🫒 Mediterranean - Heart-healthy foods</option>
                <option value="pescatarian">🐟 Pescatarian - Fish & plant-based</option>
                <option value="gluten-free">🌾 Gluten-Free - No wheat products</option>
              </select>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2">
                DIETARY RESTRICTIONS
              </label>
              <select
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                className="w-full px-2 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         bg-transparent dark:bg-gray-700
                         text-gray-900 dark:text-gray-100"
              >
                <option value="">✨ Select dietary restrictions</option>
                <option value="none">✅ None - No specific restrictions</option>
                <option value="gluten-free">🌾 Gluten-free - No wheat, rye, or barley</option>
                <option value="dairy-free">🥛 Dairy-free - No milk products</option>
                <option value="nut-free">🥜 Nut-free - No tree nuts or peanuts</option>
                <option value="shellfish-free">🦐 Shellfish-free - No crustaceans</option>
                <option value="egg-free">🥚 Egg-free - No egg products</option>
                <option value="soy-free">🫘 Soy-free - No soy products</option>
                <option value="kosher">✡️ Kosher - Follows Jewish dietary laws</option>
                <option value="halal">☪️ Halal - Follows Islamic dietary laws</option>
              </select>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2">
                FITNESS GOAL
              </label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="w-full px-2 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         bg-transparent dark:bg-gray-700
                         text-gray-900 dark:text-gray-100"
              >
               <option value="">✨ Select your goal</option>
<option value="weight-loss">🔥 Weight Loss - Burn fat & get lean</option>
                <option value="muscle-gain">💪 Muscle Gain - Build muscle mass</option>
                <option value="endurance">🏃‍♂️ Improve Endurance - Boost stamina</option>
                <option value="strength">🏋️‍♂️ Build Strength - Increase power</option>
                <option value="general-fitness">⭐ General Fitness - Overall wellness</option>
              </select>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2">
                LIFESTYLE
              </label>
              <select
                name="lifestyle"
                value={formData.lifestyle}
                onChange={handleChange}
                className="w-full px-2 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         bg-transparent dark:bg-gray-700
                         text-gray-900 dark:text-gray-100"
              >
                <option value="">✨ Select your lifestyle</option>
<option value="sedentary">🧘‍♂️ Sedentary - Desk job, minimal exercise</option>
<option value="lightly-active">🚶‍♂️ Lightly Active - Light walks, standing job</option>
<option value="moderately-active">🏃‍♂️ Moderately Active - Regular exercise 3-5x week</option>
<option value="very-active">💫 Very Active - Daily exercise or sports</option>
<option value="extra-active">⚡ Extra Active - Intense training or physical job</option>
<option value="athlete">🏆 Professional Athlete - Multiple training sessions daily</option>
              </select>
            </div>
          </div>

          <div className="form-section p-4 sm:p-8 rounded-xl bg-purple-50/50 dark:bg-purple-900/20 space-y-4 sm:space-y-6 border border-purple-100 dark:border-purple-800 hide-scrollbar">
            <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8 justify-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2">
                  AGE
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter your age (minimum 16)"
                  value={formData.age}
                  onChange={handleChange}
                  min="16"
                  className="
                    w-full 
                    px-2 sm:px-3 
                    py-2 
                    text-sm sm:text-base
                    border border-gray-300 dark:border-gray-600 
                    rounded-md 
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 
                    bg-transparent dark:bg-gray-700 
                    text-gray-900 dark:text-gray-100 
                    placeholder-gray-500 dark:placeholder-gray-400 
                    [appearance:textfield] 
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none
                  "
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2">
                  GENDER
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full px-2 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           bg-transparent dark:bg-gray-700
                           text-gray-900 dark:text-gray-100"
                >
                  <option value="">✨ Select your Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2">
                  HEIGHT (CM) 
                  <p className={`text-xs sm:text-sm text-gray-400 ${formData.height ? 'inline-block' : 'hidden'} ml-2 sm:ml-4`}>
                    Height in Feet: {heightInFeet} ft
                  </p>
                </label>
                <input
                  type="number"
                  name="height"
                  placeholder="Enter height (minimum 140 cm)"
                  value={formData.height}
                  onChange={handleChange}
                  min="140"
                  className="
                    w-full 
                    px-2 sm:px-3 
                    py-2 
                    text-sm sm:text-base
                    border border-gray-300 dark:border-gray-600 
                    rounded-md 
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 
                    bg-transparent dark:bg-gray-700 
                    text-gray-900 dark:text-gray-100 
                    placeholder-gray-500 dark:placeholder-gray-400
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none
                  "
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2">
                  WEIGHT (KG)
                </label>
                <input
                  type="number"
                  name="weight"
                  placeholder="Enter weight (minimum 25 kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  min="25"
                  className="
                    w-full 
                    px-2 sm:px-3 
                    py-2 
                    text-sm sm:text-base
                    border border-gray-300 dark:border-gray-600 
                    rounded-md 
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 
                    bg-transparent dark:bg-gray-700 
                    text-gray-900 dark:text-gray-100 
                    placeholder-gray-500 dark:placeholder-gray-400
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none
                  "
                />
              </div>
            </div>

            <div className="space-y-2 w-full">
              <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-left pl-2">
                ADDITIONAL NOTES
              </label>
              <textarea
                name="otherNotes"
                placeholder="Any other information you'd like to share... (optional)"
                value={formData.otherNotes}
                onChange={handleChange}
                rows={4}
                className="w-full px-2 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         bg-transparent dark:bg-gray-700
                         text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="w-[90%] sm:w-2/3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 
                       text-white py-3 sm:py-4 px-4 sm:px-8 rounded-xl
                       hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700
                       transition-all duration-300 transform hover:scale-[1.02]
                       focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800
                       disabled:opacity-50 disabled:hover:scale-100
                       text-base sm:text-lg font-medium shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <CircularProgress size={20} sx={{ color: 'white' }} />
                  <span className="ml-2 sm:ml-3 text-sm sm:text-base">Creating Your Plan...</span>
                </div>
              ) : (
                <span className="text-sm sm:text-base">Generate Your Personalized Plan</span>
              )}
            </button>
          </div>
        </form>

      <ResponseModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setApiResponse(null); // Clear the response when closing
        }} 
        response={apiResponse}
        className="dark:bg-gray-800 dark:text-white"
      />

      
      <Snackbar 
        open={alert.open} 
        autoHideDuration={3000}
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
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MainForm;
