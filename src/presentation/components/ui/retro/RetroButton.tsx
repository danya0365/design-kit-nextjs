// RetroButton - Windows 98 style button with outset border
'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

export function RetroButton({
  primary = false,
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: RetroButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`retro-btn ${primary ? 'retro-btn-primary' : ''} ${disabled || loading ? 'opacity-50' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        'Loading...'
      ) : (
        <>
          {leftIcon && <span style={{ marginRight: '4px' }}>{leftIcon}</span>}
          {children}
          {rightIcon && <span style={{ marginLeft: '4px' }}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
