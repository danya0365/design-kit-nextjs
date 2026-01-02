"use client";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";

const items = [
  { q: "Q1 2024", status: "done", items: ["Launch marketplace", "50+ components", "User accounts"] },
  { q: "Q2 2024", status: "current", items: ["Team collaboration", "Custom components", "API v2"] },
  { q: "Q3 2024", status: "planned", items: ["Mobile app", "AI suggestions", "Plugin ecosystem"] },
];

export function RoadmapView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🗺️ Roadmap</h1>
        {items.map((r) => (
          <div key={r.q} className="retro-groupbox" style={{ marginBottom: "12px" }}>
            <span className="retro-groupbox-title">{r.status === "done" ? "✅" : r.status === "current" ? "🔨" : "📋"} {r.q}</span>
            <ul style={{ padding: "8px", paddingLeft: "24px", margin: 0, fontSize: "11px" }}>
              {r.items.map((i, idx) => <li key={idx}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🗺️ Roadmap</h1>
      <div className="space-y-6">
        {items.map((r) => (
          <div key={r.q} className={`main-card ${r.status === "current" ? "border-indigo-500" : ""}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{r.status === "done" ? "✅" : r.status === "current" ? "🔨" : "📋"}</span>
              <h3 className="text-xl font-semibold">{r.q}</h3>
              <span className={`text-xs px-2 py-1 rounded ${r.status === "done" ? "bg-green-100 text-green-700" : r.status === "current" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700"}`}>{r.status}</span>
            </div>
            <ul className="space-y-2">
              {r.items.map((i, idx) => <li key={idx} className="flex items-center gap-2 text-gray-600"><span>•</span>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
