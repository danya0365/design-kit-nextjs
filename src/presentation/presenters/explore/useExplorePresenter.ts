"use client";

import { useCallback, useEffect, useState } from "react";
import { ExploreViewModel } from "./ExplorePresenter";
import { createClientExplorePresenter } from "./ExplorePresenterClientFactory";

const presenter = createClientExplorePresenter();

export function useExplorePresenter(initialViewModel?: ExploreViewModel) {
  const [viewModel, setViewModel] = useState<ExploreViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setViewModel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialViewModel) loadData();
  }, [initialViewModel, loadData]);

  return { viewModel, loading, error, loadData };
}
