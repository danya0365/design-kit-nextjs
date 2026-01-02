// Settings Page - User preferences
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useToastStore } from '@/src/presentation/stores/toastStore';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { toggleLayout } = useLayoutStore();
  const { theme, setTheme } = useTheme();
  const { addToast } = useToastStore();
  const [mounted, setMounted] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    autoDownload: true,
    language: 'en',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSave = () => {
    addToast('Settings saved successfully!', 'success');
  };

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">⚙️ Settings</h1>

        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">🎨 Appearance</span>
          <div style={{ padding: '8px' }}>
            <div style={{ marginBottom: '8px' }}>
              <label className="retro-input-label">Theme</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className={`retro-btn ${theme === 'light' ? 'retro-btn-primary' : ''}`}
                  onClick={() => setTheme('light')}
                >
                  ☀️ Light
                </button>
                <button
                  className={`retro-btn ${theme === 'dark' ? 'retro-btn-primary' : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  🌙 Dark
                </button>
                <button
                  className={`retro-btn ${theme === 'system' ? 'retro-btn-primary' : ''}`}
                  onClick={() => setTheme('system')}
                >
                  💻 System
                </button>
              </div>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label className="retro-input-label">Layout</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="retro-btn"
                  onClick={toggleLayout}
                >
                  ✨ Modern
                </button>
                <button
                  className="retro-btn retro-btn-primary"
                  disabled
                >
                  🖥️ Retro
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">📧 Notifications</span>
          <div style={{ padding: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings(s => ({ ...s, emailNotifications: e.target.checked }))}
              />
              Email notifications
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={settings.marketingEmails}
                onChange={(e) => setSettings(s => ({ ...s, marketingEmails: e.target.checked }))}
              />
              Marketing emails
            </label>
          </div>
        </div>

        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">📥 Downloads</span>
          <div style={{ padding: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={settings.autoDownload}
                onChange={(e) => setSettings(s => ({ ...s, autoDownload: e.target.checked }))}
              />
              Auto-download after purchase
            </label>
          </div>
        </div>

        <button className="retro-btn retro-btn-primary" onClick={handleSave}>
          💾 Save Settings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        ⚙️ Settings
      </h1>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            🎨 Appearance
          </h2>
          <div className="space-y-4">
            <div>
              <label className="main-input-label">Theme</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`main-btn ${theme === 'light' ? 'main-btn-primary' : 'main-btn-secondary'}`}
                >
                  ☀️ Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`main-btn ${theme === 'dark' ? 'main-btn-primary' : 'main-btn-secondary'}`}
                >
                  🌙 Dark
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`main-btn ${theme === 'system' ? 'main-btn-primary' : 'main-btn-secondary'}`}
                >
                  💻 System
                </button>
              </div>
            </div>
            <div>
              <label className="main-input-label">Layout Style</label>
              <div className="flex gap-3">
                <button
                  disabled
                  className="main-btn main-btn-primary"
                >
                  ✨ Modern
                </button>
                <button
                  onClick={toggleLayout}
                  className="main-btn main-btn-secondary"
                >
                  🖥️ Retro (Win98)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            📧 Notifications
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings(s => ({ ...s, emailNotifications: e.target.checked }))}
                className="w-5 h-5 rounded"
              />
              <span className="text-gray-900 dark:text-white">Email notifications for purchases and updates</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.marketingEmails}
                onChange={(e) => setSettings(s => ({ ...s, marketingEmails: e.target.checked }))}
                className="w-5 h-5 rounded"
              />
              <span className="text-gray-900 dark:text-white">Marketing emails and promotions</span>
            </label>
          </div>
        </div>

        {/* Downloads */}
        <div className="main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            📥 Downloads
          </h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoDownload}
              onChange={(e) => setSettings(s => ({ ...s, autoDownload: e.target.checked }))}
              className="w-5 h-5 rounded"
            />
            <span className="text-gray-900 dark:text-white">Auto-download components after purchase</span>
          </label>
        </div>

        {/* Save */}
        <button onClick={handleSave} className="main-btn main-btn-primary">
          💾 Save Settings
        </button>
      </div>
    </div>
  );
}
