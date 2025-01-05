import React from 'react';
import { 
  Activity,
  Brain, 
  ChevronRight, 
  Dumbbell, 
  Target, 
  Utensils,
  Github,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import JourneySection from './JourneySection';
import FeaturesSection from './FeaturesSection';
import LearnMoreButton from '../ui/LearnMoreButton';
import ConnectwithUs from './ConnectwithUs';

const FitnessLanding = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const features = [
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Customized Workout Plans",
      description: "Choose from multiple exercise types including Cardio, Strength, Yoga, HIIT, and Pilates with flexible scheduling."
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Personalized Nutrition Guidance",
      description: "Get complete meal plans tailored to your dietary preferences and restrictions."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Adaptation",
      description: "Receive plans adjusted to your lifestyle and watch them evolve as you progress."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal-Focused Planning",
      description: "Whether it's weight loss, muscle gain, or general fitness, we've got you covered."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Fill Questionnaire",
      description: "Tell us about your goals and preferences"
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our AI processes your unique requirements"
    },
    {
      number: "03",
      title: "Get Your Plan",
      description: "Receive your personalized 4-week program"
    },
    {
      number: "04",
      title: "Start Journey",
      description: "Begin your transformation with detailed guidance"
    }
  ];

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-500 
      shadow-[inset_0px_0px_20px_rgba(0,0,0,0.02)] ${
      !mounted ? 'opacity-0' : 'opacity-100'
    }`}>

      <Header/>
      <div className="space-y-0">
        <FeaturesSection mounted={mounted} features={features} />
        <div className="-mt-24">
          <JourneySection mounted={mounted} steps={steps} />
        </div>
      </div>

      <div className="my-12 mb-12">
        <LearnMoreButton/>
      </div>

      <ConnectwithUs mounted={mounted} />
    </div>
  );
};

export default FitnessLanding;