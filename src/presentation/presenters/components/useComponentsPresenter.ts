// useComponentsPresenter - React hook for Components page state management
'use client';

import type { ComponentFilters } from '@/src/domain/interfaces';
import { useCallback, useEffect, useState } from 'react';
import type { ComponentsViewModel } from './ComponentsPresenter';
import { createClientComponentsPresenter } from './ComponentsPresenterClientFactory';

const presenter = createClientComponentsPresenter();

export interface ComponentsPresenterState {
  viewModel: ComponentsViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface ComponentsPresenterActions {
  loadData: (page?: number, filters?: ComponentFilters, search?: string) => Promise<void>;
  setPage: (page: number) => void;
  setFilters: (filters: ComponentFilters) => void;
  setSearch: (search: string) => void;
  clearFilters: () => void;
  setError: (error: string | null) => void;
}

export function useComponentsPresenter(
  initialViewModel?: ComponentsViewModel
): [ComponentsPresenterState, ComponentsPresenterActions] {
  const [viewModel, setViewModel] = useState<ComponentsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState<ComponentFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = useCallback(async (
    page: number = currentPage,
    filters: ComponentFilters = currentFilters,
    search: string = searchQuery
  ) => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel(page, 12, filters, search);
      setViewModel(newViewModel);
      setCurrentPage(page);
      setCurrentFilters(filters);
      setSearchQuery(search);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error loading components:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentFilters, searchQuery]);

  const setPage = useCallback((page: number) => {
    loadData(page, currentFilters, searchQuery);
  }, [loadData, currentFilters, searchQuery]);

  const setFilters = useCallback((filters: ComponentFilters) => {
    loadData(1, filters, searchQuery);
  }, [loadData, searchQuery]);

  const setSearch = useCallback((search: string) => {
    loadData(1, currentFilters, search);
  }, [loadData, currentFilters]);

  const clearFilters = useCallback(() => {
    loadData(1, {}, '');
  }, [loadData]);

  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, []);

  return [
    { viewModel, loading, error },
    { loadData, setPage, setFilters, setSearch, clearFilters, setError },
  ];
}
