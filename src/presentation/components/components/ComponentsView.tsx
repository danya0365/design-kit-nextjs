// ComponentsView - Main entry point that switches between Main and Retro views
'use client';

import type { ComponentsViewModel } from '@/src/presentation/presenters/components/ComponentsPresenter';
import { useComponentsPresenter } from '@/src/presentation/presenters/components/useComponentsPresenter';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { MainComponentsView } from './MainComponentsView';
import { RetroComponentsView } from './RetroComponentsView';

interface ComponentsViewProps {
  initialViewModel?: ComponentsViewModel;
}

export function ComponentsView({ initialViewModel }: ComponentsViewProps) {
  const [state, actions] = useComponentsPresenter(initialViewModel);
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const viewModel = state.viewModel;

  // Loading state
  if (state.loading && !viewModel) {
    if (currentLayout === 'retro') {
      return (
        <div className="retro-page">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading components...</p>
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
            <button className="retro-btn" onClick={() => actions.loadData()}>
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
          <p className="text-red-600 dark:text-red-400 mb-4">{state.error}</p>
          <button onClick={() => actions.loadData()} className="main-btn main-btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!viewModel) return null;

  if (currentLayout === 'retro') {
    return <RetroComponentsView viewModel={viewModel} actions={actions} loading={state.loading} />;
  }

  return <MainComponentsView viewModel={viewModel} actions={actions} loading={state.loading} />;
}
