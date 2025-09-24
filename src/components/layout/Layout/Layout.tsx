import React from 'react';
import { clsx } from 'clsx';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className, 
  showHeader = true 
}) => {
  return (
    <div className={clsx('flex h-screen bg-gray-50', className)}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {showHeader && <Header />}
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
