// MainHomeView - Modern style home page content
'use client';

import type { HomeViewModel } from '@/src/presentation/presenters/home/HomePresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import Link from 'next/link';

interface MainHomeViewProps {
  viewModel: HomeViewModel;
}

export function MainHomeView({ viewModel }: MainHomeViewProps) {
  // Hero animation
  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
  });

  // Stats animation
  const statsTrail = useTrail(3, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 300,
    config: { tension: 300, friction: 25 },
  });

  // Components trail animation
  const componentsTrail = useTrail(viewModel.featuredComponents.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 500,
    config: { tension: 280, friction: 25 },
  });

  const stats = [
    { label: 'Components', value: viewModel.stats.totalComponents, icon: '📦' },
    { label: 'Creators', value: viewModel.stats.totalCreators, icon: '👥' },
    { label: 'Downloads', value: viewModel.stats.totalDownloads.toLocaleString(), icon: '⬇️' },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <animated.section style={heroSpring} className="main-hero py-16">
        <h1 className="main-hero-title">
          Design Once,{' '}
          <span className="main-hero-gradient">Export Anywhere</span>
        </h1>
        <p className="main-hero-subtitle">
          Discover beautiful UI components and export them to HTML, React, or Next.js.
          Build faster with production-ready code.
        </p>
        <div className="main-hero-actions">
          <Link href="/components" className="main-btn main-btn-primary px-8 py-3 text-base">
            Browse Components
          </Link>
          <Link href="/docs" className="main-btn main-btn-secondary px-8 py-3 text-base">
            View Documentation
          </Link>
        </div>
      </animated.section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <animated.div key={stat.label} style={statsTrail[index]} className="main-card text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </animated.div>
          ))}
        </div>
      </section>

      {/* Featured Components */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Components
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The most popular components from our creators
            </p>
          </div>
          <Link href="/components" className="main-btn main-btn-ghost">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewModel.featuredComponents.map((component, index) => (
            <animated.div key={component.id} style={componentsTrail[index]}>
              <Link href={`/components/${component.id}`} className="block">
                <div className="main-card group">
                  {/* Preview Image */}
                  <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={component.previewUrl}
                      alt={component.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {component.isFree && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Free
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="main-card-header">
                    <span className="main-card-icon">{component.category?.icon || '📦'}</span>
                    <h3 className="main-card-title">{component.name}</h3>
                  </div>
                  <p className="main-card-description line-clamp-2 mb-4">
                    {component.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {component.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-400">
                        ({component.ratingCount})
                      </span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {component.isFree ? 'Free' : `$${component.price}`}
                    </div>
                  </div>
                </div>
              </Link>
            </animated.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {viewModel.categories.map((category) => (
            <Link
              key={category.id}
              href={`/components?category=${category.slug}`}
              className="main-card flex items-center gap-3 hover:border-indigo-500"
            >
              <span className="text-2xl">{category.icon}</span>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {category.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {category.componentCount} components
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
