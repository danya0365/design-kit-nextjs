"use client";

import { AboutViewModel } from "@/src/presentation/presenters/about/AboutPresenter";
import { useAboutPresenter } from "@/src/presentation/presenters/about/useAboutPresenter";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

interface AboutViewProps {
  initialViewModel?: AboutViewModel;
}

export function AboutView({ initialViewModel }: AboutViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { viewModel, loading, error } = useAboutPresenter(initialViewModel);

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
        <h1 className="retro-page-title">ℹ️ About Design Kit</h1>

        <div className="retro-card" style={{ marginBottom: "12px", textAlign: "center" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "8px" }}>Our Mission</h2>
          <p style={{ fontSize: "12px" }}>{viewModel.mission}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "12px" }}>
          <div className="retro-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>{viewModel.stats.components}+</div>
            <div style={{ fontSize: "10px" }}>Components</div>
          </div>
          <div className="retro-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>{viewModel.stats.creators}+</div>
            <div style={{ fontSize: "10px" }}>Creators</div>
          </div>
          <div className="retro-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>{viewModel.stats.downloads.toLocaleString()}+</div>
            <div style={{ fontSize: "10px" }}>Downloads</div>
          </div>
          <div className="retro-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>{viewModel.stats.countries}+</div>
            <div style={{ fontSize: "10px" }}>Countries</div>
          </div>
        </div>

        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">📖 Our Story</span>
          <p style={{ padding: "8px", fontSize: "12px" }}>{viewModel.story}</p>
        </div>

        <div className="retro-groupbox">
          <span className="retro-groupbox-title">👥 Team</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", padding: "8px" }}>
            {viewModel.teamMembers.map((member) => (
              <div key={member.name} className="retro-card" style={{ display: "flex", gap: "8px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.avatar} alt={member.name} style={{ width: "40px", height: "40px" }} />
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "11px" }}>{member.name}</div>
                  <div style={{ fontSize: "10px", color: "gray" }}>{member.role}</div>
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
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Design Kit
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {viewModel.mission}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[
          { label: "Components", value: `${viewModel.stats.components}+` },
          { label: "Creators", value: `${viewModel.stats.creators}+` },
          { label: "Downloads", value: `${viewModel.stats.downloads.toLocaleString()}+` },
          { label: "Countries", value: `${viewModel.stats.countries}+` },
        ].map((stat) => (
          <div key={stat.label} className="main-card text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">{stat.value}</div>
            <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="main-card mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📖 Our Story</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{viewModel.story}</p>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">👥 Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {viewModel.teamMembers.map((member) => (
            <div key={member.name} className="main-card text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-sm text-indigo-600 mb-2">{member.role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 main-card bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
        <p className="opacity-90 mb-6">Browse our collection of beautiful components.</p>
        <Link href="/components" className="main-btn bg-white text-indigo-600 hover:bg-gray-100">
          Browse Components
        </Link>
      </div>
    </div>
  );
}
