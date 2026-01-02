"use client";

import { BlogViewModel } from "@/src/presentation/presenters/blog/BlogPresenter";
import { useBlogPresenter } from "@/src/presentation/presenters/blog/useBlogPresenter";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useState } from "react";

interface BlogViewProps {
  initialViewModel?: BlogViewModel;
}

export function BlogView({ initialViewModel }: BlogViewProps) {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { viewModel, loading, loadData } = useBlogPresenter(initialViewModel);
  const [activeCategory, setActiveCategory] = useState("all");

  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!viewModel) return null;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    loadData(cat);
  };

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📝 Blog</h1>

        {/* Featured */}
        {viewModel.featuredPost && (
          <div className="retro-card" style={{ marginBottom: "12px", background: "#ffffcc" }}>
            <span style={{ fontSize: "10px", background: "red", color: "white", padding: "2px 4px" }}>FEATURED</span>
            <h2 style={{ fontSize: "14px", fontWeight: "bold", marginTop: "4px" }}>{viewModel.featuredPost.title}</h2>
            <p style={{ fontSize: "11px", marginTop: "4px" }}>{viewModel.featuredPost.excerpt}</p>
            <div style={{ fontSize: "10px", color: "gray", marginTop: "4px" }}>
              {viewModel.featuredPost.read_time} read
            </div>
          </div>
        )}

        {/* Categories */}
        <div style={{ marginBottom: "12px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {viewModel.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`retro-btn ${activeCategory === cat ? "retro-btn-primary" : ""}`}
              style={{ fontSize: "10px" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📰 Articles</span>
          <div style={{ padding: "8px" }}>
            {viewModel.posts.map((post) => (
              <div key={post.id} className="retro-card" style={{ marginBottom: "8px" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "bold" }}>{post.title}</h3>
                <p style={{ fontSize: "10px", color: "gray" }}>{post.excerpt}</p>
                <div style={{ fontSize: "9px", marginTop: "4px" }}>
                  <span style={{ background: "#c0c0c0", padding: "2px 4px" }}>{post.category}</span>
                  <span style={{ marginLeft: "8px" }}>{post.read_time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">📝 Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">News, tutorials, and updates</p>
      </div>

      {/* Featured */}
      {viewModel.featuredPost && (
        <div className="main-card mb-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <span className="px-2 py-1 bg-white/20 rounded text-xs mb-4 inline-block">Featured</span>
          <h2 className="text-2xl font-bold mb-2">{viewModel.featuredPost.title}</h2>
          <p className="opacity-90 mb-4">{viewModel.featuredPost.excerpt}</p>
          <div className="text-sm opacity-75">{viewModel.featuredPost.read_time} read</div>
        </div>
      )}

      {/* Categories */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {viewModel.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              activeCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {viewModel.posts.map((post) => (
          <div key={post.id} className="main-card hover:border-indigo-500">
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded capitalize">
              {post.category}
            </span>
            <h3 className="text-lg font-semibold mt-3 text-gray-900 dark:text-white">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <span>{post.read_time} read</span>
              <span>{new Date(post.published_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
