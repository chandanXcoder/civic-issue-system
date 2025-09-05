import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold">Civic Issues Platform</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A comprehensive platform for citizens to report civic issues and for government 
              administrators to manage and resolve them efficiently. Built for the Government of Jharkhand.
            </p>
            <div className="text-sm text-gray-400">
              © 2024 Government of Jharkhand. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-gray-300 hover:text-white transition-colors">
                  Report Issue
                </Link>
              </li>
              <li>
                <Link to="/my-issues" className="text-gray-300 hover:text-white transition-colors">
                  My Issues
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <div>
                <p className="font-medium">Government of Jharkhand</p>
                <p className="text-sm">Clean & Green Technology Initiative</p>
              </div>
              <div>
                <p className="text-sm">Email: support@civic-issues.gov.in</p>
                <p className="text-sm">Phone: +91-XXX-XXXX-XXXX</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              Built with ❤️ for the people of Jharkhand
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
