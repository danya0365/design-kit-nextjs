"use client";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";

const collections = [
  { id: "1", name: "Startup Kit", desc: "Everything for your startup", count: 25, icon: "🚀" },
  { id: "2", name: "E-commerce", desc: "Build your online store", count: 40, icon: "🛒" },
  { id: "3", name: "Dashboard", desc: "Admin panel components", count: 35, icon: "📊" },
];

export function CollectionsView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📦 Collections</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "8px" }}>
          {collections.map((c) => (
            <div key={c.id} className="retro-card">
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>{c.icon}</div>
              <div style={{ fontWeight: "bold", fontSize: "12px" }}>{c.name}</div>
              <div style={{ fontSize: "10px", color: "gray" }}>{c.desc}</div>
              <div style={{ fontSize: "10px", marginTop: "4px" }}>{c.count} components</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">📦 Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((c) => (
          <div key={c.id} className="main-card hover:border-indigo-500">
            <div className="text-4xl mb-4">{c.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{c.name}</h3>
            <p className="text-gray-500 mb-4">{c.desc}</p>
            <span className="text-sm text-indigo-600">{c.count} components</span>
          </div>
        ))}
      </div>
    </div>
  );
}
