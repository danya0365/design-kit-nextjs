// RetroPopover - Windows 98 style menu/popover
'use client';

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

interface RetroPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
}

export function RetroPopover({ trigger, children, align = 'left' }: RetroPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

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

  return (
    <div style={{ position: 'relative' }} ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div 
          className="retro-popover"
          style={{ 
            top: '100%', 
            marginTop: '2px',
            [align === 'right' ? 'right' : 'left']: 0 
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// Popover Item Component
interface RetroPopoverItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}

export function RetroPopoverItem({ children, onClick, icon, disabled }: RetroPopoverItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`retro-popover-item ${disabled ? 'opacity-50' : ''}`}
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export function RetroPopoverSeparator() {
  return <div className="retro-popover-separator" />;
}
