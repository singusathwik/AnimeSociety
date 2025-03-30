import React from 'react';
import { Tv2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-gradient-to-b from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm transition-colors duration-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center">
          <Tv2 className="w-8 h-8 text-purple-500" />
          <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Anime Society
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header