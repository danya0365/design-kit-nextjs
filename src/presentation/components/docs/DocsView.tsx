"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

const sections = [
  { title: "Getting Started", icon: "🚀", slug: "getting-started" },
  { title: "Components", icon: "🧩", slug: "components" },
  { title: "Customization", icon: "🎨", slug: "customization" },
  { title: "API Reference", icon: "📚", slug: "api" },
];

export function DocsView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📚 Documentation</h1>
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📖 Sections</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", padding: "8px" }}>
            {sections.map((s) => (
              <Link key={s.slug} href={`/docs/${s.slug}`}>
                <div className="retro-card" style={{ cursor: "pointer" }}>
                  <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                  <div style={{ fontWeight: "bold", fontSize: "11px" }}>{s.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">📚 Documentation</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Learn how to use Design Kit</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <Link key={s.slug} href={`/docs/${s.slug}`}>
            <div className="main-card hover:border-indigo-500 cursor-pointer">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{s.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
