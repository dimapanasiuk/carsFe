import React, { useState } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onChange?: (value: string) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    label,
    error,
    helperText,
    startIcon,
    endIcon,
    showPasswordToggle = false,
    type = 'text',
    onChange,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="flex flex-col gap-3">
        {label && (
          <label className="text-base font-medium text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        
        <div className="relative">
          <div
            className={clsx(
              'flex items-center gap-3 rounded-[10px] border bg-white px-5 py-[19px] transition-all',
              'dark:bg-gray-800',
              {
                'border-gray-300 dark:border-gray-600': !error && !isFocused,
                'border-primary-500 dark:border-primary-400': !error && isFocused,
                'border-red-500 dark:border-red-400': error,
                'shadow-[0px_10px_110px_1px_rgba(59,59,59,0.08)]': isFocused,
              },
              className
            )}
          >
            {startIcon && (
              <div className="flex-shrink-0 text-gray-400">
                {startIcon}
              </div>
            )}
            
            <input
              ref={ref}
              type={inputType}
              className={clsx(
                'flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-400',
                'focus:outline-none dark:text-white dark:placeholder:text-gray-500',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleChange}
              {...props}
            />
            
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            )}
            
            {endIcon && !showPasswordToggle && (
              <div className="flex-shrink-0 text-gray-400">
                {endIcon}
              </div>
            )}
          </div>
        </div>
        
        {(error || helperText) && (
          <div className="text-sm">
            {error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">{helperText}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Eye icons for password visibility toggle
const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);
