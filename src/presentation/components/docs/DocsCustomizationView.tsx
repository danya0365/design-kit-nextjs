"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

const themes = [
  { name: "Default", primary: "#6366f1", secondary: "#ec4899" },
  { name: "Ocean", primary: "#0ea5e9", secondary: "#06b6d4" },
  { name: "Forest", primary: "#22c55e", secondary: "#84cc16" },
  { name: "Sunset", primary: "#f97316", secondary: "#f43f5e" },
];

const customizationOptions = [
  {
    title: "Colors",
    icon: "🎨",
    description: "Customize primary, secondary, and accent colors",
    code: `{
  "colors": {
    "primary": "#6366f1",
    "secondary": "#ec4899"
  }
}`,
  },
  {
    title: "Typography",
    icon: "✍️",
    description: "Set fonts, sizes, and line heights",
    code: `{
  "fonts": {
    "body": "Inter, sans-serif",
    "heading": "Outfit, sans-serif"
  }
}`,
  },
  {
    title: "Spacing",
    icon: "📐",
    description: "Define padding and margin scales",
    code: `{
  "spacing": {
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "2rem"
  }
}`,
  },
  {
    title: "Border Radius",
    icon: "⬜",
    description: "Control roundness of components",
    code: `{
  "radius": {
    "sm": "4px",
    "md": "8px",
    "lg": "16px"
  }
}`,
  },
];

export function DocsCustomizationView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <div style={{ marginBottom: "8px" }}>
          <Link href="/docs"><button className="retro-btn">← Back to Docs</button></Link>
        </div>
        <h1 className="retro-page-title">🎨 Customization</h1>
        
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">🎭 Theme Presets</span>
          <div style={{ display: "flex", gap: "8px", padding: "8px", flexWrap: "wrap" }}>
            {themes.map((t) => (
              <div key={t.name} className="retro-card" style={{ textAlign: "center", padding: "8px" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "4px", justifyContent: "center" }}>
                  <div style={{ width: "16px", height: "16px", background: t.primary, border: "1px solid #000" }} />
                  <div style={{ width: "16px", height: "16px", background: t.secondary, border: "1px solid #000" }} />
                </div>
                <div style={{ fontSize: "10px", fontWeight: "bold" }}>{t.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="retro-groupbox">
          <span className="retro-groupbox-title">⚙️ Options</span>
          <div style={{ padding: "8px" }}>
            {customizationOptions.map((opt) => (
              <div key={opt.title} className="retro-card" style={{ marginBottom: "8px", padding: "8px" }}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>{opt.icon} {opt.title}</div>
                <div style={{ fontSize: "10px", color: "gray" }}>{opt.description}</div>
              </div>
            ))}
          </div>
        </div>
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🎨 Customization</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Make Design Kit your own with custom themes</p>
      </div>

      {/* Theme Presets */}
      <div className="main-card mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎭 Theme Presets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <div key={t.name} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 cursor-pointer transition-colors text-center">
              <div className="flex gap-2 mb-3 justify-center">
                <div className="w-8 h-8 rounded-full" style={{ background: t.primary }} />
                <div className="w-8 h-8 rounded-full" style={{ background: t.secondary }} />
              </div>
              <div className="font-semibold text-gray-900 dark:text-white">{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Customization Options */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚙️ Customization Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customizationOptions.map((opt) => (
          <div key={opt.title} className="main-card">
            <div className="text-3xl mb-3">{opt.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{opt.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{opt.description}</p>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
              <code>{opt.code}</code>
            </pre>
          </div>
        ))}
      </div>

      {/* Config File */}
      <div className="mt-12 main-card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📄 Configuration File</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Create a <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">design-kit.config.js</code> file in your project root:
        </p>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`module.exports = {
  theme: {
    colors: {
      primary: '#6366f1',
      secondary: '#ec4899',
    },
    fonts: {
      body: 'Inter, sans-serif',
    },
    radius: 'md',
  },
};`}</code>
        </pre>
      </div>
    </div>
  );
}
