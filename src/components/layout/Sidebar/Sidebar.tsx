import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <rect x="2" y="2" width="6" height="6" rx="1" />
        <rect x="12" y="2" width="6" height="6" rx="1" />
        <rect x="2" y="12" width="6" height="6" rx="1" />
        <rect x="12" y="12" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    id: 'assets',
    label: 'Assets',
    path: '/assets',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2L3 7v11h14V7l-7-5z" />
        <path d="M8 12h4v4H8v-4z" />
      </svg>
    ),
  },
  {
    id: 'booking',
    label: 'Booking',
    path: '/booking',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z" />
        <path d="M8 2v4M12 2v4M2 8h16" />
      </svg>
    ),
  },
  {
    id: 'sell-cars',
    label: 'Sell Cars',
    path: '/sell-cars',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 4V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h3a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 0 1 0-2h3zM9 2v2h6V2H9z" />
      </svg>
    ),
  },
  {
    id: 'buy-cars',
    label: 'Buy Cars',
    path: '/buy-cars',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 0 0 0 2h1.22l.305 1.222a.997.997 0 0 0 .01.042L5.77 9.5h8.46l1.24-5h-6.47a1 1 0 0 0 0 2h4.53l-.31 1H5.77l-.31-1.222A.997.997 0 0 0 5.45 6H4a1 1 0 0 0 0-2h1.45z" />
        <circle cx="7" cy="16" r="1" />
        <circle cx="15" cy="16" r="1" />
      </svg>
    ),
  },
  {
    id: 'services',
    label: 'Services',
    path: '/services',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.394 2.08a1 1 0 0 0-.788 0l-7 3a1 1 0 0 0 0 1.84L5.25 8.051a.999.999 0 0 1 .356-.257l4-1.714a1 1 0 0 1 .788 0l4 1.714c.124.053.23.123.356.257l2.644-1.131a1 1 0 0 0 0-1.84l-7-3z" />
      </svg>
    ),
  },
  {
    id: 'calendar',
    label: 'Calendar',
    path: '/calendar',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <rect x="3" y="4" width="14" height="14" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="17" y2="10" />
      </svg>
    ),
  },
  {
    id: 'messages',
    label: 'Messages',
    path: '/messages',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 0 1-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
      </svg>
    ),
  },
];

const bottomNavItems: NavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" />
        <path d="M10 7a3 3 0 1 0 3 3 3 3 0 0 0-3-3z" />
      </svg>
    ),
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside 
      className={clsx(
        // Base styles
        'flex flex-col h-full bg-white border-r border-gray-200',
        // Width and padding
        'w-64 px-6 py-8',
        // Shadow
        'shadow-sm',
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-9">
        <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-md">
          <div className="w-4 h-4 bg-white rounded-sm" />
        </div>
        <span className="text-xl font-bold text-gray-900">Motiv.</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {mainNavItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    // Base styles
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    // Active styles
                    {
                      'bg-purple-50 text-purple-700 border border-purple-200': isActive,
                      'text-gray-600 hover:text-gray-900 hover:bg-gray-50': !isActive,
                    }
                  )
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ul className="space-y-2">
          {bottomNavItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    // Base styles
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    // Active styles
                    {
                      'bg-purple-50 text-purple-700 border border-purple-200': isActive,
                      'text-gray-600 hover:text-gray-900 hover:bg-gray-50': !isActive,
                    }
                  )
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          className="flex items-center gap-2 w-full px-3 py-2 mt-2 text-sm font-medium text-gray-600 rounded-md transition-colors hover:text-gray-900 hover:bg-gray-50"
          onClick={() => {
            // TODO: Implement logout functionality
            console.log('Logout clicked');
          }}
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1zM10.293 9.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L11.586 14H5a1 1 0 1 1 0-2h6.586l-1.293-1.293a1 1 0 0 1 0-1.414z" />
          </svg>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
