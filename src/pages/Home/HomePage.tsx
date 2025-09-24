import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { useUI, useAuth } from '@/store';

export const HomePage: React.FC = () => {
  const { theme, toggleTheme } = useUI();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Cars Frontend
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </Button>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Welcome, {user?.firstName}!
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button size="sm" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Welcome to Cars Frontend
          </h2>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            A modern React application built with Vite, TypeScript, and Tailwind CSS. 
            This is your starting point for building amazing car management features.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">
              Get Started
            </Button>
            
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="⚡ Fast Development"
            description="Built with Vite for lightning-fast development and hot module replacement."
          />
          
          <FeatureCard
            title="🔧 TypeScript"
            description="Fully typed with TypeScript for better developer experience and code quality."
          />
          
          <FeatureCard
            title="🎨 Tailwind CSS"
            description="Beautiful, responsive design with Tailwind CSS and dark mode support."
          />
          
          <FeatureCard
            title="📦 Zustand"
            description="Lightweight state management with Zustand for predictable state updates."
          />
          
          <FeatureCard
            title="🧪 Testing Ready"
            description="Pre-configured with Vitest and React Testing Library for comprehensive testing."
          />
          
          <FeatureCard
            title="📱 Responsive"
            description="Mobile-first responsive design that works perfectly on all devices."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
