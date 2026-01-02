"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

const mockDownloads = [
  { id: "1", name: "Premium Button Pack", date: "2024-01-15", format: "React" },
  { id: "2", name: "Modern Card Components", date: "2024-01-10", format: "HTML" },
  { id: "3", name: "Animated Modals", date: "2024-01-05", format: "React" },
];

export function DownloadsView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📥 My Downloads</h1>
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📦 Downloaded Components</span>
          <div style={{ padding: "8px" }}>
            {mockDownloads.map((d) => (
              <div key={d.id} className="retro-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "11px" }}>{d.name}</div>
                  <div style={{ fontSize: "10px", color: "gray" }}>{d.date} • {d.format}</div>
                </div>
                <button className="retro-btn" style={{ fontSize: "10px" }}>⬇️ Re-download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">📥 My Downloads</h1>
      {mockDownloads.length === 0 ? (
        <div className="main-card text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">No downloads yet.</p>
          <Link href="/components" className="main-btn main-btn-primary">Browse Components</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {mockDownloads.map((d) => (
            <div key={d.id} className="main-card flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{d.name}</h3>
                <p className="text-sm text-gray-500">{d.date} • {d.format}</p>
              </div>
              <button className="main-btn main-btn-secondary">⬇️ Re-download</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
