import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, DashboardPage, SettingsPage, MessagesPage } from '@/pages';
import { Layout } from '@/components';
import { useAuth } from '@/store';

const App: React.FC = () => {
  const { initAuth } = useAuth();

  useEffect(() => {
    // Initialize authentication on app start
    initAuth();
  }, [initAuth]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth routes without layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Main app routes with layout */}
          <Route path="/" element={<Layout><DashboardPage /></Layout>} />
          <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
          <Route path="/assets" element={<Layout><div className="p-8"><h1 className="text-3xl font-bold">Assets</h1><p className="text-gray-600 mt-2">Assets page coming soon...</p></div></Layout>} />
          <Route path="/booking" element={<Layout><div className="p-8"><h1 className="text-3xl font-bold">Booking</h1><p className="text-gray-600 mt-2">Booking page coming soon...</p></div></Layout>} />
          <Route path="/sell-cars" element={<Layout><div className="p-8"><h1 className="text-3xl font-bold">Sell Cars</h1><p className="text-gray-600 mt-2">Sell Cars page coming soon...</p></div></Layout>} />
          <Route path="/buy-cars" element={<Layout><div className="p-8"><h1 className="text-3xl font-bold">Buy Cars</h1><p className="text-gray-600 mt-2">Buy Cars page coming soon...</p></div></Layout>} />
          <Route path="/services" element={<Layout><div className="p-8"><h1 className="text-3xl font-bold">Services</h1><p className="text-gray-600 mt-2">Services page coming soon...</p></div></Layout>} />
          <Route path="/calendar" element={<Layout><div className="p-8"><h1 className="text-3xl font-bold">Calendar</h1><p className="text-gray-600 mt-2">Calendar page coming soon...</p></div></Layout>} />
          <Route path="/messages" element={<Layout><MessagesPage /></Layout>} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
          
          {/* Legacy routes */}
          <Route path="/home" element={<HomePage />} />
          
          {/* Redirect old routes */}
          <Route path="/signin" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Navigate to="/register" replace />} />
          
          {/* Catch all route - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
