"use client";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";

export function TermsView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const content = `
## Terms of Service

Last updated: January 2024

### Acceptance of Terms
By using Design Kit, you agree to these terms.

### Use of Service
- You may use components in personal and commercial projects
- You may not resell components as-is
- You retain ownership of projects you create

### Licensing
Commercial license allows unlimited use in client projects.

### Contact
For questions, contact legal@designkit.com
  `;

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📜 Terms of Service</h1>
        <div className="retro-card" style={{ whiteSpace: "pre-wrap", fontSize: "11px", lineHeight: "1.5" }}>{content}</div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">📜 Terms of Service</h1>
      <div className="main-card prose dark:prose-invert max-w-none" style={{ whiteSpace: "pre-wrap" }}>{content}</div>
    </div>
  );
}
