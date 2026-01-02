"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useToastStore } from "@/src/presentation/stores/toastStore";
import { useState } from "react";

export function SettingsView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { addToast } = useToastStore();
  const [settings, setSettings] = useState({
    email: "demo@designkit.com",
    darkMode: false,
    emailNotifications: true,
    newsletter: true,
  });

  const handleSave = () => {
    addToast("Settings saved!", "success");
  };

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">⚙️ Settings</h1>
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">👤 Account</span>
          <div style={{ padding: "8px" }}>
            <div style={{ marginBottom: "8px" }}>
              <label style={{ fontSize: "11px", display: "block" }}>Email:</label>
              <input type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} className="retro-input" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">🔔 Notifications</span>
          <div style={{ padding: "8px", fontSize: "11px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>
              <input type="checkbox" checked={settings.emailNotifications} onChange={e => setSettings({...settings, emailNotifications: e.target.checked})} /> Email Notifications
            </label>
            <label style={{ display: "block" }}>
              <input type="checkbox" checked={settings.newsletter} onChange={e => setSettings({...settings, newsletter: e.target.checked})} /> Newsletter
            </label>
          </div>
        </div>
        <button onClick={handleSave} className="retro-btn retro-btn-primary">💾 Save Settings</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">⚙️ Settings</h1>
      <div className="space-y-6">
        <div className="main-card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">👤 Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} className="main-input w-full" />
            </div>
          </div>
        </div>
        <div className="main-card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔔 Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={settings.emailNotifications} onChange={e => setSettings({...settings, emailNotifications: e.target.checked})} className="w-5 h-5" />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={settings.newsletter} onChange={e => setSettings({...settings, newsletter: e.target.checked})} className="w-5 h-5" />
              <span>Newsletter</span>
            </label>
          </div>
        </div>
        <button onClick={handleSave} className="main-btn main-btn-primary w-full">💾 Save Settings</button>
      </div>
    </div>
  );
}
