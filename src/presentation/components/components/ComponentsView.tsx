"use client";

import { ComponentsFilters, ComponentsViewModel } from "@/src/presentation/presenters/components/ComponentsPresenter";
import { useComponentsPresenter } from "@/src/presentation/presenters/components/useComponentsPresenter";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";
import { useState } from "react";

interface ComponentsViewProps {
  initialViewModel?: ComponentsViewModel;
}

export function ComponentsView({ initialViewModel }: ComponentsViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [state, actions] = useComponentsPresenter(initialViewModel);
  const { viewModel, loading, error } = state;
  const [searchInput, setSearchInput] = useState(initialViewModel?.filters.search || "");

  // Loading state
  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading components...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600">{error}</p>
          <button onClick={() => actions.loadData()} className="mt-4 main-btn main-btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!viewModel) return null;

  const handleSearch = () => {
    actions.setFilters({ ...viewModel.filters, search: searchInput });
  };

  const handleCategoryFilter = (categoryId: string | undefined) => {
    actions.setFilters({ ...viewModel.filters, category: categoryId });
  };

  const handleSortChange = (sortBy: ComponentsFilters["sortBy"]) => {
    actions.setFilters({ ...viewModel.filters, sortBy });
  };

  const totalPages = Math.ceil(viewModel.totalCount / viewModel.perPage);

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🧩 Browse Components</h1>

        {/* Search & Filters */}
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">🔍 Search & Filter</span>
          <div style={{ padding: "8px" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <input
                type="text"
                placeholder="Search components..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="retro-input"
                style={{ flex: 1 }}
              />
              <button onClick={handleSearch} className="retro-btn retro-btn-primary">
                Search
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              <button
                onClick={() => handleCategoryFilter(undefined)}
                className={`retro-btn ${!viewModel.filters.category ? "retro-btn-primary" : ""}`}
                style={{ fontSize: "11px" }}
              >
                All
              </button>
              {viewModel.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryFilter(cat.id)}
                  className={`retro-btn ${viewModel.filters.category === cat.id ? "retro-btn-primary" : ""}`}
                  style={{ fontSize: "11px" }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">
            📦 Components ({viewModel.totalCount} results)
          </span>
          <div style={{ padding: "8px" }}>
            {viewModel.components.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p>No components found.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "8px" }}>
                {viewModel.components.map((comp) => (
                  <Link key={comp.id} href={`/components/${comp.id}`}>
                    <div className="retro-card" style={{ cursor: "pointer" }}>
                      <div style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "4px" }}>
                        {comp.category?.icon} {comp.name}
                      </div>
                      <div style={{ fontSize: "10px", color: "gray", marginBottom: "4px" }}>
                        {comp.description.slice(0, 60)}...
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                        <span>⭐ {comp.rating} | ⬇️ {comp.download_count}</span>
                        <span style={{ fontWeight: "bold" }}>
                          {comp.is_free ? "FREE" : `$${comp.price}`}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "12px" }}>
                <button
                  onClick={() => actions.setPage(viewModel.page - 1)}
                  disabled={viewModel.page === 1}
                  className="retro-btn"
                  style={{ fontSize: "11px" }}
                >
                  ← Prev
                </button>
                <span style={{ padding: "4px 8px" }}>
                  Page {viewModel.page} of {totalPages}
                </span>
                <button
                  onClick={() => actions.setPage(viewModel.page + 1)}
                  disabled={viewModel.page >= totalPages}
                  className="retro-btn"
                  style={{ fontSize: "11px" }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="main-card sticky top-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleCategoryFilter(undefined)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  !viewModel.filters.category
                    ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                All Components
              </button>
              {viewModel.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryFilter(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    viewModel.filters.category === cat.id
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Search components..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="main-input flex-1"
              />
              <button onClick={handleSearch} className="main-btn main-btn-primary">
                Search
              </button>
            </div>
            <select
              value={viewModel.filters.sortBy || "newest"}
              onChange={(e) => handleSortChange(e.target.value as ComponentsFilters["sortBy"])}
              className="main-select"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Results Count */}
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {viewModel.totalCount} components found
          </p>

          {/* Grid */}
          {viewModel.components.length === 0 ? (
            <div className="main-card text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600 dark:text-gray-400">No components found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {viewModel.components.map((comp) => (
                <Link key={comp.id} href={`/components/${comp.id}`}>
                  <div className="main-card group hover:border-indigo-500 transition-all h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={comp.preview_url}
                      alt={comp.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <span>{comp.category?.icon}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 line-clamp-1">
                        {comp.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {comp.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500">
                        ⭐ {comp.rating} | ⬇️ {comp.download_count}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {comp.is_free ? "Free" : `$${comp.price}`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => actions.setPage(viewModel.page - 1)}
                disabled={viewModel.page === 1}
                className="main-btn main-btn-secondary disabled:opacity-50"
              >
                ← Previous
              </button>
              <span className="px-4 py-2 text-gray-600 dark:text-gray-400">
                Page {viewModel.page} of {totalPages}
              </span>
              <button
                onClick={() => actions.setPage(viewModel.page + 1)}
                disabled={viewModel.page >= totalPages}
                className="main-btn main-btn-secondary disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
