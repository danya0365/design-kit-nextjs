"use client";

import { useCallback, useEffect, useState } from "react";
import { FaqViewModel } from "./FaqPresenter";
import { createClientFaqPresenter } from "./FaqPresenterClientFactory";

const presenter = createClientFaqPresenter();

export function useFaqPresenter(initialViewModel?: FaqViewModel) {
  const [viewModel, setViewModel] = useState<FaqViewModel | null>(initialViewModel || null);
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
