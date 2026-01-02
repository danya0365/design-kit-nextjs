// RetroComponentsView - Windows 98/IE5 style components browse page
'use client';

import type { ComponentsViewModel } from '@/src/presentation/presenters/components/ComponentsPresenter';
import type { ComponentsPresenterActions } from '@/src/presentation/presenters/components/useComponentsPresenter';
import Link from 'next/link';
import { useState } from 'react';

interface RetroComponentsViewProps {
  viewModel: ComponentsViewModel;
  actions: ComponentsPresenterActions;
  loading: boolean;
}

export function RetroComponentsView({ viewModel, actions, loading }: RetroComponentsViewProps) {
  const [searchInput, setSearchInput] = useState(viewModel.searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    viewModel.filters.categoryId || null
  );

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

  return (
    <div className="retro-page">
      {/* Header */}
      <h1 className="retro-page-title">📦 Browse Components</h1>
      
      {/* Search */}
      <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
        <span className="retro-groupbox-title">🔍 Search</span>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', padding: '8px' }}>
          <input
            type="text"
            placeholder="Search components..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="retro-input"
            style={{ flex: 1 }}
          />
          <button type="submit" className="retro-btn">
            Search
          </button>
          <button type="button" className="retro-btn" onClick={actions.clearFilters}>
            Clear
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        {/* Sidebar - Categories */}
        <div className="retro-groupbox" style={{ width: '180px', flexShrink: 0 }}>
          <span className="retro-groupbox-title">📁 Categories</span>
          <div style={{ padding: '8px' }}>
            <div
              onClick={() => handleCategoryFilter(null)}
              className="retro-link"
              style={{
                display: 'block',
                padding: '4px',
                cursor: 'pointer',
                background: !selectedCategory ? '#000080' : 'transparent',
                color: !selectedCategory ? '#fff' : '#0000ff',
              }}
            >
              All ({viewModel.pagination.totalCount})
            </div>
            {viewModel.categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className="retro-link"
                style={{
                  display: 'block',
                  padding: '4px',
                  cursor: 'pointer',
                  background: selectedCategory === category.id ? '#000080' : 'transparent',
                  color: selectedCategory === category.id ? '#fff' : '#0000ff',
                }}
              >
                {category.icon} {category.name} ({category.componentCount})
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Loading...</p>
            </div>
          )}

          {!loading && viewModel.components.length === 0 && (
            <div className="retro-card" style={{ textAlign: 'center', padding: '40px' }}>
              <p>No components found.</p>
              <button className="retro-btn" onClick={actions.clearFilters} style={{ marginTop: '8px' }}>
                Clear Filters
              </button>
            </div>
          )}

          {!loading && viewModel.components.length > 0 && (
            <>
              {/* Components List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                {viewModel.components.map((component) => (
                  <Link key={component.id} href={`/components/${component.id}`}>
                    <div className="retro-card" style={{ cursor: 'pointer', height: '100%' }}>
                      <div className="retro-card-header">
                        <span className="retro-card-icon">{component.category?.icon || '📦'}</span>
                        <span className="retro-card-title">{component.name}</span>
                      </div>
                      <p className="retro-card-description" style={{ marginBottom: '8px', fontSize: '11px' }}>
                        {component.description.substring(0, 80)}...
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span>⭐ {component.rating.toFixed(1)} | ⬇️ {component.downloadCount}</span>
                        <span style={{ fontWeight: 'bold', color: component.isFree ? 'green' : 'inherit' }}>
                          {component.isFree ? 'FREE' : `$${component.price}`}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {viewModel.pagination.totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                  <button
                    className="retro-btn"
                    onClick={() => actions.setPage(viewModel.pagination.page - 1)}
                    disabled={viewModel.pagination.page <= 1}
                  >
                    « Prev
                  </button>
                  <span style={{ padding: '4px 12px' }}>
                    Page {viewModel.pagination.page} of {viewModel.pagination.totalPages}
                  </span>
                  <button
                    className="retro-btn"
                    onClick={() => actions.setPage(viewModel.pagination.page + 1)}
                    disabled={viewModel.pagination.page >= viewModel.pagination.totalPages}
                  >
                    Next »
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
