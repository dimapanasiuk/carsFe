import React from 'react';
import { clsx } from 'clsx';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, onChange, checked, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            className="peer sr-only"
            {...props}
          />
          
          <div
            className={clsx(
              'h-4 w-4 rounded border-2 transition-all',
              'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2',
              'dark:peer-focus:ring-primary-400 dark:peer-focus:ring-offset-gray-900',
              {
                'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800': !checked,
                'border-primary-600 bg-primary-600 dark:border-primary-500 dark:bg-primary-500': checked,
                'cursor-not-allowed opacity-50': props.disabled,
                'cursor-pointer': !props.disabled,
              },
              className
            )}
          >
            {checked && (
              <svg
                className="h-3 w-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
        
        {label && (
          <label
            htmlFor={props.id}
            className={clsx(
              'text-base font-medium text-gray-700 dark:text-gray-300',
              {
                'cursor-pointer': !props.disabled,
                'cursor-not-allowed opacity-50': props.disabled,
              }
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
