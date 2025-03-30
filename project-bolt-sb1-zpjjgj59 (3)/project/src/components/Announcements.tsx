import React, { useState } from 'react';

interface Announcement {
  title: string;
  content: string;
}

const Announcements: React.FC = () => {
  const [activeAnnouncement, setActiveAnnouncement] = useState<number | null>(null);

  const announcements: Announcement[] = [
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

  return (
    <section id="announcements" className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Announcements</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            onClick={() => setActiveAnnouncement(activeAnnouncement === index ? null : index)}
            className={`cursor-pointer transition-all duration-300 ${
              activeAnnouncement !== null && activeAnnouncement !== index
                ? 'opacity-50 blur-sm'
                : ''
            }`}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-full transform hover:scale-105 transition-transform shadow-sm">
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">{announcement.title}</h3>
              {activeAnnouncement === index ? (
                <p className="text-gray-600 dark:text-gray-300">{announcement.content}</p>
              ) : (
                <button className="text-white bg-purple-600 dark:bg-purple-500 px-4 py-2 rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors">
                  Click Here
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Announcements