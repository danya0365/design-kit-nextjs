"use client";

import { useCallback, useEffect, useState } from "react";
import { FavoritesViewModel } from "./FavoritesPresenter";
import { createClientFavoritesPresenter } from "./FavoritesPresenterClientFactory";

const presenter = createClientFavoritesPresenter();

export function useFavoritesPresenter(favoriteIds: string[]) {
  const [viewModel, setViewModel] = useState<FavoritesViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (ids: string[]) => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel(ids);
      setViewModel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(favoriteIds);
  }, [favoriteIds, loadData]);

  return { viewModel, loading, error, loadData };
}
