import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface FanartImage {
  url: string;
  alt: string;
  artist: string;
  title: string;
  botRating: string;
}

const FanartFriday: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [images] = useState<FanartImage[]>([
    { 
      url: "https://images.unsplash.com/photo-1578632767115-351597cf2477",
      alt: "Anime art style illustration",
      artist: "Sarah Chen",
      title: "Moonlit Dreams",
      botRating: "Exceptional use of lighting and atmosphere! 9.5/10"
    },
    { 
      url: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516",
      alt: "Digital art",
      artist: "Alex Rivera",
      title: "Neon City",
      botRating: "Vibrant color palette and dynamic composition! 9/10"
    },
    { 
      url: "https://images.unsplash.com/photo-1623910986872-2ed36d016fa6",
      alt: "Fantasy artwork",
      artist: "Maria Kowalski",
      title: "Dragon's Realm",
      botRating: "Epic scale and intricate details! 9.8/10"
    },
    { 
      url: "https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229",
      alt: "Character design",
      artist: "James Lee",
      title: "Warrior Spirit",
      botRating: "Dynamic pose and strong character design! 8.5/10"
    },
    { 
      url: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0",
      alt: "Digital illustration",
      artist: "Emma Thompson",
      title: "Forest Guardian",
      botRating: "Mystical atmosphere and beautiful composition! 9.2/10"
    },
    { 
      url: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516",
      alt: "Concept art",
      artist: "David Wang",
      title: "Future Vision",
      botRating: "Innovative style fusion and great execution! 8.8/10"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setShowInfo(false);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleLike = (index: number) => {
    setLikes(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="fanart" className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Fanart Friday</h2>
      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center justify-center">
          <div className="relative w-full overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-none w-full transition-all duration-300 ${
                    index === currentIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-40'
                  }`}
                >
                  <div className="relative aspect-video mx-auto overflow-hidden rounded-lg shadow-xl">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white"
                    >
                      {showInfo && (
                        <>
                          <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                          <p className="text-lg">by {image.artist}</p>
                          <p className="text-sm text-yellow-400 mt-2">{image.botRating}</p>
                        </>
                      )}
                      <div className="flex justify-between items-center mt-4">
                        <button 
                          className="text-sm text-gray-300 hover:text-white"
                          onClick={() => setShowInfo(!showInfo)}
                        >
                          {showInfo ? 'Hide Info' : 'Show Info'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(index);
                          }}
                          className={`p-2 rounded-full transition-colors ${
                            likes[index] ? 'text-red-500' : 'text-white hover:text-red-500'
                          }`}
                        >
                          <Heart className="w-6 h-6" fill={likes[index] ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-purple-600 scale-125'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FanartFriday;