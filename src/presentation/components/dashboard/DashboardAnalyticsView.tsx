"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";

export function DashboardAnalyticsView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  const mockData = {
    weeklyViews: [120, 150, 180, 140, 200, 250, 300],
    topComponents: [
      { name: "Premium Button", views: 450, sales: 12 },
      { name: "Card Grid", views: 320, sales: 8 },
      { name: "Modal Dialog", views: 280, sales: 6 },
    ],
  };

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📈 Analytics</h1>
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">📊 Weekly Views</span>
          <div style={{ padding: "8px", display: "flex", alignItems: "flex-end", gap: "4px", height: "100px" }}>
            {mockData.weeklyViews.map((v, i) => (
              <div key={i} style={{ flex: 1, background: "navy", height: `${(v / 300) * 100}%` }} title={`${v} views`} />
            ))}
          </div>
        </div>
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">🏆 Top Components</span>
          <div style={{ padding: "8px" }}>
            {mockData.topComponents.map((c, i) => (
              <div key={i} className="retro-card" style={{ marginBottom: "4px" }}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>#{i + 1} {c.name}</div>
                <div style={{ fontSize: "10px" }}>👁️ {c.views} views • 💰 {c.sales} sales</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">📈 Analytics</h1>
      <div className="main-card mb-8">
        <h2 className="text-xl font-semibold mb-4">Weekly Views</h2>
        <div className="flex items-end gap-2 h-40">
          {mockData.weeklyViews.map((v, i) => (
            <div key={i} className="flex-1 bg-indigo-600 rounded-t" style={{ height: `${(v / 300) * 100}%` }} title={`${v} views`} />
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}
        </div>
      </div>
      <div className="main-card">
        <h2 className="text-xl font-semibold mb-4">🏆 Top Components</h2>
        <div className="space-y-4">
          {mockData.topComponents.map((c, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-400">#{i + 1}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{c.name}</span>
              </div>
              <div className="text-sm text-gray-500">👁️ {c.views} • 💰 {c.sales}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
