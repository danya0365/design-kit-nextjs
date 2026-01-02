// MainComponentsView - Modern style components browse page
'use client';

import type { ComponentsViewModel } from '@/src/presentation/presenters/components/ComponentsPresenter';
import type { ComponentsPresenterActions } from '@/src/presentation/presenters/components/useComponentsPresenter';
import { animated, useTrail } from '@react-spring/web';
import Link from 'next/link';
import { useState } from 'react';

interface MainComponentsViewProps {
  viewModel: ComponentsViewModel;
  actions: ComponentsPresenterActions;
  loading: boolean;
}

export function MainComponentsView({ viewModel, actions, loading }: MainComponentsViewProps) {
  const [searchInput, setSearchInput] = useState(viewModel.searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    viewModel.filters.categoryId || null
  );

  const componentsTrail = useTrail(viewModel.components.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 25 },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    actions.setSearch(searchInput);
  };

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      actions.setFilters({ ...viewModel.filters, categoryId });
    } else {
      const { categoryId: _, ...rest } = viewModel.filters;
      actions.setFilters(rest);
    }
  };

  const handlePriceFilter = (isFree: boolean | undefined) => {
    if (isFree === undefined) {
      const { isFree: _, ...rest } = viewModel.filters;
      actions.setFilters(rest);
    } else {
      actions.setFilters({ ...viewModel.filters, isFree });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Browse Components
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover {viewModel.pagination.totalCount} beautiful UI components
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search components..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="main-input pr-12"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              🔍
            </button>
          </div>
        </form>

        {/* Price Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => handlePriceFilter(undefined)}
            className={`main-btn ${viewModel.filters.isFree === undefined ? 'main-btn-primary' : 'main-btn-secondary'}`}
          >
            All
          </button>
          <button
            onClick={() => handlePriceFilter(true)}
            className={`main-btn ${viewModel.filters.isFree === true ? 'main-btn-primary' : 'main-btn-secondary'}`}
          >
            Free
          </button>
          <button
            onClick={() => handlePriceFilter(false)}
            className={`main-btn ${viewModel.filters.isFree === false ? 'main-btn-primary' : 'main-btn-secondary'}`}
          >
            Paid
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Categories */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="main-card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <div className="space-y-1">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  !selectedCategory
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                All Categories
              </button>
              {viewModel.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span className="ml-auto text-xs text-gray-400">
                    {category.componentCount}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {!loading && viewModel.components.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No components found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search or filters
              </p>
              <button onClick={actions.clearFilters} className="main-btn main-btn-secondary">
                Clear Filters
              </button>
            </div>
          )}

          {!loading && viewModel.components.length > 0 && (
            <>
              {/* Components Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {viewModel.components.map((component, index) => (
                  <animated.div key={component.id} style={componentsTrail[index]}>
                    <Link href={`/components/${component.id}`} className="block">
                      <div className="main-card group h-full">
                        {/* Preview */}
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
                        <div className="flex items-center gap-2 mb-2">
                          <span>{component.category?.icon || '📦'}</span>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {component.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                          {component.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-500">⭐</span>
                            <span>{component.rating.toFixed(1)}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{component.downloadCount} downloads</span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {component.isFree ? 'Free' : `$${component.price}`}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </animated.div>
                ))}
              </div>

              {/* Pagination */}
              {viewModel.pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <button
                    onClick={() => actions.setPage(viewModel.pagination.page - 1)}
                    disabled={viewModel.pagination.page <= 1}
                    className="main-btn main-btn-secondary disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    Page {viewModel.pagination.page} of {viewModel.pagination.totalPages}
                  </span>
                  <button
                    onClick={() => actions.setPage(viewModel.pagination.page + 1)}
                    disabled={viewModel.pagination.page >= viewModel.pagination.totalPages}
                    className="main-btn main-btn-secondary disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
