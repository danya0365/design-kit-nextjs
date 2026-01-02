"use client";

import { FaqViewModel } from "@/src/presentation/presenters/faq/FaqPresenter";
import { useFaqPresenter } from "@/src/presentation/presenters/faq/useFaqPresenter";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useState } from "react";

interface FaqViewProps {
  initialViewModel?: FaqViewModel;
}

export function FaqView({ initialViewModel }: FaqViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { viewModel, loading } = useFaqPresenter(initialViewModel);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!viewModel) return null;

  const filteredFaqs = activeCategory === "All"
    ? viewModel.faqs
    : viewModel.faqs.filter(f => f.category === activeCategory);

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">❓ Frequently Asked Questions</h1>

        <div style={{ marginBottom: "12px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {viewModel.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`retro-btn ${activeCategory === cat ? "retro-btn-primary" : ""}`}
              style={{ fontSize: "10px" }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📋 Questions</span>
          <div style={{ padding: "8px" }}>
            {filteredFaqs.map((faq, idx) => (
              <div key={idx} className="retro-card" style={{ marginBottom: "4px", cursor: "pointer" }} onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                  {expandedIndex === idx ? "▼" : "▶"} {faq.question}
                </div>
                {expandedIndex === idx && (
                  <div style={{ fontSize: "11px", marginTop: "4px", paddingLeft: "12px", borderLeft: "2px solid #808080" }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">❓ FAQ</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Find answers to common questions</p>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {viewModel.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeCategory === cat ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="main-card cursor-pointer"
            onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
              <span className="text-2xl">{expandedIndex === idx ? "−" : "+"}</span>
            </div>
            {expandedIndex === idx && (
              <p className="mt-4 text-gray-600 dark:text-gray-400 border-t pt-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
