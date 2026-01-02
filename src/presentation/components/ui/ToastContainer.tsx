// ToastContainer - Displays toast notifications
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useToastStore } from '@/src/presentation/stores/toastStore';
import { useEffect, useState } from 'react';

const toastStyles = {
  success: {
    main: 'bg-green-500 text-white',
    retro: 'background: #008000; color: white;',
    icon: '✅',
  },
  error: {
    main: 'bg-red-500 text-white',
    retro: 'background: #ff0000; color: white;',
    icon: '❌',
  },
  warning: {
    main: 'bg-yellow-500 text-white',
    retro: 'background: #ffff00; color: black;',
    icon: '⚠️',
  },
  info: {
    main: 'bg-blue-500 text-white',
    retro: 'background: #0000ff; color: white;',
    icon: 'ℹ️',
  },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || toasts.length === 0) return null;

  if (currentLayout === 'retro') {
    return (
      <div style={{
        position: 'fixed',
        bottom: '40px',
        right: '16px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="retro-card"
            style={{
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: '200px',
              ...({ background: toastStyles[toast.type].retro.split(';')[0].split(':')[1].trim() }),
              color: toast.type === 'warning' ? 'black' : 'white',
            }}
          >
            <span>{toastStyles[toast.type].icon}</span>
            <span style={{ flex: 1, fontSize: '12px' }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${toastStyles[toast.type].main} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-64 animate-slide-in`}
        >
          <span>{toastStyles[toast.type].icon}</span>
          <span className="flex-1 text-sm">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="hover:opacity-70"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
