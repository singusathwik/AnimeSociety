import React, { useState } from 'react';

const SpoilerSunday: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  const spoilerImage = {
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477",
    alt: "Latest episode spoiler",
    description: "In the latest episode, our protagonists finally discovered the truth behind the mysterious artifacts and their connection to the ancient civilization. This revelation changes everything we thought we knew about the story's universe!"
  };

  return (
    <section id="spoiler" className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Spoiler Sunday</h2>
      <div className="max-w-2xl mx-auto">
        <div
          onClick={() => setIsRevealed(!isRevealed)}
          className="cursor-pointer relative overflow-hidden rounded-lg"
        >
          <img
            src={spoilerImage.url}
            alt={spoilerImage.alt}
            className={`w-full h-64 object-cover transition-all duration-300 ${
              isRevealed ? '' : 'blur-lg'
            }`}
          />
          {isRevealed && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
              <p className="text-white">{spoilerImage.description}</p>
            </div>
          )}
          {!isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xl font-bold">Click to Reveal Spoiler</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpoilerSunday