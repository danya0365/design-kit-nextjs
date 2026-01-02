"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";
import { useState } from "react";

const supportOptions = [
  { 
    title: "Documentation", 
    icon: "📚", 
    description: "Browse our comprehensive docs",
    href: "/docs" 
  },
  { 
    title: "FAQ", 
    icon: "❓", 
    description: "Find answers to common questions",
    href: "/faq" 
  },
  { 
    title: "Contact Us", 
    icon: "📧", 
    description: "Get in touch with our team",
    href: "/contact" 
  },
  { 
    title: "Community", 
    icon: "👥", 
    description: "Join our Discord community",
    href: "#" 
  },
];

const supportArticles = [
  { title: "How to get started with Design Kit", category: "Getting Started" },
  { title: "Installing components in your project", category: "Installation" },
  { title: "Customizing themes and colors", category: "Customization" },
  { title: "Troubleshooting common issues", category: "Troubleshooting" },
  { title: "Upgrading to the latest version", category: "Updates" },
];

export function SupportView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [searchQuery, setSearchQuery] = useState("");

  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🆘 Support Center</h1>
        
        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">🔍 Search Help</span>
          <div style={{ padding: "8px" }}>
            <input 
              type="text" 
              placeholder="Search for help..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "4px" }}
            />
          </div>
        </div>

        <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
          <span className="retro-groupbox-title">📋 Support Options</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", padding: "8px" }}>
            {supportOptions.map((opt) => (
              <Link key={opt.title} href={opt.href}>
                <div className="retro-card" style={{ cursor: "pointer" }}>
                  <div style={{ fontSize: "20px" }}>{opt.icon}</div>
                  <div style={{ fontWeight: "bold", fontSize: "11px" }}>{opt.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📰 Popular Articles</span>
          <div style={{ padding: "8px" }}>
            {supportArticles.map((article, i) => (
              <div key={i} className="retro-card" style={{ marginBottom: "4px", padding: "4px 8px" }}>
                <span style={{ fontSize: "10px", color: "gray" }}>[{article.category}]</span>{" "}
                <span style={{ fontSize: "11px" }}>{article.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🆘 Support Center</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">How can we help you today?</p>
      </div>

      {/* Search */}
      <div className="main-card mb-8">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {supportOptions.map((opt) => (
          <Link key={opt.title} href={opt.href}>
            <div className="main-card hover:border-indigo-500 cursor-pointer text-center h-full">
              <div className="text-4xl mb-4">{opt.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{opt.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{opt.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="main-card">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📰 Popular Articles</h2>
        <div className="space-y-4">
          {supportArticles.map((article, i) => (
            <div key={i} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
              <span className="inline-block px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-full mb-2">
                {article.category}
              </span>
              <h3 className="text-gray-900 dark:text-white font-medium">{article.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Can&apos;t find what you&apos;re looking for?</p>
        <Link href="/contact" className="main-btn main-btn-primary">
          Contact Support Team
        </Link>
      </div>
    </div>
  );
}
