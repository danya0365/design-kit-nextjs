"use client";

import { useFavoritesPresenter } from "@/src/presentation/presenters/favorites/useFavoritesPresenter";
import { useFavoritesStore } from "@/src/presentation/stores/favoritesStore";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

export function FavoritesView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { favoriteIds, removeFavorite } = useFavoritesStore();
  const { viewModel, loading } = useFavoritesPresenter(favoriteIds);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  const favorites = viewModel?.favorites || [];

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">❤️ My Favorites</h1>

        {favorites.length === 0 ? (
          <div className="retro-card" style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ marginBottom: "12px" }}>You haven&apos;t favorited any components yet.</p>
            <Link href="/components">
              <button className="retro-btn retro-btn-primary">Browse Components</button>
            </Link>
          </div>
        ) : (
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">💖 {favorites.length} Favorites</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "8px", padding: "8px" }}>
              {favorites.map((comp) => (
                <div key={comp.id} className="retro-card">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "bold" }}>{comp.category?.icon} {comp.name}</span>
                    <button onClick={() => removeFavorite(comp.id)} style={{ cursor: "pointer", background: "none", border: "none" }}>❌</button>
                  </div>
                  <div style={{ fontSize: "10px", marginBottom: "4px" }}>⭐ {comp.rating}</div>
                  <div style={{ fontSize: "11px", fontWeight: "bold" }}>
                    {comp.is_free ? "FREE" : `$${comp.price}`}
                  </div>
                  <Link href={`/components/${comp.id}`}>
                    <button className="retro-btn" style={{ width: "100%", marginTop: "4px", fontSize: "10px" }}>View</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">❤️ My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="main-card text-center py-16">
          <div className="text-6xl mb-4">💔</div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You haven&apos;t favorited any components yet.</p>
          <Link href="/components" className="main-btn main-btn-primary">
            Browse Components
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((comp) => (
            <div key={comp.id} className="main-card relative group">
              <button
                onClick={() => removeFavorite(comp.id)}
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ❌
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={comp.preview_url} alt={comp.name} className="w-full h-32 object-cover rounded-lg mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{comp.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">⭐ {comp.rating}</span>
                <span className="font-bold">{comp.is_free ? "Free" : `$${comp.price}`}</span>
              </div>
              <Link href={`/components/${comp.id}`} className="main-btn main-btn-secondary w-full mt-4 text-center block">
                View Component
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
