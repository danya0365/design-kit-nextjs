"use client";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";

export function PrivacyView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const content = `
## Privacy Policy

Last updated: January 2024

### Information We Collect
We collect information you provide directly, including account information and usage data.

### How We Use Information
- To provide and improve our services
- To communicate with you
- To ensure security

### Data Security
We implement appropriate security measures to protect your data.

### Contact Us
For privacy concerns, contact privacy@designkit.com
  `;

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🔒 Privacy Policy</h1>
        <div className="retro-card" style={{ whiteSpace: "pre-wrap", fontSize: "11px", lineHeight: "1.5" }}>{content}</div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🔒 Privacy Policy</h1>
      <div className="main-card prose dark:prose-invert max-w-none" style={{ whiteSpace: "pre-wrap" }}>{content}</div>
    </div>
  );
}
