import React from 'react';
import { clsx } from 'clsx';

const AssetsPage: React.FC = () => {
  // Mock data for sensors
  const sensors = [
    { name: 'Asset - Fuel Consumed', value: 'LV', status: 'active' },
    { name: 'Asset - Odometer', value: 'LV', status: 'warning' },
    { name: 'Asset - Ignition', value: 'Lrv', status: 'active' },
    { name: 'Asset - Speed', value: 'Irv', status: 'error' },
    { name: 'Engine Temperature', value: 'C', status: 'active' }
  ];

  // Mock data for reminders
  const reminders = [
    {
      description: 'Urgent Safety Recall',
      due: '06/04/2022',
      overdue: '08/04/2022',
      notify: 'David Demo',
      status: 'Completed'
    },
    {
      description: 'Urgent Safety Recall',
      due: '06/04/2022',
      overdue: '08/04/2022',
      notify: 'David Demo',
      status: 'Completed'
    }
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Assets</h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Main Car Card */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden min-h-[800px]">
            {/* Car Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Fuel Usage */}
              <div>
                <p className="text-blue-100 text-sm mb-1">Fuel Usage</p>
                <p className="text-2xl font-bold">2903.89 Ltr</p>
              </div>
              
              {/* KM Driven */}
              <div>
                <p className="text-blue-100 text-sm mb-1">KM Driven</p>
                <p className="text-2xl font-bold">2903.89 Ltr</p>
              </div>
              
              {/* Total Cost */}
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Cost</p>
                <p className="text-2xl font-bold">$3,00,290.00</p>
              </div>
              
              {/* Top Speed */}
              <div>
                <p className="text-blue-100 text-sm mb-1">Top Speed</p>
                <p className="text-2xl font-bold">$5.2K</p>
              </div>
            </div>

            {/* Car Image */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <div className="w-full h-[400px] relative">
                {/* Car illustration placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Car body shadow */}
                    <div className="absolute top-8 left-4 w-72 h-48 bg-black opacity-10 rounded-2xl transform rotate-1"></div>
                    
                    {/* Main car body */}
                    <div className="relative w-80 h-52 bg-gradient-to-b from-gray-300 to-gray-500 rounded-2xl shadow-2xl">
                      {/* Car roof */}
                      <div className="absolute top-4 left-8 right-8 h-20 bg-gradient-to-b from-gray-200 to-gray-400 rounded-t-xl"></div>
                      
                      {/* Windows */}
                      <div className="absolute top-6 left-10 right-10 h-16 bg-gradient-to-b from-blue-200 to-blue-400 rounded-t-lg opacity-60"></div>
                      
                      {/* Front and rear lights */}
                      <div className="absolute top-28 left-2 w-4 h-8 bg-yellow-200 rounded-l-lg"></div>
                      <div className="absolute top-28 right-2 w-4 h-8 bg-red-300 rounded-r-lg"></div>
                      
                      {/* Wheels */}
                      <div className="absolute -bottom-4 left-12 w-12 h-12 bg-gray-800 rounded-full border-4 border-gray-600"></div>
                      <div className="absolute -bottom-4 right-12 w-12 h-12 bg-gray-800 rounded-full border-4 border-gray-600"></div>
                      
                      {/* Wheel centers */}
                      <div className="absolute -bottom-1 left-15 w-6 h-6 bg-gray-400 rounded-full"></div>
                      <div className="absolute -bottom-1 right-15 w-6 h-6 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Combined */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Activity Chart - Top */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-gray-900">Activity</h3>
              <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">View All</button>
            </div>

            {/* Chart Container */}
            <div className="relative">
              {/* Chart Area */}
              <div className="relative h-56 mb-4 rounded-lg overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-purple-25 to-white"></div>
                
                {/* Chart SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4"/>
                      <stop offset="50%" stopColor="#A855F7" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#A855F7" stopOpacity="0.05"/>
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Grid lines */}
                  <g stroke="#E5E7EB" strokeWidth="0.5" opacity="0.3">
                    <line x1="0" y1="40" x2="800" y2="40"/>
                    <line x1="0" y1="80" x2="800" y2="80"/>
                    <line x1="0" y1="120" x2="800" y2="120"/>
                    <line x1="0" y1="160" x2="800" y2="160"/>
                    
                    {/* Vertical grid lines */}
                    {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((x, index) => (
                      <line key={index} x1={x} y1="0" x2={x} y2="180" stroke="#E5E7EB" strokeWidth="0.5" opacity="0.2"/>
                    ))}
                  </g>
                  
                  {/* Area under curve */}
                  <path
                    d="M 40 140 Q 120 110 200 120 Q 280 130 360 115 Q 440 100 520 95 Q 600 90 680 85 Q 720 82 760 80 L 760 180 L 40 180 Z"
                    fill="url(#chartGradient)"
                  />
                  
                  {/* Main curve line */}
                  <path
                    d="M 40 140 Q 120 110 200 120 Q 280 130 360 115 Q 440 100 520 95 Q 600 90 680 85 Q 720 82 760 80"
                    stroke="#A855F7"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />
                  
                  {/* Data points */}
                  <circle cx="200" cy="120" r="4" fill="#A855F7" stroke="white" strokeWidth="2"/>
                  <circle cx="360" cy="115" r="4" fill="#A855F7" stroke="white" strokeWidth="2"/>
                  <circle cx="520" cy="95" r="4" fill="#A855F7" stroke="white" strokeWidth="2"/>
                  <circle cx="680" cy="85" r="4" fill="#A855F7" stroke="white" strokeWidth="2"/>
                </svg>

                {/* Tooltip */}
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-3 rounded-xl text-sm shadow-lg">
                  <div className="text-xs opacity-90 mb-1">Traveled last month</div>
                  <div className="font-bold text-lg">50 Km</div>
                  {/* Tooltip arrow */}
                  <div className="absolute -bottom-1 right-6 w-2 h-2 bg-purple-600 transform rotate-45"></div>
                </div>
              </div>

              {/* Time labels */}
              <div className="grid grid-cols-12 gap-1 text-xs text-gray-400 px-2">
                {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month, index) => (
                  <span key={index} className={clsx(
                    'text-center',
                    index === 3 ? 'text-purple-600 font-semibold' : 'text-gray-400'
                  )}>{month}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Row - Notices and Sensors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notices */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-[400px] overflow-y-auto">
              <h3 className="text-xl font-medium text-gray-900 mb-6">Notices</h3>
              
              <div className="space-y-4">
                {/* Notice 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">Monday, 6th April 2020</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        COMPLETED
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">New Oil Change Service</p>
                    <p className="text-xs text-gray-400">SEPT 2019-NOV</p>
                  </div>
                </div>

                {/* Notice 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">Thursday, 24th October 2021</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Vehicle's Oil has been replaced for next</p>
                    <p className="text-xs text-gray-400">SEPT 2019-NOV</p>
                  </div>
                </div>

                {/* Notice 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">Monday, 10th August 2018</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Maintenance has been done for engine</p>
                    <p className="text-xs text-gray-400">MARCH 2019-NOV</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Sensors */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-[400px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-black">Available Sensors</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Assets</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="border-t border-gray-200 mb-5"></div>

              <div className="space-y-4">
                {sensors.map((sensor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={clsx(
                          'w-2 h-2 rounded-full',
                          sensor.status === 'active' && 'bg-green-500',
                          sensor.status === 'warning' && 'bg-yellow-500',
                          sensor.status === 'error' && 'bg-red-500'
                        )}></div>
                        {/* Status icon */}
                        <div className="absolute -right-1 -top-1">
                          {sensor.status === 'active' && (
                            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                          {sensor.status === 'error' && (
                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-900">{sensor.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">{sensor.value}</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-5 bg-red-500 text-white py-2.5 px-4 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
                See All
              </button>
            </div>
          </div>

          {/* Reminder - Below Notices and Sensors */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-black">Reminder</h3>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New
              </button>
            </div>

            <div className="border-t border-gray-200 mb-6"></div>

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-8 text-sm font-medium text-gray-500 mb-4 pb-4 border-b border-gray-100">
              <span>Description</span>
              <span>Due</span>
              <span>Overdue</span>
              <span>Notify</span>
              <span>Status</span>
            </div>

            {/* Table Rows */}
            <div className="space-y-4">
              {reminders.map((reminder, index) => (
                <div key={index}>
                  <div className="grid grid-cols-5 gap-8 text-sm text-gray-900 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="font-medium text-gray-800">{reminder.description}</span>
                    <span className="text-gray-600">{reminder.due}</span>
                    <span className="text-gray-600">{reminder.overdue}</span>
                    <span className="text-gray-600">{reminder.notify}</span>
                    <span className="text-gray-800 font-medium">{reminder.status}</span>
                  </div>
                  {index < reminders.length - 1 && <div className="border-t border-gray-100"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsPage;
