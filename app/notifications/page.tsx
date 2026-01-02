// Notifications Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useUserStore } from '@/src/presentation/stores/userStore';
import { useEffect, useState } from 'react';

// Mock notifications
const mockNotifications = [
  {
    id: 'notif-1',
    type: 'purchase' as const,
    message: 'Your purchase of "Gradient Button Pack" is complete!',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'sale' as const,
    message: 'You made a sale! "Hero Section Pro" was purchased.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'update' as const,
    message: 'Design Kit v2.0 is here! Check out the new features.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'notif-4',
    type: 'review' as const,
    message: 'New 5-star review on your "Card Collection"!',
    time: '2 days ago',
    read: true,
  },
  {
    id: 'notif-5',
    type: 'promo' as const,
    message: 'Flash Sale! 50% off on all bundles this weekend.',
    time: '3 days ago',
    read: true,
  },
];

const notificationIcons = {
  purchase: '🛒',
  sale: '💰',
  update: '🆕',
  review: '⭐',
  promo: '🎉',
};

export default function NotificationsPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { isAuthenticated, login } = useUserStore();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      login('john@designkit.com');
    }
  }, [isAuthenticated, login]);

  if (!mounted) return null;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h1 className="retro-page-title" style={{ marginBottom: 0 }}>🔔 Notifications</h1>
          {unreadCount > 0 && (
            <button className="retro-btn" onClick={markAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>

        {unreadCount > 0 && (
          <div className="retro-card" style={{ marginBottom: '12px', background: '#ffffcc' }}>
            You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}.
          </div>
        )}

        <div className="retro-groupbox">
          <span className="retro-groupbox-title">All Notifications</span>
          {notifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                padding: '8px',
                borderBottom: '1px solid #808080',
                background: notif.read ? 'transparent' : '#e8e8ff',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: '16px' }}>{notificationIcons[notif.type]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: notif.read ? 'normal' : 'bold' }}>
                  {notif.message}
                </div>
                <div style={{ fontSize: '10px', color: 'gray' }}>{notif.time}</div>
              </div>
              {!notif.read && (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'blue' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🔔 Notifications
          </h1>
          {unreadCount > 0 && (
            <p className="text-gray-600 dark:text-gray-400">
              {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="main-btn main-btn-secondary">
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`main-card flex items-start gap-4 ${!notif.read ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : ''}`}
          >
            <span className="text-2xl">{notificationIcons[notif.type]}</span>
            <div className="flex-1">
              <p className={`text-gray-900 dark:text-white ${!notif.read ? 'font-semibold' : ''}`}>
                {notif.message}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {notif.time}
              </p>
            </div>
            {!notif.read && (
              <span className="w-3 h-3 bg-indigo-500 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
