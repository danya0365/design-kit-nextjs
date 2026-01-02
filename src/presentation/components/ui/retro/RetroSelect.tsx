// RetroSelect - Windows 98 style select dropdown
'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';

interface RetroSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const RetroSelect = forwardRef<HTMLSelectElement, RetroSelectProps>(
  ({ label, error, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="mb-2">
        {label && (
          <label className="retro-input-label">
            {label}
            {props.required && <span style={{ color: 'red' }}> *</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`retro-select ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p style={{ color: 'red', fontSize: '11px', marginTop: '2px' }}>{error}</p>
        )}
      </div>
    );
  }
);

RetroSelect.displayName = 'RetroSelect';
