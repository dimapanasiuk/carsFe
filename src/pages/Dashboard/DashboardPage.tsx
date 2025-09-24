import React from 'react';
import { clsx } from 'clsx';

const DashboardPage: React.FC = () => {
  // Mock data for metrics
  const metrics = [
    {
      id: 'energy',
      title: 'Energy',
      value: '45%',
      color: 'bg-purple-600',
      iconColor: 'text-white',
      textColor: 'text-white',
      bgGradient: 'from-purple-600 to-purple-700'
    },
    {
      id: 'range',
      title: 'Range',
      value: '157k%',
      color: 'bg-white',
      iconColor: 'text-red-500',
      textColor: 'text-gray-900',
      bgGradient: 'bg-white'
    },
    {
      id: 'break-fluid',
      title: 'Break fluid',
      value: '9%',
      color: 'bg-white',
      iconColor: 'text-purple-500',
      textColor: 'text-gray-900',
      bgGradient: 'bg-white'
    },
    {
      id: 'tire-wear',
      title: 'Tire Wear',
      value: '25%',
      color: 'bg-white',
      iconColor: 'text-yellow-500',
      textColor: 'text-gray-900',
      bgGradient: 'bg-white'
    }
  ];

  // Mock data for car recommendations
  const carRecommendations = [
    {
      id: 1,
      name: 'Mini Cooper',
      recommendation: '64% Recommend',
      image: '/api/placeholder/260/110',
      bgColor: 'bg-yellow-100',
      price: '$32/h'
    },
    {
      id: 2,
      name: 'Porsche 911 Carrera',
      recommendation: '74% Recommend',
      image: '/api/placeholder/260/110',
      bgColor: 'bg-blue-100',
      price: '$28/h'
    },
    {
      id: 3,
      name: 'Porsche 911 Carrera',
      recommendation: '74% Recommend',
      image: '/api/placeholder/260/110',
      bgColor: 'bg-pink-100',
      price: '$25/h'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={metric.id}
            className={clsx(
              'rounded-2xl p-6 shadow-sm border',
              index === 0 
                ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white border-purple-600' 
                : 'bg-white border-gray-200'
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={clsx(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                index === 0 ? 'bg-white/20' : 'bg-gray-100'
              )}>
                {/* Icon based on metric type */}
                {metric.id === 'energy' && (
                  <svg className={clsx('w-6 h-6', index === 0 ? 'text-white' : 'text-purple-600')} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
                  </svg>
                )}
                {metric.id === 'range' && (
                  <svg className={clsx('w-6 h-6', metric.iconColor)} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                )}
                {metric.id === 'break-fluid' && (
                  <svg className={clsx('w-6 h-6', metric.iconColor)} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                )}
                {metric.id === 'tire-wear' && (
                  <svg className={clsx('w-6 h-6', metric.iconColor)} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
                  </svg>
                )}
              </div>
              <h3 className={clsx(
                'text-lg font-semibold',
                index === 0 ? 'text-white' : 'text-gray-900'
              )}>
                {metric.title}
              </h3>
            </div>

            {/* Circular Progress */}
            <div className="flex items-center justify-center">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={index === 0 ? "rgba(255,255,255,0.2)" : "#f3f4f6"}
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={
                      index === 0 ? "white" :
                      metric.id === 'range' ? "#ef4444" :
                      metric.id === 'break-fluid' ? "#a855f7" :
                      "#eab308"
                    }
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${parseInt(metric.value)} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={clsx(
                    'text-2xl font-bold',
                    index === 0 ? 'text-white' : 'text-gray-900'
                  )}>
                    {metric.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Miles Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Miles Statistics</h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">256 Miles</div>
              <div className="text-sm text-gray-500">Total today</div>
            </div>
          </div>
          
          {/* Period selector - moved to top */}
          <div className="flex gap-2 mb-6">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium shadow-sm">Day</button>
            <button className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">Week</button>
            <button className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">Month</button>
          </div>

          <div className="relative h-72">
            {/* Grid lines */}
            <div className="absolute inset-0">
              {[0, 1, 2, 3, 4].map((line) => (
                <div
                  key={line}
                  className="absolute w-full border-t border-gray-100"
                  style={{ top: `${(line / 4) * 100}%` }}
                />
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between h-full px-4 pt-4 pb-8">
              {[
                { time: '1 PM', value: 45, miles: 89 },
                { time: '2 PM', value: 35, miles: 67 },
                { time: '3 PM', value: 85, miles: 157 },
                { time: '4 PM', value: 50, miles: 98 },
                { time: '5 PM', value: 75, miles: 142 },
                { time: '6 PM', value: 40, miles: 78 },
                { time: '7 PM', value: 60, miles: 115 }
              ].map((data, index) => {
                const isActive = index === 2; // 3 PM is active
                return (
                  <div key={data.time} className="flex flex-col items-center group relative">
                    <div 
                      className={clsx(
                        'rounded-t-md mb-2 transition-all duration-300 cursor-pointer relative',
                        isActive 
                          ? 'bg-blue-500 shadow-lg' 
                          : 'bg-gray-300 hover:bg-blue-400 hover:shadow-md'
                      )}
                      style={{ 
                        height: `${data.value}%`,
                        width: '32px'
                      }}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10">
                        <div className="font-semibold">{data.time}</div>
                        <div>{data.miles} Miles</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                    <span className={clsx(
                      'text-xs font-medium',
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    )}>
                      {data.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Active indicator - positioned over the active bar */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm shadow-xl z-20">
              <div className="text-center">
                <div className="font-bold text-orange-300">3 PM</div>
                <div className="text-xs">157k</div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>

          {/* Additional Statistics */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">678</div>
              <div className="text-xs text-gray-500">Miles This Week</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">2.4k</div>
              <div className="text-xs text-gray-500">Miles This Month</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">12.8k</div>
              <div className="text-xs text-gray-500">Total Miles</div>
            </div>
          </div>
        </div>

        {/* Car Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Car Statistics</h3>
            <span className="text-sm text-gray-500">20 February 2022</span>
          </div>
          
          {/* Line Chart */}
          <div className="relative h-52 mb-4">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fecaca" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#fecaca" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              
              {/* Area under curve */}
              <path
                d="M 20 120 Q 80 100 140 110 Q 200 90 260 95 Q 320 85 380 80 L 380 180 L 20 180 Z"
                fill="url(#areaGradient)"
              />
              
              {/* Main line */}
              <path
                d="M 20 120 Q 80 100 140 110 Q 200 90 260 95 Q 320 85 380 80"
                stroke="#f87171"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Data points */}
              <circle cx="140" cy="110" r="3" fill="#f87171"/>
              <circle cx="260" cy="95" r="3" fill="#f87171"/>
              <circle cx="380" cy="80" r="3" fill="#f87171"/>
            </svg>
          </div>

          {/* Time labels */}
          <div className="flex justify-between text-xs text-gray-500 px-2">
            {['7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '3 PM', '7 PM', '8 PM'].map((time) => (
              <span key={time}>{time}</span>
            ))}
          </div>

          {/* Period selector */}
          <div className="flex gap-2 mt-4">
            <button className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">Day</button>
            <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full text-sm">Week</button>
            <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full text-sm">Month</button>
          </div>
        </div>
      </div>

      {/* Car Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {carRecommendations.map((car) => (
          <div
            key={car.id}
            className={clsx(
              'rounded-2xl p-6 shadow-sm border border-gray-200',
              car.bgColor
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-900">{car.recommendation}</span>
            </div>

            {/* Car Image Placeholder */}
            <div className="bg-gray-200 rounded-xl h-28 mb-4 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-1.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold text-gray-900">{car.name}</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">132k</span>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">Manual</span>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"/>
                    </svg>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">{car.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;