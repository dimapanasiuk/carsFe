import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Checkbox } from '@/components/ui';
import { useAuth } from '@/store';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearAuthError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) clearAuthError();
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });
      
      navigate('/');
    } catch (err) {
      // Error is handled by the store
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-14">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-figma-dark dark:text-white">
            Get's started.
          </h1>
          <p className="text-lg font-medium text-figma-text dark:text-gray-400">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-figma-purple hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Main Form Container */}
        <div className="space-y-8">
          {/* Social Login Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 h-15 px-8 bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
              onClick={() => handleSocialLogin('google')}
            >
              <div className="flex items-center gap-3">
                <GoogleIcon />
                <span className="text-gray-900 dark:text-white font-medium">
                  Sign in with Google
                </span>
              </div>
            </Button>
            
            <Button
              className="flex-1 h-15 px-8 bg-figma-facebook hover:bg-blue-700"
              onClick={() => handleSocialLogin('facebook')}
            >
              <div className="flex items-center gap-3">
                <FacebookIcon />
                <span className="text-white font-medium">
                  Sign in with Facebook
                </span>
              </div>
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
              or
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[10px] p-5 shadow-[0px_10px_110px_1px_rgba(59,59,59,0.08)] space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder="uistore@gmail.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                className="border-gray-200 dark:border-gray-600"
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="**********"
                value={formData.password}
                onChange={handleInputChange('password')}
                showPasswordToggle
                required
                className="border-gray-200 dark:border-gray-600"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <Checkbox
                id="rememberMe"
                label="Remember me"
                checked={formData.rememberMe}
                onChange={handleCheckboxChange}
              />
              
              <Link 
                to="/forgot-password"
                className="text-base font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="w-full h-15 bg-figma-purple hover:bg-primary-700 text-white font-bold text-xl"
              disabled={!formData.email || !formData.password}
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Google Icon Component
const GoogleIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M19.9999 10.2273C19.9999 9.51825 19.9363 8.83643 19.8181 8.18188H10.2V12.0501H15.7818C15.5409 13.3001 14.8636 14.3592 13.8636 15.0683V17.5774H17.0909C18.9545 15.8365 19.9999 13.2683 19.9999 10.2273Z"
      fill="#4285F4"
    />
    <path
      d="M10.2 20C12.9545 20 15.2727 19.1045 17.0909 17.5774L13.8636 15.0683C12.9909 15.6683 11.8636 16.0228 10.2 16.0228C7.54545 16.0228 5.29091 14.2637 4.50909 11.9001H1.18182V14.4910C2.99091 17.9819 6.35455 20 10.2 20Z"
      fill="#34A853"
    />
    <path
      d="M4.50909 11.9001C4.30909 11.3001 4.19091 10.6592 4.19091 10.0001C4.19091 9.34097 4.30909 8.70006 4.50909 8.10006V5.50915H1.18182C0.527273 6.80915 0.159091 8.35915 0.159091 10.0001C0.159091 11.641 0.527273 13.191 1.18182 14.491L4.50909 11.9001Z"
      fill="#FBBC05"
    />
    <path
      d="M10.2 3.97727C11.9818 3.97727 13.5818 4.58636 14.8364 5.79545L17.6909 2.94091C15.2682 0.681818 12.9545 -0.431818 10.2 0.0363636C6.35455 0.218182 2.99091 2.23636 1.18182 5.50909L4.50909 8.09999C5.29091 5.73636 7.54545 3.97727 10.2 3.97727Z"
      fill="#EA4335"
    />
  </svg>
);

// Facebook Icon Component
const FacebookIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M24 12C24 5.37258 18.6274 0 12 0S0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
      fill="currentColor"
    />
  </svg>
);
