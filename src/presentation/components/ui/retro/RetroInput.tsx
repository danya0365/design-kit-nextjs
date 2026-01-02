// RetroInput - Windows 98 style input
'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

interface RetroInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const RetroInput = forwardRef<HTMLInputElement, RetroInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="mb-2">
        {label && (
          <label className="retro-input-label">
            {label}
            {props.required && <span style={{ color: 'red' }}> *</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`retro-input ${className}`}
          {...props}
        />
        {error && (
          <p style={{ color: 'red', fontSize: '11px', marginTop: '2px' }}>{error}</p>
        )}
      </div>
    );
  }
);

RetroInput.displayName = 'RetroInput';
