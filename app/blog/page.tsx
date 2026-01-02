// Blog Page
'use client';

import { categoryIcons, mockBlogPosts } from '@/src/data/mock/blog';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useState } from 'react';

export default function BlogPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['all', 'news', 'tutorial', 'changelog', 'update'];
  
  const filteredPosts = selectedCategory && selectedCategory !== 'all'
    ? mockBlogPosts.filter(p => p.category === selectedCategory)
    : mockBlogPosts;

  const featuredPost = mockBlogPosts.find(p => p.featured);

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📰 Blog & Updates</h1>

        {/* Categories */}
        <div style={{ marginBottom: '12px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`retro-btn ${selectedCategory === cat || (cat === 'all' && !selectedCategory) ? 'retro-btn-primary' : ''}`}
              onClick={() => setSelectedCategory(cat === 'all' ? null : cat)}
              style={{ fontSize: '11px', padding: '4px 8px' }}
            >
              {cat === 'all' ? '📋 All' : `${categoryIcons[cat as keyof typeof categoryIcons]} ${cat}`}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div style={{ display: 'grid', gap: '8px' }}>
          {filteredPosts.map((post) => (
            <div key={post.id} className="retro-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '11px', background: '#c0c0c0', padding: '2px 4px' }}>
                    {categoryIcons[post.category]} {post.category}
                  </span>
                  <h3 style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '4px' }}>
                    {post.title}
                  </h3>
                </div>
                {post.featured && (
                  <span style={{ fontSize: '10px', background: '#ffff00', padding: '2px 4px' }}>
                    ⭐ FEATURED
                  </span>
                )}
              </div>
              <p style={{ fontSize: '11px', color: 'gray', margin: '8px 0' }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
                <span>By {post.author} • {post.publishedAt}</span>
                <span>{post.readTime} read</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📰 Blog & Updates
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          News, tutorials, and changelogs from the Design Kit team
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="main-card mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="flex items-start gap-4">
            <span className="text-4xl">{categoryIcons[featuredPost.category]}</span>
            <div className="flex-1">
              <span className="text-sm opacity-80">Featured</span>
              <h2 className="text-2xl font-bold mb-2">{featuredPost.title}</h2>
              <p className="opacity-90 mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-sm opacity-80">
                <span>By {featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.publishedAt}</span>
                <span>•</span>
                <span>{featuredPost.readTime} read</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === 'all' ? null : cat)}
            className={`main-btn ${
              selectedCategory === cat || (cat === 'all' && !selectedCategory)
                ? 'main-btn-primary'
                : 'main-btn-secondary'
            }`}
          >
            {cat === 'all' ? '📋 All' : `${categoryIcons[cat as keyof typeof categoryIcons]} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="main-card hover:border-indigo-500 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{categoryIcons[post.category]}</span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                {post.category}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-6 h-6 rounded-full"
              />
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
