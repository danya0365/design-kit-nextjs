"use client";

import { useCallback, useEffect, useState } from "react";
import { ComponentsFilters, ComponentsViewModel } from "./ComponentsPresenter";
import { createClientComponentsPresenter } from "./ComponentsPresenterClientFactory";

// Initialize presenter instance once (singleton pattern)
const presenter = createClientComponentsPresenter();

export interface ComponentsPresenterState {
  viewModel: ComponentsViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface ComponentsPresenterActions {
  loadData: (page?: number, filters?: ComponentsFilters) => Promise<void>;
  setFilters: (filters: ComponentsFilters) => void;
  setPage: (page: number) => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Components presenter
 */
export function useComponentsPresenter(
  initialViewModel?: ComponentsViewModel
): [ComponentsPresenterState, ComponentsPresenterActions] {
  const [viewModel, setViewModel] = useState<ComponentsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<ComponentsFilters>(
    initialViewModel?.filters || {}
  );
  const [currentPage, setCurrentPage] = useState(initialViewModel?.page || 1);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async (page?: number, filters?: ComponentsFilters) => {
    const targetPage = page ?? currentPage;
    const targetFilters = filters ?? currentFilters;

    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel(targetPage, 12, targetFilters);
      setViewModel(newViewModel);
      setCurrentPage(targetPage);
      setCurrentFilters(targetFilters);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading components:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentFilters]);

  /**
   * Set filters and reload
   */
  const setFilters = useCallback((filters: ComponentsFilters) => {
    loadData(1, filters);
  }, [loadData]);

  /**
   * Set page and reload
   */
  const setPage = useCallback((page: number) => {
    loadData(page, currentFilters);
  }, [loadData, currentFilters]);

  // Load data on mount if no initial data
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
    },
    {
      loadData,
      setFilters,
      setPage,
      setError,
    },
  ];
}
