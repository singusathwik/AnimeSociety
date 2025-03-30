import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  onToggle: (isOpen: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  const scrollToFooter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      onToggle(false);
    }
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <ThemeToggle />
        <button
          onClick={toggleMenu}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-800 dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
          )}
        </button>
      </div>

      <nav
        className={`fixed top-0 right-0 w-64 h-screen bg-white dark:bg-gray-900 transform transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 pt-20">
          <ul className="space-y-4">
            <li>
              <a href="#weekly" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Weekly Activities</a>
            </li>
            <li>
              <a href="#announcements" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Announcements</a>
            </li>
            <li>
              <a href="#fanart" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Fanart Friday</a>
            </li>
            <li>
              <a href="#spoiler" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Spoiler Sunday</a>
            </li>
            <li>
              <a href="#recommendations" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Recommendations</a>
            </li>
            <li>
              <a href="#" onClick={scrollToFooter} className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Contact Us</a>
            </li>
            <li className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;