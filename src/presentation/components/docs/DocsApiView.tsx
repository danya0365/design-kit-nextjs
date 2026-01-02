"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";

const endpoints = [
  { method: "GET", path: "/api/components", desc: "List all components" },
  { method: "GET", path: "/api/components/:id", desc: "Get component by ID" },
  { method: "POST", path: "/api/components", desc: "Create component" },
  { method: "GET", path: "/api/categories", desc: "List categories" },
  { method: "GET", path: "/api/users/:id", desc: "Get user profile" },
];

export function DocsApiView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📡 API Reference</h1>
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📋 Endpoints</span>
          <div style={{ padding: "8px" }}>
            {endpoints.map((e, i) => (
              <div key={i} className="retro-card" style={{ marginBottom: "4px", fontFamily: "monospace", fontSize: "10px" }}>
                <span style={{ background: e.method === "GET" ? "green" : "orange", color: "white", padding: "2px 4px" }}>{e.method}</span> {e.path} - {e.desc}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">📡 API Reference</h1>
      <div className="main-card">
        <div className="space-y-4">
          {endpoints.map((e, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
              <span className={`px-2 py-1 text-xs font-mono rounded ${e.method === "GET" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{e.method}</span>
              <code className="flex-1 text-sm font-mono text-gray-700 dark:text-gray-300">{e.path}</code>
              <span className="text-sm text-gray-500">{e.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
