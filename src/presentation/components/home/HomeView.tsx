// HomeView - Main entry point that switches between Main and Retro views
'use client';

import type { HomeViewModel } from '@/src/presentation/presenters/home/HomePresenter';
import { useHomePresenter } from '@/src/presentation/presenters/home/useHomePresenter';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { MainHomeView } from './MainHomeView';
import { RetroHomeView } from './RetroHomeView';

interface HomeViewProps {
  initialViewModel?: HomeViewModel;
}

export function HomeView({ initialViewModel }: HomeViewProps) {
  const [state, actions] = useHomePresenter(initialViewModel);
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const viewModel = state.viewModel;

  // Loading state
  if (state.loading && !viewModel) {
    if (currentLayout === 'retro') {
      return (
        <div className="retro-page">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading...</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading components...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error && !viewModel) {
    if (currentLayout === 'retro') {
      return (
        <div className="retro-page">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'red' }}>Error: {state.error}</p>
            <button className="retro-btn" onClick={actions.loadData}>
              Retry
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 font-medium mb-2">Error</p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{state.error}</p>
          <button
            onClick={actions.loadData}
            className="main-btn main-btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data
  if (!viewModel) {
    return null;
  }

  // Render appropriate view based on layout
  if (currentLayout === 'retro') {
    return <RetroHomeView viewModel={viewModel} />;
  }

  return <MainHomeView viewModel={viewModel} />;
}
