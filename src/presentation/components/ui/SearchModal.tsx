// SearchModal - Global search with Cmd+K shortcut
'use client';

import { mockCategories } from '@/src/data/mock/categories';
import { mockComponents } from '@/src/data/mock/components';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useSearchStore } from '@/src/presentation/stores/searchStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export function SearchModal() {
  const { isOpen, query, closeSearch, setQuery } = useSearchStore();
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase();
    const components = mockComponents
      .filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      )
      .slice(0, 5)
      .map(c => ({ type: 'component' as const, id: c.id, name: c.name, icon: c.category?.icon || '📦', href: `/components/${c.id}` }));
    
    const categories = mockCategories
      .filter(c => c.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map(c => ({ type: 'category' as const, id: c.id, name: c.name, icon: c.icon, href: `/components?category=${c.id}` }));
    
    return [...components, ...categories];
  }, [query]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        useSearchStore.getState().toggleSearch();
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        closeSearch();
      }
      
      // Arrow navigation
      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          const selected = results[selectedIndex];
          if (selected) {
            router.push(selected.href);
            closeSearch();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeSearch, results, selectedIndex, router]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '100px',
        }}
        onClick={closeSearch}
      >
        <div
          className="retro-card"
          style={{ width: '500px', maxWidth: '90%' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="retro-card-header" style={{ marginBottom: '8px' }}>
            <span className="retro-card-icon">🔍</span>
            <span className="retro-card-title">Search</span>
            <button
              onClick={closeSearch}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
          <input
            type="text"
            className="retro-input"
            placeholder="Search components, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{ width: '100%', marginBottom: '8px' }}
          />
          {results.length > 0 && (
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {results.map((result, index) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={result.href}
                  onClick={closeSearch}
                  style={{
                    display: 'block',
                    padding: '8px',
                    background: index === selectedIndex ? '#000080' : 'transparent',
                    color: index === selectedIndex ? 'white' : 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  {result.icon} {result.name}
                  <span style={{ fontSize: '10px', marginLeft: '8px', opacity: 0.7 }}>
                    {result.type}
                  </span>
                </Link>
              ))}
            </div>
          )}
          {query && results.length === 0 && (
            <p style={{ padding: '16px', textAlign: 'center', color: 'gray' }}>
              No results found
            </p>
          )}
          <div style={{ marginTop: '8px', fontSize: '10px', color: 'gray', display: 'flex', gap: '16px' }}>
            <span>↑↓ Navigate</span>
            <span>Enter Select</span>
            <span>Esc Close</span>
          </div>
        </div>
      </div>
    );
  }

  // Main Layout
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-24"
      onClick={closeSearch}
    >
      <div
        className="main-card w-full max-w-xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            className="w-full px-12 py-4 bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none text-lg"
            placeholder="Search components, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={closeSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            Esc
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto py-2">
            {results.map((result, index) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={result.href}
                onClick={closeSearch}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  index === selectedIndex
                    ? 'bg-indigo-50 dark:bg-indigo-900/30'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">{result.icon}</span>
                <span className="flex-1 font-medium text-gray-900 dark:text-white">
                  {result.name}
                </span>
                <span className="text-xs text-gray-400 capitalize">{result.type}</span>
              </Link>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <p className="py-8 text-center text-gray-500">No results found</p>
        )}

        <div className="flex items-center gap-6 px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400">
          <span>↑↓ Navigate</span>
          <span>Enter Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
}
