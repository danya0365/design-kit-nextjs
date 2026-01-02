"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";

const steps = [
  {
    step: 1,
    title: "Install Design Kit",
    description: "Add Design Kit to your project using npm or yarn",
    code: "npm install @design-kit/react",
  },
  {
    step: 2,
    title: "Import Components",
    description: "Import the components you need in your application",
    code: "import { Button, Card, Modal } from '@design-kit/react';",
  },
  {
    step: 3,
    title: "Add Styles",
    description: "Import the Design Kit stylesheet in your main file",
    code: "import '@design-kit/react/styles.css';",
  },
  {
    step: 4,
    title: "Start Building",
    description: "Use the components to build beautiful interfaces",
    code: "<Button variant=\"primary\">Click me!</Button>",
  },
];

const requirements = [
  "Node.js 18.0 or later",
  "React 18.0 or later",
  "Next.js 13.0 or later (optional)",
];

export function DocsGettingStartedView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <div style={{ marginBottom: "8px" }}>
          <Link href="/docs"><button className="retro-btn">← Back to Docs</button></Link>
        </div>
        <h1 className="retro-page-title">🚀 Getting Started</h1>
        
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">📋 Requirements</span>
          <ul style={{ padding: "8px", margin: 0, listStyle: "disc", paddingLeft: "24px", fontSize: "11px" }}>
            {requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📝 Installation Steps</span>
          <div style={{ padding: "8px" }}>
            {steps.map((s) => (
              <div key={s.step} className="retro-card" style={{ marginBottom: "8px", padding: "8px" }}>
                <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px" }}>
                  Step {s.step}: {s.title}
                </div>
                <div style={{ fontSize: "10px", marginBottom: "4px" }}>{s.description}</div>
                <code style={{ fontSize: "10px", background: "#000", color: "#0f0", padding: "2px 4px", display: "block" }}>
                  {s.code}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/docs" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
          ← Back to Documentation
        </Link>
      </div>
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🚀 Getting Started</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Get up and running with Design Kit in minutes</p>
      </div>

      {/* Requirements */}
      <div className="main-card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Requirements</h2>
        <ul className="space-y-2">
          {requirements.map((req, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span> {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Installation Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Installation Steps</h2>
        {steps.map((s) => (
          <div key={s.step} className="main-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                {s.step}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{s.description}</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{s.code}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="mt-12 main-card bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h3 className="text-2xl font-bold mb-4">🎉 Ready to go!</h3>
        <p className="mb-6 opacity-90">Now that you have Design Kit installed, explore our components and start building.</p>
        <div className="flex gap-4">
          <Link href="/docs/components" className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Browse Components
          </Link>
          <Link href="/docs/customization" className="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors">
            Customize Themes
          </Link>
        </div>
      </div>
    </div>
  );
}
