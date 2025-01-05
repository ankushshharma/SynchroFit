import './App.css';
import Footer from './components/navbar/Footer';
import Navbar from './components/navbar/Navbar';
import MainForm from './components/Pages/MainForm';
import FitnessLanding from './components/Pages/FitnessLanding';
import AboutUs from './components/Pages/AboutUs';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';

function App() {
  return (
    <LoadingProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<FitnessLanding />} />
            <Route path="/fitness" element={<FitnessLanding />} />
            <Route path="/form" element={<MainForm />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LoadingProvider>
  );
}

export default App;
