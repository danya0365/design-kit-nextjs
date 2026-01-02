// MainPopover - Modern popover/dropdown component
'use client';

import { animated, useSpring } from '@react-spring/web';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

interface MainPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
}

export function MainPopover({ trigger, children, align = 'left' }: MainPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const spring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.95)',
    config: { tension: 400, friction: 25 },
  });

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div className="relative" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <animated.div 
          style={spring}
          className={`main-popover top-full mt-2 ${alignClasses[align]}`}
        >
          {children}
        </animated.div>
      )}
    </div>
  );
}

// Popover Item Component
interface MainPopoverItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  danger?: boolean;
}

export function MainPopoverItem({ children, onClick, icon, danger }: MainPopoverItemProps) {
  return (
    <button
      onClick={onClick}
      className={`main-popover-item flex items-center gap-2 ${danger ? 'text-red-600 dark:text-red-400' : ''}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
