"use client";

import { ExploreViewModel } from "@/src/presentation/presenters/explore/ExplorePresenter";
import { useExplorePresenter } from "@/src/presentation/presenters/explore/useExplorePresenter";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";
import { useState } from "react";

interface ExploreViewProps {
  initialViewModel?: ExploreViewModel;
}

export function ExploreView({ initialViewModel }: ExploreViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { viewModel, loading, error } = useExplorePresenter(initialViewModel);
  const [activeTab, setActiveTab] = useState<"trending" | "new" | "categories">("trending");

  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error || !viewModel) {
    return <div className="text-center py-12 text-red-600">{error || "Failed to load"}</div>;
  }

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🔍 Explore</h1>

        {/* Tabs */}
        <div style={{ marginBottom: "12px", display: "flex", gap: "4px" }}>
          <button onClick={() => setActiveTab("trending")} className={`retro-btn ${activeTab === "trending" ? "retro-btn-primary" : ""}`}>🔥 Trending</button>
          <button onClick={() => setActiveTab("new")} className={`retro-btn ${activeTab === "new" ? "retro-btn-primary" : ""}`}>✨ New</button>
          <button onClick={() => setActiveTab("categories")} className={`retro-btn ${activeTab === "categories" ? "retro-btn-primary" : ""}`}>📁 Categories</button>
        </div>

        {activeTab === "trending" && (
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">🔥 Trending This Week</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "8px", padding: "8px" }}>
              {viewModel.trendingComponents.map((comp) => (
                <Link key={comp.id} href={`/components/${comp.id}`}>
                  <div className="retro-card" style={{ cursor: "pointer" }}>
                    <div style={{ fontWeight: "bold", fontSize: "11px" }}>{comp.category?.icon} {comp.name}</div>
                    <div style={{ fontSize: "10px" }}>👁️ {comp.view_count} views</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === "new" && (
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">✨ Just Added</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "8px", padding: "8px" }}>
              {viewModel.newComponents.map((comp) => (
                <Link key={comp.id} href={`/components/${comp.id}`}>
                  <div className="retro-card" style={{ cursor: "pointer" }}>
                    <div style={{ fontWeight: "bold", fontSize: "11px" }}>{comp.category?.icon} {comp.name}</div>
                    <div style={{ fontSize: "10px" }}>{comp.is_free ? "FREE" : `$${comp.price}`}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">📁 Browse by Category</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "8px", padding: "8px" }}>
              {viewModel.categories.map((cat) => (
                <Link key={cat.id} href={`/components?category=${cat.id}`}>
                  <div className="retro-card" style={{ textAlign: "center", cursor: "pointer" }}>
                    <div style={{ fontSize: "20px" }}>{cat.icon}</div>
                    <div style={{ fontSize: "11px", fontWeight: "bold" }}>{cat.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Top Creators */}
        <div className="retro-groupbox" style={{ marginTop: "12px" }}>
          <span className="retro-groupbox-title">🏆 Top Creators</span>
          <div style={{ display: "flex", gap: "8px", padding: "8px" }}>
            {viewModel.topCreators.map((creator) => (
              <div key={creator.id} className="retro-card" style={{ textAlign: "center", width: "100px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={creator.avatar_url} alt={creator.full_name} style={{ width: "40px", height: "40px", borderRadius: "50%", margin: "0 auto" }} />
                <div style={{ fontSize: "10px", fontWeight: "bold", marginTop: "4px" }}>{creator.full_name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🔍 Explore</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Discover trending components and top creators</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {[
          { key: "trending", label: "🔥 Trending", active: activeTab === "trending" },
          { key: "new", label: "✨ New", active: activeTab === "new" },
          { key: "categories", label: "📁 Categories", active: activeTab === "categories" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "trending" | "new" | "categories")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              tab.active ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "trending" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {viewModel.trendingComponents.map((comp) => (
            <Link key={comp.id} href={`/components/${comp.id}`}>
              <div className="main-card group hover:border-indigo-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={comp.preview_url} alt={comp.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600">{comp.name}</h3>
                <p className="text-sm text-gray-500">👁️ {comp.view_count.toLocaleString()} views</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === "new" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {viewModel.newComponents.map((comp) => (
            <Link key={comp.id} href={`/components/${comp.id}`}>
              <div className="main-card group hover:border-indigo-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={comp.preview_url} alt={comp.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600">{comp.name}</h3>
                <p className="text-sm font-bold">{comp.is_free ? "Free" : `$${comp.price}`}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === "categories" && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {viewModel.categories.map((cat) => (
            <Link key={cat.id} href={`/components?category=${cat.id}`}>
              <div className="main-card text-center hover:border-indigo-500">
                <div className="text-4xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-gray-900 dark:text-white">{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Top Creators */}
      <div className="main-card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🏆 Top Creators</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {viewModel.topCreators.map((creator) => (
            <div key={creator.id} className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={creator.avatar_url} alt={creator.full_name} className="w-16 h-16 rounded-full mx-auto mb-2" />
              <div className="font-semibold text-gray-900 dark:text-white">{creator.full_name}</div>
              <div className="text-sm text-gray-500">{creator.total_sales || 0} sales</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
