// MainModal - Modern modal component with backdrop blur
'use client';

import { animated, useSpring } from '@react-spring/web';
import { type ReactNode, useCallback, useEffect } from 'react';

interface MainModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function MainModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md' 
}: MainModalProps) {
  // Animation
  const overlaySpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 20 },
  });

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-20px)',
    config: { tension: 300, friction: 20 },
  });

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <animated.div 
      style={overlaySpring}
      className="main-modal-overlay"
      onClick={onClose}
    >
      <animated.div 
        style={modalSpring}
        className={`main-modal ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="main-modal-header">
          <h2 className="main-modal-title">{title}</h2>
          <button onClick={onClose} className="main-modal-close">
            ✕
          </button>
        </div>
        <div className="main-modal-body">
          {children}
        </div>
        {footer && (
          <div className="main-modal-footer">
            {footer}
          </div>
        )}
      </animated.div>
    </animated.div>
  );
}
