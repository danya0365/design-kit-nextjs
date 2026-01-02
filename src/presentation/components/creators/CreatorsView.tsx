"use client";

import { CreatorsViewModel } from "@/src/presentation/presenters/creators/CreatorsPresenter";
import { useCreatorsPresenter } from "@/src/presentation/presenters/creators/useCreatorsPresenter";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

interface CreatorsViewProps {
  initialViewModel?: CreatorsViewModel;
}

export function CreatorsView({ initialViewModel }: CreatorsViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { viewModel, loading } = useCreatorsPresenter(initialViewModel);

  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!viewModel) return null;

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">👨‍🎨 Creators</h1>

        {/* Featured Creators */}
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">⭐ Top Creators</span>
          <div style={{ display: "flex", gap: "8px", padding: "8px" }}>
            {viewModel.featuredCreators.map((creator, idx) => (
              <div key={creator.id} className="retro-card" style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontSize: "20px" }}>{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={creator.avatar_url} alt={creator.full_name} style={{ width: "50px", height: "50px", borderRadius: "50%", margin: "8px auto" }} />
                <div style={{ fontSize: "11px", fontWeight: "bold" }}>{creator.full_name}</div>
                <div style={{ fontSize: "10px" }}>{creator.total_sales || 0} sales</div>
              </div>
            ))}
          </div>
        </div>

        {/* All Creators */}
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">👥 All Creators</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "8px", padding: "8px" }}>
            {viewModel.creators.map((creator) => (
              <div key={creator.id} className="retro-card" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={creator.avatar_url} alt={creator.full_name} style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "bold" }}>{creator.full_name}</div>
                  <div style={{ fontSize: "9px", color: "gray" }}>@{creator.username}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">👨‍🎨 Creators</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Meet the talented people behind our components</p>
      </div>

      {/* Featured */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {viewModel.featuredCreators.map((creator, idx) => (
          <div key={creator.id} className="main-card text-center relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl">
              {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={creator.avatar_url} alt={creator.full_name} className="w-20 h-20 rounded-full mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white">{creator.full_name}</h3>
            <p className="text-sm text-gray-500 mb-2">@{creator.username}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{creator.bio || "Component creator"}</p>
            <div className="text-indigo-600 font-bold">{creator.total_sales || 0} sales</div>
          </div>
        ))}
      </div>

      {/* All Creators */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Creators</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {viewModel.creators.map((creator) => (
          <div key={creator.id} className="main-card flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={creator.avatar_url} alt={creator.full_name} className="w-12 h-12 rounded-full" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{creator.full_name}</div>
              <div className="text-xs text-gray-500">@{creator.username}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Become Creator CTA */}
      <div className="mt-16 main-card bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">🚀 Become a Creator</h3>
        <p className="opacity-90 mb-6">Share your components and earn money from your work.</p>
        <Link href="/dashboard" className="main-btn bg-white text-indigo-600 hover:bg-gray-100">
          Start Creating
        </Link>
      </div>
    </div>
  );
}
