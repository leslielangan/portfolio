import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GTMAgent from './components/GTMAgent';
import OnboardingAgent from './components/OnboardingAgent';
import CustomerJourneyAgent from './components/CustomerJourneyAgent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gtm-agent" element={<GTMAgent />} />
        <Route path="/onboarding-agent" element={<OnboardingAgent />} />
        <Route path="/customer-journey-agent" element={<CustomerJourneyAgent />} />
      </Routes>
    </Router>
  );
}

export default App;
