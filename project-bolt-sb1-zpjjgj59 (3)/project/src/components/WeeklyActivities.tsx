import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface Activity {
  title: string;
  content: string;
}

const WeeklyActivities: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isFirstYearWeek, setIsFirstYearWeek] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstYearActivities: Activity[] = [
    { title: 'Monday Study Group', content: 'Basic programming concepts and algorithms' },
    { title: 'Wednesday Workshop', content: 'Hands-on coding exercises' }
  ];

  const upperYearActivities: Activity[] = [
    { title: 'Advanced Projects', content: 'Working on real-world applications' },
    { title: 'Technical Discussions', content: 'Deep dives into advanced topics' }
  ];

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    setIsFirstYearWeek(true);
    setActiveSection(null);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const isWednesday = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.getDay() === 3; // 3 represents Wednesday
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isWed = isWednesday(day);
      days.push(
        <div
          key={day}
          className={`h-8 flex items-center justify-center rounded-full transition-all duration-200
            ${isWed ? 'bg-purple-600 text-white cursor-pointer hover:bg-purple-700' : 
            'text-gray-600 dark:text-gray-400'}`}
          onClick={() => isWed && setIsFirstYearWeek(!isFirstYearWeek)}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeMonth(-1)} className="p-1">
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button onClick={() => changeMonth(1)} className="p-1">
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <section id="weekly" className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Weekly Activities</h2>
      
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleCalendar}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span>Toggle Calendar</span>
        </button>
      </div>

      {showCalendar && (
        <div className="mb-8 max-w-md mx-auto">
          {renderCalendar()}
          {isWednesday(new Date().getDate()) && (
            <div className="mt-4 bg-purple-100 dark:bg-purple-900 rounded-lg p-4">
              <p className="text-purple-800 dark:text-purple-200">
                {isFirstYearWeek 
                  ? 'Wednesday Workshop: Hands-on coding exercises'
                  : 'Wednesday Workshop: Advanced project implementation'}
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className={`p-6 rounded-lg bg-gray-100 dark:bg-gray-800 transition-all duration-300 ${
          activeSection && activeSection !== 'first' ? 'opacity-50 blur-sm' : ''
        }`}>
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">1st Years</h3>
          <div className="space-y-4">
            {firstYearActivities.map((activity, index) => (
              <div key={index} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <h4 className="text-gray-900 dark:text-white font-medium mb-2">{activity.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{activity.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-lg bg-gray-100 dark:bg-gray-800 transition-all duration-300 ${
          activeSection && activeSection !== 'upper' ? 'opacity-50 blur-sm' : ''
        }`}>
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">2nd & 3rd Years</h3>
          <div className="space-y-4">
            {upperYearActivities.map((activity, index) => (
              <div key={index} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <h4 className="text-gray-900 dark:text-white font-medium mb-2">{activity.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{activity.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyActivities