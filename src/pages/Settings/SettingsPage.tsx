import React, { useState } from 'react';
import { clsx } from 'clsx';

type SettingsTab = 'profile' | 'password' | 'email' | 'notification';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [formData, setFormData] = useState({
    // Profile data
    liveIn: 'Zurich, Switzerland',
    streetAddress: '2445 Crosswind Drive',
    email: 'uihutofficial@gmail.com',
    dateOfBirth: '07.12.1995',
    gender: 'Male',
    // Social profiles
    facebook: '',
    twitter: '',
    // Password data
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    // Email data
    newEmail: '',
    // Notification settings
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
  });

  const tabs = [
    { id: 'profile' as SettingsTab, label: 'My details' },
    { id: 'profile' as SettingsTab, label: 'Profile' },
    { id: 'password' as SettingsTab, label: 'Password' },
    { id: 'email' as SettingsTab, label: 'Email' },
    { id: 'notification' as SettingsTab, label: 'Notification' },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileContent();
      case 'password':
        return renderPasswordContent();
      case 'email':
        return renderEmailContent();
      case 'notification':
        return renderNotificationContent();
      default:
        return renderProfileContent();
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        
        {/* Tabs Navigation */}
        <div className="flex items-center gap-12 mt-8">
          {tabs.map((tab, index) => {
            const isActive = (index === 1 && activeTab === 'profile') || 
                           (index === 2 && activeTab === 'password') ||
                           (index === 3 && activeTab === 'email') ||
                           (index === 4 && activeTab === 'notification');
            
            return (
              <button
                key={`${tab.label}-${index}`}
                onClick={() => {
                  if (index === 0 || index === 1) setActiveTab('profile');
                  else if (index === 2) setActiveTab('password');
                  else if (index === 3) setActiveTab('email');
                  else if (index === 4) setActiveTab('notification');
                }}
                className={clsx(
                  'text-lg font-medium transition-all cursor-pointer rounded',
                  isActive
                    ? 'text-purple-700 bg-purple-100 px-4 py-2'
                    : 'text-gray-500 hover:text-gray-700 px-2 py-1'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {renderTabContent()}
    </div>
  );

  function renderProfileContent() {
    return (
      <div className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Section Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Profile</h2>
            <p className="text-gray-600 mt-1">Update your photo and personal details here.</p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Live In */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live in
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={formData.liveIn}
                      onChange={(e) => handleInputChange('liveIn', e.target.value)}
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Email Address - Full Width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative max-w-2xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your photo</h3>
                  <p className="text-sm text-gray-600">This will be displayed on your profile.</p>
                </div>
                
                {/* Profile Photo */}
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-gray-200"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                  />
                </div>
              </div>

              {/* Photo Actions */}
              <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
                  Delete
                </button>
                <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Profiles Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Social Profiles</h3>
              
              <div className="flex flex-col gap-4">
                <input
                  type="url"
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="facebook.com/"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                />
                <input
                  type="url"
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="twitter.com/"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  function renderPasswordContent() {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Password Settings</h2>
            <p className="text-gray-600 mt-1">Update your password to keep your account secure.</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
              </div>
              
              <div className="pt-4">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderEmailContent() {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Email Settings</h2>
            <p className="text-gray-600 mt-1">Manage your email preferences and update your email address.</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Email
                </label>
                <input
                  type="email"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  value={formData.email}
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Email Address
                </label>
                <input
                  type="email"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter new email address"
                  value={formData.newEmail}
                  onChange={(e) => handleInputChange('newEmail', e.target.value)}
                />
              </div>
              
              <div className="pt-4">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Update Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderNotificationContent() {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Notification Settings</h2>
            <p className="text-gray-600 mt-1">Configure how you want to receive notifications.</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <button 
                  onClick={() => handleInputChange('emailNotifications', !formData.emailNotifications)}
                  className={clsx(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    formData.emailNotifications ? 'bg-purple-600' : 'bg-gray-200'
                  )}
                >
                  <span 
                    className={clsx(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      formData.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    )} 
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-600">Receive push notifications in your browser</p>
                </div>
                <button 
                  onClick={() => handleInputChange('pushNotifications', !formData.pushNotifications)}
                  className={clsx(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    formData.pushNotifications ? 'bg-purple-600' : 'bg-gray-200'
                  )}
                >
                  <span 
                    className={clsx(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      formData.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    )} 
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                </div>
                <button 
                  onClick={() => handleInputChange('smsNotifications', !formData.smsNotifications)}
                  className={clsx(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    formData.smsNotifications ? 'bg-purple-600' : 'bg-gray-200'
                  )}
                >
                  <span 
                    className={clsx(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      formData.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                    )} 
                  />
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Save Notification Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SettingsPage;