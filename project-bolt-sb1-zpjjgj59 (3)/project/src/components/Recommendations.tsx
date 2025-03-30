import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface Recommendation {
  image: string;
  name: string;
  genre: string;
  description: string;
}

interface Comment {
  text: string;
  timestamp: Date;
}

const Recommendations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('manga');
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState('');
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const recommendations: Record<string, Recommendation[]> = {
    manga: [
      {
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe",
        name: "The Silent Voice",
        genre: "Drama/Slice of Life",
        description: "A touching story about redemption and friendship."
      },
      {
        image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e",
        name: "Demon Slayer",
        genre: "Action/Supernatural",
        description: "Epic tale of a young demon slayer's journey."
      },
      {
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe",
        name: "One Piece",
        genre: "Adventure/Fantasy",
        description: "The greatest treasure hunt in history."
      }
    ],
    anime: [
      {
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477",
        name: "Cosmic Explorers",
        genre: "Sci-fi/Adventure",
        description: "Journey through space with unforgettable characters."
      },
      {
        image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516",
        name: "Attack on Titan",
        genre: "Dark Fantasy/Action",
        description: "Humanity's last stand against giant threats."
      },
      {
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477",
        name: "Your Name",
        genre: "Romance/Fantasy",
        description: "A beautiful tale of destiny and connection."
      }
    ],
    manhwa: [
      {
        image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516",
        name: "Tower of Dreams",
        genre: "Fantasy/Action",
        description: "A breathtaking vertical world full of mysteries."
      },
      {
        image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e",
        name: "Solo Leveling",
        genre: "Action/Fantasy",
        description: "Rise of the weakest hunter to the strongest."
      },
      {
        image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516",
        name: "The Beginning After The End",
        genre: "Fantasy/Reincarnation",
        description: "A king's second chance at life in a magical world."
      }
    ]
  };

  const handleComment = (itemName: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      text: newComment,
      timestamp: new Date()
    };

    setComments(prev => ({
      ...prev,
      [itemName]: [...(prev[itemName] || []), comment]
    }));

    setNewComment('');
  };

  return (
    <section id="recommendations" className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Recommendations</h2>
      
      <div className="flex space-x-4 mb-8">
        {Object.keys(recommendations).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {recommendations[activeCategory].map((item, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm">{item.genre}</p>
                </div>
                <button
                  onClick={() => setActiveItem(activeItem === item.name ? null : item.name)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <MessageCircle className={`w-6 h-6 ${
                    activeItem === item.name
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`} />
                </button>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
              
              {activeItem === item.name && (
                <div className="mt-4 border-t dark:border-gray-700 pt-4">
                  <div className="mb-4 max-h-40 overflow-y-auto">
                    {(comments[item.name] || []).map((comment, i) => (
                      <div key={i} className="bg-white dark:bg-gray-700 rounded p-3 mb-2">
                        <p className="text-gray-800 dark:text-gray-200">{comment.text}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {comment.timestamp.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => handleComment(item.name)}
                      className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;