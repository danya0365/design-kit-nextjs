"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";

const changes = [
  { version: "1.2.0", date: "2024-01-15", changes: ["Added 20 new button components", "Improved dark mode", "Fixed mobile responsiveness"] },
  { version: "1.1.0", date: "2024-01-01", changes: ["New card components", "Search functionality", "Performance improvements"] },
  { version: "1.0.0", date: "2023-12-15", changes: ["Initial release", "50+ components", "React & HTML support"] },
];

export function ChangelogView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📝 Changelog</h1>
        {changes.map((c) => (
          <div key={c.version} className="retro-groupbox" style={{ marginBottom: "12px" }}>
            <span className="retro-groupbox-title">v{c.version} ({c.date})</span>
            <ul style={{ padding: "8px", margin: 0, paddingLeft: "24px", fontSize: "11px" }}>
              {c.changes.map((ch, i) => <li key={i}>{ch}</li>)}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">📝 Changelog</h1>
      <div className="space-y-8">
        {changes.map((c) => (
          <div key={c.version} className="main-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-indigo-600">v{c.version}</span>
              <span className="text-sm text-gray-500">{c.date}</span>
            </div>
            <ul className="space-y-2">
              {c.changes.map((ch, i) => <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span className="text-green-500">✓</span>{ch}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
