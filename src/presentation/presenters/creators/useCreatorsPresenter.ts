"use client";

import { useCallback, useEffect, useState } from "react";
import { CreatorsViewModel } from "./CreatorsPresenter";
import { createClientCreatorsPresenter } from "./CreatorsPresenterClientFactory";

const presenter = createClientCreatorsPresenter();

export function useCreatorsPresenter(initialViewModel?: CreatorsViewModel) {
  const [viewModel, setViewModel] = useState<CreatorsViewModel | null>(initialViewModel || null);
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
