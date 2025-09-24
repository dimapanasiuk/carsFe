import React, { useState } from 'react';
import { clsx } from 'clsx';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header 
      className={clsx(
        'flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200',
        className
      )}
    >
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white"
            placeholder="Search or type"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Search cursor indicator */}
          <div className="absolute inset-y-0 right-3 flex items-center">
            <div className="w-0.5 h-5 bg-orange-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          {/* Notification badge */}
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
            />
            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 block h-3 w-3 bg-green-400 rounded-full ring-2 ring-white" />
          </div>
          
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-gray-900">John Doe</div>
            <div className="text-xs text-gray-500">Administrator</div>
          </div>

          {/* Dropdown arrow */}
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
