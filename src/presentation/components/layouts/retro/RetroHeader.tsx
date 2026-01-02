// RetroHeader - IE5 Browser Chrome style header
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function RetroHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleLayout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [currentUrl] = useState('https://design-kit.local/');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="retro-header">
      {/* Title Bar */}
      <div className="retro-titlebar">
        <div className="retro-titlebar-left">
          <span className="retro-titlebar-icon">🌐</span>
          <span className="retro-titlebar-text">
            Design Kit - Microsoft Internet Explorer
          </span>
        </div>
        <div className="retro-titlebar-controls">
          <button className="retro-titlebar-btn" title="Minimize">_</button>
          <button className="retro-titlebar-btn" title="Maximize">□</button>
          <button className="retro-titlebar-btn retro-close" title="Close">×</button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="retro-menubar">
        <button className="retro-menu-item">
          <span className="retro-menu-underline">F</span>ile
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">E</span>dit
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">V</span>iew
        </button>
        <button className="retro-menu-item">
          F<span className="retro-menu-underline">a</span>vorites
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">T</span>ools
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">H</span>elp
        </button>
      </div>

      {/* Toolbar */}
      <div className="retro-toolbar">
        <button className="retro-toolbar-btn" disabled>
          <span className="retro-toolbar-icon">⬅️</span>
          <span className="retro-toolbar-label">Back</span>
        </button>
        <button className="retro-toolbar-btn" disabled>
          <span className="retro-toolbar-icon">➡️</span>
          <span className="retro-toolbar-label">Forward</span>
        </button>
        <button className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">🔄</span>
          <span className="retro-toolbar-label">Refresh</span>
        </button>
        <button className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">🏠</span>
          <span className="retro-toolbar-label">Home</span>
        </button>
        
        <div className="retro-toolbar-separator"></div>
        
        <button className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">🔍</span>
          <span className="retro-toolbar-label">Search</span>
        </button>
        <button className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">⭐</span>
          <span className="retro-toolbar-label">Favorites</span>
        </button>
        <button className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">📜</span>
          <span className="retro-toolbar-label">History</span>
        </button>

        <div className="retro-toolbar-separator"></div>

        {/* Custom buttons for our app */}
        <button 
          className="retro-toolbar-btn"
          onClick={toggleLayout}
          title="Switch to Modern Layout"
        >
          <span className="retro-toolbar-icon">✨</span>
          <span className="retro-toolbar-label">Modern</span>
        </button>
        <button 
          className="retro-toolbar-btn"
          onClick={handleThemeToggle}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          <span className="retro-toolbar-icon">
            {mounted ? (theme === 'dark' ? '☀️' : '🌙') : '🌙'}
          </span>
          <span className="retro-toolbar-label">Theme</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="retro-addressbar">
        <span className="retro-addressbar-label">Address</span>
        <div className="retro-addressbar-input-wrapper">
          <span className="retro-addressbar-icon">📄</span>
          <input 
            type="text" 
            className="retro-addressbar-input"
            value={currentUrl}
            readOnly
          />
        </div>
        <button className="retro-addressbar-go">Go</button>
      </div>
    </header>
  );
}
