import React, { useState, useEffect } from 'react';

const ScrollIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30">
      <div className="h-20 w-1 bg-gray-300 dark:bg-gray-700 rounded-full relative">
        <div
          className="absolute w-3 h-3 bg-purple-500 rounded-full -left-1 transition-transform duration-200"
          style={{ transform: `translateY(${scrollProgress}%)` }}
        />
      </div>
    </div>
  );
};

export default ScrollIndicator