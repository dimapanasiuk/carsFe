import React, { useState } from 'react';
import { clsx } from 'clsx';

const BookingPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('new');
  const [selectedBrand, setSelectedBrand] = useState<string>('toyota');

  // Mock car data
  const cars = [
    {
      id: 1,
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      price: '$400/d',
      rating: 4,
      transmission: 'Manual',
      favorite: false,
      image: '/api/placeholder/280/180'
    },
    {
      id: 2,
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      price: '$400/d',
      rating: 4,
      transmission: 'Manual',
      favorite: true,
      image: '/api/placeholder/280/180'
    },
    {
      id: 3,
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      price: '$400/d',
      rating: 4,
      transmission: 'Manual',
      favorite: false,
      image: '/api/placeholder/280/180'
    },
    {
      id: 4,
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      price: '$400/d',
      rating: 4,
      transmission: 'Manual',
      favorite: false,
      image: '/api/placeholder/280/180'
    },
    {
      id: 5,
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      price: '$400/d',
      rating: 4,
      transmission: 'Manual',
      favorite: false,
      image: '/api/placeholder/280/180'
    },
    {
      id: 6,
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      price: '$400/d',
      rating: 4,
      transmission: 'Manual',
      favorite: false,
      image: '/api/placeholder/280/180'
    },
    {
      id: 7,
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      price: '$400/d',
      rating: 4,
      transmission: 'Manual',
      favorite: false,
      image: '/api/placeholder/280/180'
    },
    {
      id: 8,
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      price: '$400/d',
      rating: 4,
      transmission: 'Manual',
      favorite: false,
      image: '/api/placeholder/280/180'
    },
    {
      id: 9,
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      price: '$400/d',
      rating: 4,
      transmission: 'Manual',
      favorite: false,
      image: '/api/placeholder/280/180'
    }
  ];

  const toggleFavorite = (carId: number) => {
    // Handle favorite toggle
    console.log('Toggle favorite for car:', carId);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Booking</h1>
      </div>

      {/* Filters and Controls */}
      <div className="flex items-center justify-between mb-8">
        {/* Left side - Filters */}
        <div className="flex gap-4">
          {/* New Filter */}
          <button
            onClick={() => setSelectedFilter('new')}
            className={clsx(
              'flex items-center gap-3 px-5 py-2 rounded-full border transition-all',
              selectedFilter === 'new'
                ? 'bg-white border-gray-300 shadow-sm'
                : 'bg-gray-50 border-gray-200 hover:bg-white'
            )}
          >
            <span className="font-medium text-gray-700">New</span>
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
                ? 'bg-white border-gray-300 shadow-sm'
                : 'bg-gray-50 border-gray-200 hover:bg-white'
            )}
          >
            <span className="font-medium text-gray-700">Toyota</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Right side - View Controls */}
        <div className="flex gap-4">
          {/* Grid View Button */}
          <button className="p-3 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>

          {/* Filter Button */}
          <button className="p-3 bg-purple-600 rounded-full shadow-sm hover:bg-purple-700 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Car Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{car.name}</h3>
                <p className="text-sm text-gray-500">{car.type}</p>
              </div>
              <button
                onClick={() => toggleFavorite(car.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg 
                  className={clsx('w-5 h-5', car.favorite ? 'text-red-500 fill-current' : 'text-gray-400')} 
                  fill={car.favorite ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Car Image */}
            <div className="bg-gray-100 rounded-xl h-40 mb-4 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-1.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>

            {/* Car Details */}
            <div className="flex items-center justify-between">
              {/* Left side - Rating and Transmission */}
              <div className="flex items-center gap-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-700">{car.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={clsx('w-4 h-4', i < car.rating ? 'text-yellow-400 fill-current' : 'text-gray-300')}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-500">{car.transmission}</span>
                </div>
              </div>

              {/* Right side - Price */}
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{car.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
