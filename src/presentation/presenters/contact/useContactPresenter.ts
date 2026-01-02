"use client";
import { useCallback, useEffect, useState } from "react";
import { ContactViewModel } from "./ContactPresenter";
import { createClientContactPresenter } from "./ContactPresenterClientFactory";

const presenter = createClientContactPresenter();

export function useContactPresenter(initialViewModel?: ContactViewModel) {
  const [viewModel, setViewModel] = useState<ContactViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setViewModel(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialViewModel) loadData();
  }, [initialViewModel, loadData]);

  return { viewModel, loading };
}
