import React from 'react';
import { Link } from 'react-router-dom';
import { CodeIcon } from './icons/CodeIcon';
import { SettingsIcon } from './icons/SettingsIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-white font-bold text-xl flex items-center gap-2">
              <CodeIcon className="h-8 w-8 text-primary" />
              Interactive Builder
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/settings"
              className="text-gray-400 hover:text-white p-2 rounded-full transition-colors"
              aria-label="Go to Settings"
            >
              <SettingsIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;