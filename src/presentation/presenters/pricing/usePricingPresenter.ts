"use client";
import { useCallback, useEffect, useState } from "react";
import { PricingViewModel } from "./PricingPresenter";
import { createClientPricingPresenter } from "./PricingPresenterClientFactory";
const presenter = createClientPricingPresenter();
export function usePricingPresenter(initialViewModel?: PricingViewModel) {
  const [viewModel, setViewModel] = useState<PricingViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const loadData = useCallback(async () => {
    setLoading(true);
    try { setViewModel(await presenter.getViewModel()); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { if (!initialViewModel) loadData(); }, [initialViewModel, loadData]);
  return { viewModel, loading };
}
