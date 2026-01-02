// API Documentation Page
'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useState } from 'react';

const endpoints = [
  {
    method: 'GET',
    path: '/api/components',
    description: 'List all components with pagination',
    params: [
      { name: 'page', type: 'number', description: 'Page number (default: 1)' },
      { name: 'limit', type: 'number', description: 'Items per page (default: 20)' },
      { name: 'category', type: 'string', description: 'Filter by category ID' },
      { name: 'search', type: 'string', description: 'Search query' },
    ],
    response: `{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 20
}`,
  },
  {
    method: 'GET',
    path: '/api/components/:id',
    description: 'Get a single component by ID',
    params: [
      { name: 'id', type: 'string', description: 'Component ID (required)' },
    ],
    response: `{
  "id": "comp-1",
  "name": "Gradient Button",
  "price": 29,
  ...
}`,
  },
  {
    method: 'GET',
    path: '/api/categories',
    description: 'List all categories',
    params: [],
    response: `[
  { "id": "cat-1", "name": "Buttons", "icon": "🔘" },
  ...
]`,
  },
  {
    method: 'POST',
    path: '/api/components',
    description: 'Create a new component (creators only)',
    params: [
      { name: 'name', type: 'string', description: 'Component name (required)' },
      { name: 'description', type: 'string', description: 'Description (required)' },
      { name: 'categoryId', type: 'string', description: 'Category ID (required)' },
      { name: 'price', type: 'number', description: 'Price in USD (required)' },
    ],
    response: `{
  "id": "comp-new",
  "name": "My Component",
  ...
}`,
  },
  {
    method: 'GET',
    path: '/api/user/purchases',
    description: 'Get current user\'s purchases',
    params: [],
    response: `[
  { "id": "order-1", "componentId": "comp-1", "date": "2025-12-28" },
  ...
]`,
  },
];

const methodColors: Record<string, string> = {
  GET: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  POST: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  PUT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function ApiDocsPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🔌 API Documentation</h1>
        <p style={{ marginBottom: '12px', fontSize: '12px' }}>
          REST API reference for integrating with Design Kit.
        </p>

        <div className="retro-card" style={{ marginBottom: '12px', background: '#ffffcc' }}>
          <strong>Base URL:</strong> https://api.designkit.com/v1
        </div>

        {endpoints.map((endpoint) => (
          <div key={`${endpoint.method}-${endpoint.path}`} className="retro-groupbox" style={{ marginBottom: '8px' }}>
            <span className="retro-groupbox-title">
              <span style={{
                background: endpoint.method === 'GET' ? 'green' : endpoint.method === 'POST' ? 'blue' : 'gray',
                color: 'white',
                padding: '2px 6px',
                fontSize: '10px',
                marginRight: '8px',
              }}>
                {endpoint.method}
              </span>
              {endpoint.path}
            </span>
            <div style={{ padding: '8px', fontSize: '12px' }}>
              <p style={{ marginBottom: '8px' }}>{endpoint.description}</p>
              {endpoint.params.length > 0 && (
                <>
                  <strong>Parameters:</strong>
                  <table style={{ width: '100%', marginTop: '4px', fontSize: '11px' }}>
                    <thead>
                      <tr style={{ background: '#c0c0c0' }}>
                        <th style={{ padding: '4px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '4px', textAlign: 'left' }}>Type</th>
                        <th style={{ padding: '4px', textAlign: 'left' }}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoint.params.map((param) => (
                        <tr key={param.name}>
                          <td style={{ padding: '4px', border: '1px solid #808080' }}>{param.name}</td>
                          <td style={{ padding: '4px', border: '1px solid #808080' }}>{param.type}</td>
                          <td style={{ padding: '4px', border: '1px solid #808080' }}>{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
              <div style={{ marginTop: '8px' }}>
                <strong>Response:</strong>
                <pre style={{ background: '#000', color: '#0f0', padding: '8px', fontSize: '10px', overflow: 'auto' }}>
                  {endpoint.response}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🔌 API Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          REST API reference for integrating with Design Kit
        </p>
      </div>

      <div className="main-card mb-8 bg-indigo-50 dark:bg-indigo-900/20">
        <p className="text-sm">
          <strong>Base URL:</strong>{' '}
          <code className="px-2 py-1 bg-white dark:bg-gray-800 rounded">
            https://api.designkit.com/v1
          </code>
        </p>
      </div>

      <div className="space-y-4">
        {endpoints.map((endpoint) => {
          const isExpanded = expandedEndpoint === `${endpoint.method}-${endpoint.path}`;
          return (
            <div key={`${endpoint.method}-${endpoint.path}`} className="main-card">
              <button
                onClick={() => setExpandedEndpoint(isExpanded ? null : `${endpoint.method}-${endpoint.path}`)}
                className="w-full flex items-center gap-4 text-left"
              >
                <span className={`px-3 py-1 rounded text-xs font-bold ${methodColors[endpoint.method]}`}>
                  {endpoint.method}
                </span>
                <code className="font-mono text-gray-900 dark:text-white">
                  {endpoint.path}
                </code>
                <span className="flex-1 text-gray-500 dark:text-gray-400 text-sm truncate">
                  {endpoint.description}
                </span>
                <span className="text-gray-400">{isExpanded ? '−' : '+'}</span>
              </button>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{endpoint.description}</p>

                  {endpoint.params.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Parameters</h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-gray-500">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Type</th>
                            <th className="pb-2">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {endpoint.params.map((param) => (
                            <tr key={param.name}>
                              <td className="py-2 font-mono text-indigo-600">{param.name}</td>
                              <td className="py-2 text-gray-500">{param.type}</td>
                              <td className="py-2 text-gray-600 dark:text-gray-400">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Response</h4>
                    <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
                      {endpoint.response}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
