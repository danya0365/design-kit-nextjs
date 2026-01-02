// RetroModal - Windows 98 dialog box style modal
'use client';

import { type ReactNode, useCallback, useEffect } from 'react';

interface RetroModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function RetroModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer 
}: RetroModalProps) {
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
    <div className="retro-modal-overlay" onClick={onClose}>
      <div 
        className="retro-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="retro-modal-titlebar">
          <span className="retro-modal-title">{title}</span>
          <button onClick={onClose} className="retro-modal-close">
            ×
          </button>
        </div>
        <div className="retro-modal-body">
          {children}
        </div>
        {footer && (
          <div className="retro-modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
