import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ScrollIndicator from './components/ScrollIndicator';
import WeeklyActivities from './components/WeeklyActivities';
import Announcements from './components/Announcements';
import FanartFriday from './components/FanartFriday';
import SpoilerSunday from './components/SpoilerSunday';
import Recommendations from './components/Recommendations';
import Footer from './components/Footer';
import Header from './components/Header';
import AIAssistant from './components/AIAssistant';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <Navigation onToggle={setIsMenuOpen} />
        <ScrollIndicator />
        
        <main className={`transition-all duration-300 pt-20 ${isMenuOpen ? 'blur-sm' : ''}`}>
          <WeeklyActivities />
          <Announcements />
          <FanartFriday />
          <SpoilerSunday />
          <Recommendations />
        </main>

        <Footer />
        <AIAssistant />
      </div>
    </ThemeProvider>
  );
}

export default App;