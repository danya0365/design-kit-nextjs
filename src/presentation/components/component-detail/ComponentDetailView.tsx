"use client";

import { ComponentDetailViewModel } from "@/src/presentation/presenters/component-detail/ComponentDetailPresenter";
import { useComponentDetailPresenter } from "@/src/presentation/presenters/component-detail/useComponentDetailPresenter";
import { useCartStore } from "@/src/presentation/stores/cartStore";
import { useFavoritesStore } from "@/src/presentation/stores/favoritesStore";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useToastStore } from "@/src/presentation/stores/toastStore";
import Link from "next/link";
import { useState } from "react";

interface ComponentDetailViewProps {
  componentId: string;
  initialViewModel?: ComponentDetailViewModel;
}

export function ComponentDetailView({ componentId, initialViewModel }: ComponentDetailViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [state] = useComponentDetailPresenter(componentId, initialViewModel);
  const { viewModel, loading, error } = state;

  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const { addItem } = useCartStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<"html" | "react">("react");

  // Loading state
  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading component...</p>
        </div>
      </div>
    );
  }

  // Error or not found
  if ((error && !viewModel) || !viewModel?.component) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Component Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error || "The requested component could not be found."}
          </p>
          <Link href="/components" className="main-btn main-btn-primary">
            Browse Components
          </Link>
        </div>
      </div>
    );
  }

  const { component, reviews, relatedComponents } = viewModel;
  const isFav = isFavorite(component.id);

  const handleFavorite = () => {
    if (isFav) {
      removeFavorite(component.id);
      addToast("Removed from favorites", "info");
    } else {
      addFavorite(component.id);
      addToast("Added to favorites!", "success");
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: component.id,
      creatorId: component.creator_id,
      name: component.name,
      description: component.description,
      categoryId: component.category_id,
      tags: component.tags || [],
      previewUrl: component.preview_url,
      previewImages: [component.preview_url],
      price: component.price,
      isFree: component.is_free,
      pricingType: component.is_free ? 'free' : 'paid',
      licenseType: 'personal',
      variants: [],
      exports: [],
      downloadCount: component.download_count,
      rating: component.rating,
      ratingCount: 0,
      isPublished: true,
      createdAt: component.created_at,
      updatedAt: component.updated_at,
    });
    addToast("Added to cart!", "success");
  };

  const handleCopyCode = () => {
    const code = activeTab === "html" ? component.code_html : component.code_react;
    if (code) {
      navigator.clipboard.writeText(code);
      addToast("Code copied!", "success");
    }
  };

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <div style={{ marginBottom: "8px" }}>
          <Link href="/components" style={{ fontSize: "11px", color: "blue" }}>
            ← Back to Components
          </Link>
        </div>

        <div className="retro-card" style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={component.preview_url}
              alt={component.name}
              style={{ width: "200px", height: "150px", objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "4px" }}>
                {component.category?.icon} {component.name}
              </h1>
              <p style={{ fontSize: "12px", marginBottom: "8px" }}>{component.description}</p>
              <div style={{ fontSize: "11px", color: "gray", marginBottom: "8px" }}>
                ⭐ {component.rating} | ⬇️ {component.download_count} | 👁️ {component.view_count}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {component.is_free ? "FREE" : `$${component.price}`}
                </span>
              </div>
              <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
                <button onClick={handleAddToCart} className="retro-btn retro-btn-primary">
                  🛒 Add to Cart
                </button>
                <button onClick={handleFavorite} className="retro-btn">
                  {isFav ? "❤️ Unfavorite" : "🤍 Favorite"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Code Preview */}
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">📝 Code</span>
          <div style={{ padding: "8px" }}>
            <div style={{ marginBottom: "8px" }}>
              <button
                onClick={() => setActiveTab("html")}
                className={`retro-btn ${activeTab === "html" ? "retro-btn-primary" : ""}`}
                style={{ marginRight: "4px", fontSize: "10px" }}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab("react")}
                className={`retro-btn ${activeTab === "react" ? "retro-btn-primary" : ""}`}
                style={{ fontSize: "10px" }}
              >
                React
              </button>
              <button onClick={handleCopyCode} className="retro-btn" style={{ marginLeft: "8px", fontSize: "10px" }}>
                📋 Copy
              </button>
            </div>
            <pre style={{ background: "#000", color: "#0f0", padding: "8px", fontSize: "10px", overflow: "auto", maxHeight: "200px" }}>
              {activeTab === "html" ? component.code_html : component.code_react}
            </pre>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
            <span className="retro-groupbox-title">💬 Reviews ({reviews.length})</span>
            <div style={{ padding: "8px" }}>
              {reviews.map((review) => (
                <div key={review.id} style={{ marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid #c0c0c0" }}>
                  <div style={{ fontSize: "11px" }}>
                    {"⭐".repeat(review.rating)} - {review.comment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {relatedComponents.length > 0 && (
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">🔗 Related</span>
            <div style={{ display: "flex", gap: "8px", padding: "8px", overflowX: "auto" }}>
              {relatedComponents.map((rel) => (
                <Link key={rel.id} href={`/components/${rel.id}`}>
                  <div className="retro-card" style={{ width: "150px", cursor: "pointer" }}>
                    <div style={{ fontSize: "11px", fontWeight: "bold" }}>{rel.name}</div>
                    <div style={{ fontSize: "10px" }}>{rel.is_free ? "FREE" : `$${rel.price}`}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/components" className="text-gray-500 hover:text-indigo-600">
          Components
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 dark:text-white">{component.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Preview */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={component.preview_url}
            alt={component.name}
            className="w-full rounded-xl shadow-lg"
          />

          {/* Code Preview */}
          <div className="main-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("html")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "html" ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  HTML
                </button>
                <button
                  onClick={() => setActiveTab("react")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "react" ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  React
                </button>
              </div>
              <button onClick={handleCopyCode} className="main-btn main-btn-secondary">
                📋 Copy Code
              </button>
            </div>
            <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto max-h-80">
              {activeTab === "html" ? component.code_html : component.code_react}
            </pre>
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="main-card">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                💬 Reviews ({reviews.length})
              </h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500">{"⭐".repeat(review.rating)}</span>
                      <span className="text-sm text-gray-500">{review.helpful_count} found helpful</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="main-card sticky top-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {component.category?.icon} {component.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{component.description}</p>

            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              <span>⭐ {component.rating}</span>
              <span>⬇️ {component.download_count}</span>
              <span>👁️ {component.view_count}</span>
            </div>

            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {component.is_free ? "Free" : `$${component.price}`}
            </div>

            <div className="space-y-3">
              <button onClick={handleAddToCart} className="w-full main-btn main-btn-primary">
                🛒 Add to Cart
              </button>
              <button onClick={handleFavorite} className="w-full main-btn main-btn-secondary">
                {isFav ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {component.tags?.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related */}
          {relatedComponents.length > 0 && (
            <div className="main-card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Related Components</h3>
              <div className="space-y-3">
                {relatedComponents.map((rel) => (
                  <Link key={rel.id} href={`/components/${rel.id}`}>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={rel.preview_url} alt={rel.name} className="w-12 h-12 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white truncate">{rel.name}</div>
                        <div className="text-sm text-gray-500">{rel.is_free ? "Free" : `$${rel.price}`}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
