// Keyboard Shortcuts Modal
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useEffect } from 'react';
import { create } from 'zustand';

// Store for shortcuts modal
interface ShortcutsModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useShortcutsModalStore = create<ShortcutsModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

const shortcuts = [
  { category: 'Navigation', items: [
    { keys: ['⌘', 'K'], description: 'Open search' },
    { keys: ['⌘', '/'], description: 'Toggle keyboard shortcuts' },
    { keys: ['G', 'H'], description: 'Go to home' },
    { keys: ['G', 'C'], description: 'Go to components' },
    { keys: ['G', 'D'], description: 'Go to dashboard' },
  ]},
  { category: 'Actions', items: [
    { keys: ['⌘', 'B'], description: 'Toggle sidebar' },
    { keys: ['⌘', '⇧', 'L'], description: 'Toggle layout' },
    { keys: ['⌘', '⇧', 'D'], description: 'Toggle dark mode' },
    { keys: ['Esc'], description: 'Close modal/popover' },
  ]},
  { category: 'Component Page', items: [
    { keys: ['F'], description: 'Toggle favorite' },
    { keys: ['C'], description: 'Copy code' },
    { keys: ['A'], description: 'Add to cart' },
  ]},
];

export function KeyboardShortcutsModal() {
  const { isOpen, close } = useShortcutsModalStore();
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  // Keyboard shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        useShortcutsModalStore.getState().toggle();
      }
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  if (currentLayout === 'retro') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={close}
      >
        <div
          className="retro-card"
          style={{ width: '450px', maxWidth: '90%', maxHeight: '90vh', overflow: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="retro-card-header" style={{ marginBottom: '8px' }}>
            <span className="retro-card-icon">⌨️</span>
            <span className="retro-card-title">Keyboard Shortcuts</span>
            <button onClick={close} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}>
              ×
            </button>
          </div>

          {shortcuts.map((section) => (
            <div key={section.category} className="retro-groupbox" style={{ marginBottom: '8px' }}>
              <span className="retro-groupbox-title">{section.category}</span>
              <div style={{ padding: '4px' }}>
                {section.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '12px' }}>
                    <span>{item.description}</span>
                    <span>
                      {item.keys.map((key, j) => (
                        <span
                          key={j}
                          style={{
                            display: 'inline-block',
                            padding: '2px 6px',
                            background: '#c0c0c0',
                            border: '2px outset #c0c0c0',
                            marginLeft: '2px',
                            fontFamily: 'monospace',
                            fontSize: '10px',
                          }}
                        >
                          {key}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <button className="retro-btn" onClick={close}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={close}
    >
      <div
        className="main-card w-full max-w-lg mx-4 max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            ⌨️ Keyboard Shortcuts
          </h2>
          <button onClick={close} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {shortcuts.map((section) => (
            <div key={section.category}>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <span className="text-gray-700 dark:text-gray-300">{item.description}</span>
                    <div className="flex gap-1">
                      {item.keys.map((key, j) => (
                        <kbd
                          key={j}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm font-mono"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500">
          Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs">⌘/</kbd> to toggle
        </div>
      </div>
    </div>
  );
}
