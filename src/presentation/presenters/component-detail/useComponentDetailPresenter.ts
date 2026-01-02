"use client";

import { useCallback, useEffect, useState } from "react";
import { ComponentDetailViewModel } from "./ComponentDetailPresenter";
import { createClientComponentDetailPresenter } from "./ComponentDetailPresenterClientFactory";

// Initialize presenter instance once (singleton pattern)
const presenter = createClientComponentDetailPresenter();

export interface ComponentDetailPresenterState {
  viewModel: ComponentDetailViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface ComponentDetailPresenterActions {
  loadData: (componentId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for ComponentDetail presenter
 */
export function useComponentDetailPresenter(
  componentId: string,
  initialViewModel?: ComponentDetailViewModel
): [ComponentDetailPresenterState, ComponentDetailPresenterActions] {
  const [viewModel, setViewModel] = useState<ComponentDetailViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel(id);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading component detail:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount if no initial data
  useEffect(() => {
    if (!initialViewModel) {
      loadData(componentId);
    }
  }, [componentId, initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
    },
    {
      loadData,
      setError,
    },
  ];
}
