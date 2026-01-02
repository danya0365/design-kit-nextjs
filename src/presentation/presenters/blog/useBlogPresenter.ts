"use client";

import { useCallback, useEffect, useState } from "react";
import { BlogViewModel } from "./BlogPresenter";
import { createClientBlogPresenter } from "./BlogPresenterClientFactory";

const presenter = createClientBlogPresenter();

export function useBlogPresenter(initialViewModel?: BlogViewModel, category?: string) {
  const [viewModel, setViewModel] = useState<BlogViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (cat?: string) => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel(cat);
      setViewModel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialViewModel) loadData(category);
  }, [initialViewModel, loadData, category]);

  return { viewModel, loading, error, loadData };
}
