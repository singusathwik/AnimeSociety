import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Message {
  text: string;
  isUser: boolean;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const firstYearActivities = [
    { title: 'Monday Study Group', content: 'Basic programming concepts and algorithms' },
    { title: 'Wednesday Workshop', content: 'Hands-on coding exercises' },
    { title: 'Friday Review', content: 'Weekly progress review and Q&A session' }
  ];

  const announcements = [
    {
      title: "Upcoming Events",
      content: "Join us for the annual coding competition next month! Registration opens soon."
    },
    {
      title: "Community Updates",
      content: "New learning resources have been added to our library. Check them out!"
    },
    {
      title: "Important Dates",
      content: "Mark your calendars for the end-of-semester project presentations."
    }
  ];

  const artworks = [
    { 
      title: "Moonlit Dreams",
      artist: "Sarah Chen",
      description: "A serene nighttime scene with anime-inspired characters."
    },
    { 
      title: "Neon City",
      artist: "Alex Rivera",
      description: "A cyberpunk cityscape with vibrant colors."
    },
    { 
      title: "Dragon's Realm",
      artist: "Maria Kowalski",
      description: "An epic fantasy scene featuring a majestic dragon."
    },
    { 
      title: "Warrior Spirit",
      artist: "James Lee",
      description: "A dynamic action pose of a samurai character."
    },
    { 
      title: "Forest Guardian",
      artist: "Emma Thompson",
      description: "A mystical forest scene with a protective spirit."
    },
    { 
      title: "Future Vision",
      artist: "David Wang",
      description: "A futuristic interpretation of traditional anime style."
    }
  ];

  const contactInfo = {
    email: "contact@animesociety.com",
    social: {
      twitter: "@AnimeSociety",
      instagram: "@AnimeSocietyOfficial",
      github: "github.com/AnimeSociety",
      youtube: "youtube.com/@AnimeSociety"
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const getFirstYearActivitiesResponse = () => {
    return "Here are the activities for 1st years:\n\n" +
      firstYearActivities.map(activity => 
        `${activity.title}: ${activity.content}`
      ).join("\n\n");
  };

  const getAnnouncementsResponse = () => {
    return "Here are the current announcements:\n\n" +
      announcements.map(announcement => 
        `${announcement.title}: ${announcement.content}`
      ).join("\n\n");
  };

  const getArtworkInfo = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const artwork = artworks.find(art => 
      art.title.toLowerCase().includes(lowerQuery) || 
      art.artist.toLowerCase().includes(lowerQuery)
    );

    if (artwork) {
      document.getElementById('fanart')?.scrollIntoView({ behavior: 'smooth' });
      return `"${artwork.title}" by ${artwork.artist}\n${artwork.description}`;
    }
    return null;
  };

  const getContactInfo = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('email') || lowerType.includes('mail')) {
      return `You can reach us at: ${contactInfo.email}`;
    } else if (lowerType.includes('follow') || lowerType.includes('social')) {
      return "Follow us on:\n\n" +
        `Twitter: ${contactInfo.social.twitter}\n` +
        `Instagram: ${contactInfo.social.instagram}\n` +
        `YouTube: ${contactInfo.social.youtube}\n` +
        `GitHub: ${contactInfo.social.github}`;
    }
    return null;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();
    let response = '';

    // Check for artwork queries first
    const artworkInfo = getArtworkInfo(lowerInput);
    if (artworkInfo) {
      response = artworkInfo;
    }
    // Check for contact/social media queries
    else if (lowerInput.includes('email') || lowerInput.includes('mail') || 
             lowerInput.includes('follow') || lowerInput.includes('social')) {
      const contactResponse = getContactInfo(lowerInput);
      response = contactResponse || "How would you like to connect with us? You can ask for our email or social media links!";
    }
    // Existing query handling
    else if (lowerInput.includes('first year') || lowerInput.includes('1st year')) {
      response = getFirstYearActivitiesResponse();
      document.getElementById('weekly')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lowerInput.includes('announcement')) {
      response = getAnnouncementsResponse();
      document.getElementById('announcements')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lowerInput.includes('weekly activities')) {
      document.getElementById('weekly')?.scrollIntoView({ behavior: 'smooth' });
      response = "I've scrolled to the Weekly Activities section. You can ask specifically about first year or upper year activities!";
    } else if (lowerInput.includes('fanart')) {
      document.getElementById('fanart')?.scrollIntoView({ behavior: 'smooth' });
      response = "Here's our Fanart Friday section! You can ask me about specific artworks or artists.";
    } else if (lowerInput.includes('spoiler')) {
      document.getElementById('spoiler')?.scrollIntoView({ behavior: 'smooth' });
      response = "Check out the latest episode spoilers. Make sure to click to reveal!";
    } else if (lowerInput.includes('recommend')) {
      document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' });
      response = "Browse through our curated recommendations for manga, anime, and manhwa!";
    } else {
      response = "How can I help you? You can ask me about:\n\n" +
        "• First year activities\n" +
        "• Weekly activities\n" +
        "• Current announcements\n" +
        "• Fanart Friday (ask about specific artworks!)\n" +
        "• Spoiler Sunday\n" +
        "• Recommendations\n" +
        "• Contact information\n" +
        "• Social media links";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors ${
          theme === 'light' ? 'text-white' : 'text-white'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          {/* Header */}
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">How can I help you?</p>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatRef}
            className="p-4 h-80 overflow-y-auto space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                    message.isUser
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;