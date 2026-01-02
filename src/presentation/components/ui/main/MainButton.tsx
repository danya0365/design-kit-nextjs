// MainButton - Modern button component with variants
'use client';

import { animated, useSpring } from '@react-spring/web';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'main-btn-primary',
  secondary: 'main-btn-secondary',
  ghost: 'main-btn-ghost',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function MainButton({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: MainButtonProps) {
  const [spring, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 400, friction: 20 },
  }));

  const handleMouseDown = () => {
    api.start({ scale: 0.97 });
  };

  const handleMouseUp = () => {
    api.start({ scale: 1 });
  };

  return (
    <animated.button
      style={{ transform: spring.scale.to(s => `scale(${s})`) }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={disabled || loading}
      className={`main-btn ${variantClasses[variant]} ${sizeClasses[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="animate-spin">⏳</span>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </animated.button>
  );
}
