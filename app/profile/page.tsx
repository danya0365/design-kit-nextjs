// Profile Page - User account settings
'use client';

import { mockUsers } from '@/src/data/mock/users';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useUserStore } from '@/src/presentation/stores/userStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { currentUser, isAuthenticated, login, logout } = useUserStore();
  const [email, setEmail] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email);
    if (!success) {
      alert('User not found. Try: john@designkit.com, sarah@designkit.com, or admin@designkit.com');
    }
  };

  // Not logged in - show login form
  if (!isAuthenticated) {
    if (currentLayout === 'retro') {
      return (
        <div className="retro-page">
          <h1 className="retro-page-title">🔐 Login</h1>
          <div className="retro-card" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '12px' }}>
                <label className="retro-input-label">Email:</label>
                <input
                  type="email"
                  className="retro-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button type="submit" className="retro-btn retro-btn-primary" style={{ width: '100%' }}>
                Login
              </button>
            </form>
            <div style={{ marginTop: '12px', fontSize: '11px', color: 'gray' }}>
              <p>Demo accounts:</p>
              <ul>
                {mockUsers.map(u => (
                  <li key={u.id}>
                    <button 
                      className="retro-link"
                      style={{ cursor: 'pointer' }}
                      onClick={() => { setEmail(u.email); login(u.email); }}
                    >
                      {u.email} ({u.role})
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="main-card">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="main-input-label">Email</label>
              <input
                type="email"
                className="main-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit" className="w-full main-btn main-btn-primary">
              Login
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Demo accounts:</p>
            <div className="space-y-2">
              {mockUsers.map(u => (
                <button 
                  key={u.id}
                  onClick={() => { setEmail(u.email); login(u.email); }}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{u.name}</div>
                  <div className="text-sm text-gray-500">{u.email} • {u.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged in - show profile
  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">👤 My Profile</h1>
        
        <div className="retro-card" style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              style={{ width: '64px', height: '64px', borderRadius: '4px', border: '2px outset #c0c0c0' }}
            />
            <div>
              <h2 style={{ fontWeight: 'bold' }}>{currentUser?.name}</h2>
              <p style={{ fontSize: '12px', color: 'gray' }}>{currentUser?.email}</p>
              <p style={{ fontSize: '11px' }}>
                Role: <strong>{currentUser?.role}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
          <span className="retro-groupbox-title">Quick Links</span>
          <div style={{ padding: '8px' }}>
            {currentUser?.role === 'creator' && (
              <Link href="/dashboard" className="retro-link" style={{ display: 'block', marginBottom: '4px' }}>
                📊 Dashboard
              </Link>
            )}
            <Link href="/cart" className="retro-link" style={{ display: 'block', marginBottom: '4px' }}>
              🛒 My Cart
            </Link>
            <Link href="/components" className="retro-link" style={{ display: 'block', marginBottom: '4px' }}>
              📦 Browse Components
            </Link>
          </div>
        </div>

        <button className="retro-btn" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        My Profile
      </h1>

      <div className="main-card mb-6">
        <div className="flex items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentUser?.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{currentUser?.email}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
              currentUser?.role === 'admin' 
                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                : currentUser?.role === 'creator'
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {currentUser?.role}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {currentUser?.role === 'creator' && (
          <Link href="/dashboard" className="main-card hover:border-indigo-500 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Dashboard</div>
                <div className="text-sm text-gray-500">Manage your components</div>
              </div>
            </div>
          </Link>
        )}
        <Link href="/cart" className="main-card hover:border-indigo-500 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛒</span>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">My Cart</div>
              <div className="text-sm text-gray-500">View cart items</div>
            </div>
          </div>
        </Link>
        <Link href="/components" className="main-card hover:border-indigo-500 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📦</span>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Components</div>
              <div className="text-sm text-gray-500">Browse all components</div>
            </div>
          </div>
        </Link>
      </div>

      <button onClick={logout} className="main-btn main-btn-secondary">
        Logout
      </button>
    </div>
  );
}
