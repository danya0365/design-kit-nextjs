"use client";
import { useCallback, useEffect, useState } from "react";
import { ProfileViewModel } from "./ProfilePresenter";
import { createClientProfilePresenter } from "./ProfilePresenterClientFactory";
const presenter = createClientProfilePresenter();
export function useProfilePresenter(initialViewModel?: ProfileViewModel) {
  const [viewModel, setViewModel] = useState<ProfileViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const loadData = useCallback(async () => {
    setLoading(true);
    try { setViewModel(await presenter.getViewModel()); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { if (!initialViewModel) loadData(); }, [initialViewModel, loadData]);
  return { viewModel, loading, loadData };
}
