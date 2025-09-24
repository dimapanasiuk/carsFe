import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create test user in development
if (import.meta.env.DEV) {
  import('./utils/createTestUser');
}

// Get the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Create root and render the app
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
