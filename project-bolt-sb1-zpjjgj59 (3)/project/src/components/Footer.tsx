import React from 'react';
import { Instagram, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Us</h3>
            <p className="text-sm">
              Anime Society is a community-driven platform dedicated to bringing together anime enthusiasts
              and creating meaningful connections through shared interests.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#weekly" className="hover:text-purple-500 transition-colors">Weekly Activities</a></li>
              <li><a href="#announcements" className="hover:text-purple-500 transition-colors">Announcements</a></li>
              <li><a href="#fanart" className="hover:text-purple-500 transition-colors">Fanart Friday</a></li>
              <li><a href="#spoiler" className="hover:text-purple-500 transition-colors">Spoiler Sunday</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <a href="https://wa.me/1234567890" className="hover:text-purple-500 transition-colors">
                  WhatsApp: +1 (234) 567-890
                </a>
              </li>
              <li>
                <a href="mailto:contact@animesociety.com" className="hover:text-purple-500 transition-colors">
                  contact@animesociety.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} Anime Society. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-purple-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-purple-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm hover:text-purple-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;