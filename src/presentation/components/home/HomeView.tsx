"use client";

import { HomeViewModel } from "@/src/presentation/presenters/home/HomePresenter";
import { useHomePresenter } from "@/src/presentation/presenters/home/useHomePresenter";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

interface HomeViewProps {
  initialViewModel?: HomeViewModel;
}

export function HomeView({ initialViewModel }: HomeViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [state] = useHomePresenter(initialViewModel);
  const { viewModel, loading, error } = state;

  // Loading state
  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
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
        </div>
      </div>
    );
  }

  if (!viewModel) return null;

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        {/* Welcome Banner */}
        <div className="retro-card" style={{ textAlign: "center", marginBottom: "12px" }}>
          <h1 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>
            🎨 Welcome to Design Kit!
          </h1>
          <p style={{ fontSize: "12px" }}>
            Discover {viewModel.stats.totalComponents}+ UI components from {viewModel.stats.totalCreators}+ creators
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "12px" }}>
          <div className="retro-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>{viewModel.stats.totalComponents}</div>
            <div style={{ fontSize: "10px" }}>Components</div>
          </div>
          <div className="retro-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>{viewModel.stats.totalCreators}</div>
            <div style={{ fontSize: "10px" }}>Creators</div>
          </div>
          <div className="retro-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>{viewModel.stats.totalDownloads.toLocaleString()}</div>
            <div style={{ fontSize: "10px" }}>Downloads</div>
          </div>
        </div>

        {/* Featured Components */}
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">⭐ Featured Components</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "8px", padding: "8px" }}>
            {viewModel.featuredComponents.map((comp) => (
              <Link key={comp.id} href={`/components/${comp.id}`}>
                <div className="retro-card" style={{ cursor: "pointer" }}>
                  <div style={{ fontWeight: "bold", fontSize: "12px" }}>
                    {comp.category?.icon} {comp.name}
                  </div>
                  <div style={{ fontSize: "10px", color: "gray" }}>
                    ⭐ {comp.rating} | ⬇️ {comp.download_count}
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: "bold", marginTop: "4px" }}>
                    {comp.is_free ? "FREE" : `$${comp.price}`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📁 Browse by Category</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", padding: "8px" }}>
            {viewModel.categories.map((cat) => (
              <Link key={cat.id} href={`/components?category=${cat.id}`}>
                <button className="retro-btn" style={{ fontSize: "11px" }}>
                  {cat.icon} {cat.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Premium UI Components
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Design Once, Export Anywhere
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Discover {viewModel.stats.totalComponents}+ beautiful UI components from {viewModel.stats.totalCreators}+ creators.
          Export to HTML, React, or Next.js with various styling options.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/components" className="main-btn main-btn-primary">
            Browse Components
          </Link>
          <Link href="/pricing" className="main-btn main-btn-secondary">
            View Pricing
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="main-card text-center">
          <div className="text-4xl font-bold text-indigo-600 mb-2">
            {viewModel.stats.totalComponents}+
          </div>
          <div className="text-gray-600 dark:text-gray-400">Components</div>
        </div>
        <div className="main-card text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {viewModel.stats.totalCreators}+
          </div>
          <div className="text-gray-600 dark:text-gray-400">Creators</div>
        </div>
        <div className="main-card text-center">
          <div className="text-4xl font-bold text-pink-600 mb-2">
            {viewModel.stats.totalDownloads.toLocaleString()}+
          </div>
          <div className="text-gray-600 dark:text-gray-400">Downloads</div>
        </div>
      </div>

      {/* Featured Components */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ⭐ Featured Components
          </h2>
          <Link href="/components?featured=true" className="text-indigo-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewModel.featuredComponents.map((comp) => (
            <Link key={comp.id} href={`/components/${comp.id}`}>
              <div className="main-card group hover:border-indigo-500 transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={comp.preview_url}
                  alt={comp.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center gap-2 mb-2">
                  <span>{comp.category?.icon}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600">
                    {comp.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {comp.description}
                </p>
                <div className="flex items-center justify-between">
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
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          📁 Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {viewModel.categories.map((cat) => (
            <Link key={cat.id} href={`/components?category=${cat.id}`}>
              <div className="main-card text-center hover:border-indigo-500 transition-colors">
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-gray-900 dark:text-white">{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
