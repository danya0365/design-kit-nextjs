// RetroFooter - Windows 98 Status Bar style footer
'use client';

import { useEffect, useState } from 'react';

export function RetroFooter() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="retro-footer">
      <div className="retro-statusbar">
        <div className="retro-statusbar-section retro-statusbar-main">
          <span className="retro-statusbar-icon">✅</span>
          <span>Done</span>
        </div>
        <div className="retro-statusbar-section retro-statusbar-zone">
          <span className="retro-statusbar-icon">🌐</span>
          <span>Internet</span>
        </div>
        <div className="retro-statusbar-section">
          <span className="retro-statusbar-icon">🔒</span>
        </div>
        <div className="retro-statusbar-section">
          <span>{currentTime}</span>
        </div>
      </div>
    </footer>
  );
}
