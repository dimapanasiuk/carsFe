import React, { useState } from 'react';
import { clsx } from 'clsx';

const SellCarsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('new');
  const [selectedBrand, setSelectedBrand] = useState<string>('toyota');

  // Mock data for analytics
  const analyticsData = [
    {
      id: 1,
      title: 'Offers Analytics',
      centerValue: '$811',
      impressionShare: 75,
      items: [
        { label: 'Model Spend', value: '$1,174', color: 'blue', bgColor: 'bg-blue-100' },
        { label: 'Model Spend', value: '$1,174', color: 'red', bgColor: 'bg-red-100' },
        { label: 'Spend per Unit Turned', value: '$811', color: 'purple', bgColor: 'bg-purple-100' }
      ]
    },
    {
      id: 2,
      title: 'Performance Metrics',
      centerValue: '$811',
      impressionShare: 68,
      items: [
        { label: 'Model Spend', value: '$1,174', color: 'blue', bgColor: 'bg-blue-100' },
        { label: 'Model Spend', value: '$1,174', color: 'red', bgColor: 'bg-red-100' },
        { label: 'Spend per Unit Turned', value: '$811', color: 'purple', bgColor: 'bg-purple-100' }
      ]
    }
  ];

  // Mock tracking history data
  const trackingHistory = [
    { time: '8:00', value: 45 },
    { time: '9:00', value: 52 },
    { time: '10:00', value: 38 },
    { time: '11:00', value: 65 },
    { time: '12:00', value: 42 },
    { time: '13:00', value: 58 },
    { time: '14:00', value: 73 }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sell Cars</h1>
      </div>

      {/* Main Content - Car Card and Tracking History */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
        {/* Left Section - Car Card */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl p-8 h-full">
            {/* Car Image */}
            <div className="relative mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-80 flex items-center justify-center overflow-hidden">
                {/* Car Illustration */}
                <div className="relative w-full h-full">
                  {/* Background shapes */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl"></div>
                    <div className="absolute top-8 left-0 w-full h-32 bg-gradient-to-b from-blue-100/40 to-transparent rounded-t-2xl"></div>
                    <div className="absolute top-16 left-2 w-full h-32 bg-gradient-to-b from-purple-100/30 to-transparent rounded-t-2xl"></div>
                  </div>
                  
                  {/* Car Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-96 h-56 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                      <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-1.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Title */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">2022 Mercedes Benz</h3>
            </div>
          </div>
        </div>

        {/* Right Section - Tracking History */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-black mb-6">Tracking History</h3>
          
          {/* Chart Area */}
          <div className="relative h-80">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4 text-xs text-gray-400">
              <span>30</span>
              <span>25</span>
              <span>20</span>
              <span>15</span>
              <span>10</span>
              <span>5</span>
              <span>0</span>
            </div>
            
            {/* Chart area with margin for Y-axis */}
            <div className="ml-8 h-full relative">
              {/* Grid lines - horizontal */}
              <div className="absolute inset-0">
                {[0, 1, 2, 3, 4, 5, 6].map((line) => (
                  <div
                    key={line}
                    className="absolute w-full border-t border-gray-100"
                    style={{ top: `${(line / 6) * 85 + 7}%` }}
                  />
                ))}
              </div>

              {/* Chart bars */}
              <div className="absolute bottom-12 left-0 right-0 flex items-end justify-between px-4 h-64">
                {/* Monday - light pink */}
                <div className="flex flex-col items-center">
                  <div className="w-10 bg-pink-200 rounded-t-lg" style={{ height: '60px' }}></div>
                </div>
                
                {/* Tuesday - light pink */}
                <div className="flex flex-col items-center">
                  <div className="w-10 bg-pink-200 rounded-t-lg" style={{ height: '80px' }}></div>
                </div>
                
                {/* Wednesday - light pink */}
                <div className="flex flex-col items-center">
                  <div className="w-10 bg-pink-200 rounded-t-lg" style={{ height: '100px' }}></div>
                </div>
                
                {/* Thursday - RED (highlighted) */}
                <div className="flex flex-col items-center relative">
                  <div className="w-10 bg-red-500 rounded-t-lg" style={{ height: '140px' }}></div>
                  {/* Speed indicator */}
                  <div className="absolute -top-8 -right-2">
                    <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                      23km/h
                    </div>
                  </div>
                </div>
                
                {/* Friday - light pink */}
                <div className="flex flex-col items-center">
                  <div className="w-10 bg-pink-200 rounded-t-lg" style={{ height: '70px' }}></div>
                </div>
                
                {/* Saturday - light pink */}
                <div className="flex flex-col items-center">
                  <div className="w-10 bg-pink-200 rounded-t-lg" style={{ height: '90px' }}></div>
                </div>
                
                {/* Sunday - light pink */}
                <div className="flex flex-col items-center">
                  <div className="w-10 bg-pink-200 rounded-t-lg" style={{ height: '50px' }}></div>
                </div>
              </div>

              {/* X-axis labels (days) */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500 py-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Section - Full Width */}
      <div className="w-full">
        {/* Offers Header with Filters */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Offers</h2>
          
          <div className="flex gap-4">
            {/* New Filter */}
            <button
              onClick={() => setSelectedFilter('new')}
              className={clsx(
                'flex items-center gap-3 px-5 py-2 rounded-full border transition-all',
                selectedFilter === 'new'
                  ? 'bg-white border-purple-200 shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:bg-white'
              )}
            >
              <span className={clsx(
                'font-medium',
                selectedFilter === 'new' ? 'text-purple-600' : 'text-gray-700'
              )}>
                New
              </span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Toyota Filter */}
            <button
              onClick={() => setSelectedBrand('toyota')}
              className={clsx(
                'flex items-center gap-3 px-5 py-2 rounded-full border transition-all',
                selectedBrand === 'toyota'
                  ? 'bg-white border-purple-200 shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:bg-white'
              )}
            >
              <span className={clsx(
                'font-medium',
                selectedBrand === 'toyota' ? 'text-purple-600' : 'text-gray-700'
              )}>
                Toyota
              </span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Analytics Cards - Full Width */}
        <div className="space-y-6">
          {analyticsData.map((analytics, index) => (
            <div key={analytics.id} className="bg-white rounded-xl p-6 w-full border border-gray-100">
              <div className="flex items-center gap-8">
                {/* Left side - Name and Price */}
                <div className="min-w-0 flex-shrink-0">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">
                    {index === 0 ? 'Killan James' : 'Sarah Wilson'}
                  </h4>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-red-500">
                      {index === 0 ? '$16,605' : '$18,920'}
                    </span>
                    <span className="text-sm text-gray-500">average price</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    market average is {index === 0 ? '$16,224' : '$17,850'}
                  </p>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                {/* Dotted line separator */}
                <div className="flex-1 border-t-2 border-dotted border-gray-200 mx-4"></div>

                {/* Center - Circular Progress */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24">
                    {/* Background circle */}
                    <div className="absolute inset-0 w-24 h-24 rounded-full bg-gray-100"></div>
                    
                    {/* Progress ring - Green */}
                    <div className="absolute inset-1 w-22 h-22 rounded-full" 
                         style={{ 
                           background: `conic-gradient(#10B981 0deg ${index === 0 ? 162 : 180}deg, transparent ${index === 0 ? 162 : 180}deg 360deg)` 
                         }}>
                    </div>
                    
                    {/* Inner white circle */}
                    <div className="absolute inset-3 w-18 h-18 rounded-full bg-white flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{index === 0 ? '45%' : '50%'}</div>
                        <div className="text-xs text-green-500 font-medium">Excellent</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">Impression Share</p>
                </div>

                {/* Right side - Metrics in row */}
                <div className="flex gap-8 flex-1 justify-end">
                  {/* Circular chart */}
                  <div className="text-center">
                    <div className="relative w-20 h-20 mb-2">
                      {/* Multi-color circular progress */}
                      <div className="absolute inset-0 w-20 h-20 rounded-full bg-gray-100"></div>
                      
                      {/* Purple ring */}
                      <div className="absolute inset-1 w-18 h-18 rounded-full"
                           style={{ 
                             background: `conic-gradient(#8B5CF6 0deg 120deg, transparent 120deg 360deg)` 
                           }}>
                      </div>
                      
                      {/* Red ring */}
                      <div className="absolute inset-2 w-16 h-16 rounded-full"
                           style={{ 
                             background: `conic-gradient(#EF4444 0deg 90deg, transparent 90deg 360deg)` 
                           }}>
                      </div>
                      
                      {/* Yellow ring */}
                      <div className="absolute inset-3 w-14 h-14 rounded-full"
                           style={{ 
                             background: `conic-gradient(#F59E0B 0deg 60deg, transparent 60deg 360deg)` 
                           }}>
                      </div>
                      
                      {/* Center value */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-900">$811</span>
                      </div>
                    </div>
                  </div>

                  {/* Blue metric */}
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-blue-500 mb-1">$1,174</div>
                    <div className="text-xs text-gray-500">Model Spend</div>
                  </div>

                  {/* Red metric */}
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-red-500 mb-1">$1,174</div>
                    <div className="text-xs text-gray-500">Model Spend</div>
                  </div>

                  {/* Purple metric */}
                  <div className="text-center border-2 border-dashed border-purple-300 rounded-lg p-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                      <span className="text-purple-600 font-bold">$</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-500 mb-1">$811</div>
                    <div className="text-xs text-gray-500">Spend per Unit Turned</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellCarsPage;
