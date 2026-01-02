"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

const componentCategories = [
  {
    name: "Inputs",
    components: [
      { name: "Button", description: "Interactive button component with variants" },
      { name: "Input", description: "Text input field with validation" },
      { name: "Checkbox", description: "Checkbox for boolean selections" },
      { name: "Select", description: "Dropdown selection component" },
    ],
  },
  {
    name: "Layout",
    components: [
      { name: "Card", description: "Container with shadow and padding" },
      { name: "Grid", description: "Responsive grid layout system" },
      { name: "Stack", description: "Vertical or horizontal stacking" },
      { name: "Divider", description: "Visual separator between content" },
    ],
  },
  {
    name: "Feedback",
    components: [
      { name: "Alert", description: "Display important messages" },
      { name: "Modal", description: "Overlay dialog component" },
      { name: "Toast", description: "Temporary notification messages" },
      { name: "Progress", description: "Progress indicator bars" },
    ],
  },
  {
    name: "Navigation",
    components: [
      { name: "Navbar", description: "Top navigation bar" },
      { name: "Sidebar", description: "Side navigation panel" },
      { name: "Tabs", description: "Tabbed content navigation" },
      { name: "Breadcrumb", description: "Page location indicator" },
    ],
  },
];

export function DocsComponentsView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <div style={{ marginBottom: "8px" }}>
          <Link href="/docs"><button className="retro-btn">← Back to Docs</button></Link>
        </div>
        <h1 className="retro-page-title">🧩 Components</h1>
        
        {componentCategories.map((cat) => (
          <div key={cat.name} className="retro-groupbox" style={{ marginBottom: "12px" }}>
            <span className="retro-groupbox-title">{cat.name}</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4px", padding: "8px" }}>
              {cat.components.map((comp) => (
                <div key={comp.name} className="retro-card" style={{ padding: "4px 8px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "11px" }}>{comp.name}</div>
                  <div style={{ fontSize: "10px", color: "gray" }}>{comp.description}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/docs" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
          ← Back to Documentation
        </Link>
      </div>
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🧩 Components</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Browse our collection of UI components</p>
      </div>

      <div className="space-y-12">
        {componentCategories.map((cat) => (
          <div key={cat.name}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{cat.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.components.map((comp) => (
                <div key={comp.name} className="main-card hover:border-indigo-500 cursor-pointer transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{comp.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{comp.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View All CTA */}
      <div className="mt-12 text-center">
        <Link href="/components" className="main-btn main-btn-primary">
          View All Components →
        </Link>
      </div>
    </div>
  );
}
