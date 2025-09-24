import React, { useState } from 'react';
import { clsx } from 'clsx';

const ServicesPage: React.FC = () => {
  // Service station buttons data - exactly as in Figma
  const topRowStations = [
    { id: 'A1', label: 'A1', status: 'normal' },
    { id: 'A2', label: 'A2', status: 'normal' },
    { id: 'A3', label: 'A3', status: 'normal' },
    { id: 'A4', label: 'A4', status: 'booked' }, // Red with shadow
    { id: 'A5', label: 'A5', status: 'normal' },
    { id: 'A6', label: 'A6', status: 'normal' },
    { id: 'A7', label: 'A7', status: 'normal' },
    { id: 'A8', label: 'A8', status: 'normal' },
    { id: 'A9', label: 'A9', status: 'normal' },
    { id: 'A10', label: 'A10', status: 'booked' } // Red with shadow
  ];

  const bottomRowStations = [
    { id: 'B1', label: 'B1', status: 'booked' }, // Red with shadow
    { id: 'B2', label: 'B2', status: 'normal' },
    { id: 'B3', label: 'B3', status: 'normal' },
    { id: 'B4', label: 'B4', status: 'normal' },
    { id: 'B5', label: 'B5', status: 'normal' },
    { id: 'B6', label: 'B6', status: 'normal' },
    { id: 'B7', label: 'B7', status: 'booked' }, // Red with shadow
    { id: 'B8', label: 'B8', status: 'normal' },
    { id: 'B9', label: 'B9', status: 'current' }, // Purple with shadow
    { id: 'B10', label: 'B10', status: 'normal' }
  ];

  // Service data for progress bars
  const serviceData = [
    { name: 'Oil Level', progress: 73, color: 'bg-purple-500', icon: '🛢️' },
    { name: 'Brake Pads', progress: 41, color: 'bg-green-500', icon: '🔧' },
    { name: 'Steering', progress: 17, color: 'bg-yellow-500', icon: '🚗' },
    { name: 'Oil Level', progress: 73, color: 'bg-orange-500', icon: '🛢️' }
  ];

  const statusLegend = [
    { key: 'ready', label: 'Ready', color: 'border-gray-400', bgColor: 'bg-white' },
    { key: 'booked', label: 'Booked', color: 'border-red-500', bgColor: 'bg-red-500' },
    { key: 'current', label: 'Current Station', color: 'border-purple-500', bgColor: 'bg-purple-500' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Service Station Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Station</h2>
            
            <div className="space-y-4">
              {/* Top Row */}
              <div className="flex gap-2.5">
                {topRowStations.map((station) => (
                  <button
                    key={station.id}
                    className={clsx(
                      'w-12 h-16 rounded-md font-bold text-lg flex items-center justify-center transition-all',
                      station.status === 'normal' && 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300',
                      station.status === 'booked' && 'bg-red-500 text-white shadow-lg shadow-red-200',
                      station.status === 'current' && 'bg-purple-500 text-white shadow-lg shadow-purple-200'
                    )}
                  >
                    {station.label}
                  </button>
                ))}
              </div>
              
              {/* Bottom Row */}
              <div className="flex gap-2.5">
                {bottomRowStations.map((station) => (
                  <button
                    key={station.id}
                    className={clsx(
                      'w-12 h-16 rounded-md font-bold text-lg flex items-center justify-center transition-all',
                      station.status === 'normal' && 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300',
                      station.status === 'booked' && 'bg-red-500 text-white shadow-lg shadow-red-200',
                      station.status === 'current' && 'bg-purple-500 text-white shadow-lg shadow-purple-200'
                    )}
                  >
                    {station.label}
                  </button>
                ))}
              </div>
              
              {/* Status Legend - Below bottom row */}
              <div className="flex items-center justify-center gap-8 pt-6">
                {statusLegend.map((status) => (
                  <div key={status.key} className="flex items-center gap-2">
                    <div 
                      className={clsx(
                        'w-3 h-3 rounded-full',
                        status.key === 'ready' && 'bg-white border-2 border-gray-400',
                        status.key === 'booked' && 'bg-red-500',
                        status.key === 'current' && 'bg-purple-500'
                      )}
                    />
                    <span className="text-gray-700 font-medium text-base">{status.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Order Section */}
          <div className="space-y-5">
            <div className="flex gap-5">
              {/* Left - Your Order */}
              <div className="bg-white rounded-xl p-8 flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Order</h3>
                <div className="w-36 h-36 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-500 text-sm">Order Summary</p>
                  </div>
                </div>
              </div>
              
              {/* Right - Service Options */}
              <div className="space-y-3 w-88">
                {/* Brake fluid change */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Brake fluid change</p>
                        <p className="text-sm text-gray-500">$35</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Diagnostics */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Diagnostics</p>
                        <p className="text-sm text-gray-500">$25</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* External Washing */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">External Washing</p>
                        <p className="text-sm text-gray-500">$26</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Add Services */}
                <div className="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-4 text-center hover:bg-purple-100 transition-colors cursor-pointer">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-purple-700 font-semibold">Add Services</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pay Button */}
            <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-2xl hover:bg-purple-700 transition-colors">
              Pay $86
            </button>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Service Required Card */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Required</h2>
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex gap-4">
                {/* Left Column - Icons and Connectors */}
                <div className="flex flex-col items-center gap-3">
                  {/* First Service - Center Care */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full" style={{ backgroundColor: 'rgba(112, 207, 151, 0.1)' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-0.5 h-10 bg-green-500 rounded-full"></div>
                  
                  {/* Second Service - Diagnostics */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full" style={{ backgroundColor: 'rgba(161, 98, 247, 0.1)' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-0.5 h-10 bg-purple-500 rounded-full"></div>
                  
                  {/* Third Service - Inner Cleaning */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full" style={{ backgroundColor: 'rgba(255, 126, 134, 0.1)' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Service Names */}
                <div className="flex flex-col gap-11 pt-1">
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-gray-700">Center Care</h3>
                    <div className="flex items-center gap-4">
                      {/* Placeholder for additional content if needed */}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-gray-700">Diagnostics</h3>
                    <div className="flex items-center gap-4">
                      {/* Placeholder for additional content if needed */}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-gray-700">Inner Cleaning</h3>
                    <div className="flex items-center gap-4">
                      {/* Placeholder for additional content if needed */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Schedule */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Schedule</h2>
            <div className="space-y-6">
              {/* Schedule Item 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-5">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-base">
                      Upgrade your favorite car<br />periodically
                    </p>
                  </div>
                </div>
                
                <div className="ml-11 flex items-center justify-end text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <span>Today, 10.00</span>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <span>Fix Price : $1,200</span>
                  </div>
                </div>
              </div>
              
              {/* Schedule Item 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-5">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-base">
                      Regular maintenance check
                    </p>
                  </div>
                </div>
                
                <div className="ml-11 flex items-center justify-end text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <span>Today, 14.00</span>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <span>Fix Price : $1,400</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Status Cards - Full Width */}
      <div className="bg-white rounded-xl p-8 mt-8">
        <div className="flex justify-between gap-8">
          {serviceData.map((service, index) => (
            <div key={index} className="space-y-4 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-16 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-black">{service.name}</h3>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative w-full h-1 bg-gray-200 rounded-full">
                <div 
                  className={clsx('absolute left-0 top-0 h-full rounded-full', service.color)}
                  style={{ width: `${service.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
