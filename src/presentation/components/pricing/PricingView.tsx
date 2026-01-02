"use client";

import { PricingViewModel } from "@/src/presentation/presenters/pricing/PricingPresenter";
import { usePricingPresenter } from "@/src/presentation/presenters/pricing/usePricingPresenter";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useToastStore } from "@/src/presentation/stores/toastStore";

interface PricingViewProps {
  initialViewModel?: PricingViewModel;
}

export function PricingView({ initialViewModel }: PricingViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { viewModel, loading } = usePricingPresenter(initialViewModel);
  const { addToast } = useToastStore();

  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!viewModel) return null;

  const handleCta = (tierName: string) => {
    addToast(`${tierName} plan selected! Coming soon.`, "info");
  };

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">💰 Pricing</h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {viewModel.tiers.map((tier) => (
            <div key={tier.name} className="retro-card" style={{ border: tier.isPopular ? "2px solid navy" : undefined }}>
              {tier.isPopular && <div style={{ background: "navy", color: "white", fontSize: "9px", textAlign: "center", padding: "2px" }}>POPULAR</div>}
              <div style={{ textAlign: "center", padding: "8px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "bold" }}>{tier.name}</h3>
                <div style={{ fontSize: "20px", fontWeight: "bold", margin: "8px 0" }}>
                  ${tier.price}<span style={{ fontSize: "10px" }}>/{tier.period}</span>
                </div>
                <p style={{ fontSize: "10px", marginBottom: "8px" }}>{tier.description}</p>
                <ul style={{ textAlign: "left", fontSize: "10px", marginBottom: "8px" }}>
                  {tier.features.map((f) => <li key={f}>✓ {f}</li>)}
                </ul>
                <button onClick={() => handleCta(tier.name)} className="retro-btn retro-btn-primary" style={{ width: "100%" }}>{tier.cta}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">💰 Pricing</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Simple, transparent pricing for everyone</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {viewModel.tiers.map((tier) => (
          <div key={tier.name} className={`main-card relative ${tier.isPopular ? "border-2 border-indigo-600" : ""}`}>
            {tier.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${tier.price}</span>
                <span className="text-gray-500">/{tier.period}</span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{tier.description}</p>
            </div>
            <ul className="mt-8 space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="text-green-500">✓</span>{f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCta(tier.name)}
              className={`w-full mt-8 ${tier.isPopular ? "main-btn main-btn-primary" : "main-btn main-btn-secondary"}`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
