// Component Upload Page - Create new component
'use client';

import { mockCategories } from '@/src/data/mock/categories';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useToastStore } from '@/src/presentation/stores/toastStore';
import { useUserStore } from '@/src/presentation/stores/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UploadPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { currentUser, isAuthenticated, login } = useUserStore();
  const { addToast } = useToastStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    price: '',
    isFree: true,
    tags: '',
    htmlCode: '',
    reactCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-login as creator for demo
    if (!isAuthenticated) {
      login('sarah@designkit.com');
    }
  }, [isAuthenticated, login]);

  if (!mounted) return null;

  // Check if user is creator
  if (currentUser?.role !== 'creator' && currentUser?.role !== 'admin') {
    if (currentLayout === 'retro') {
      return (
        <div className="retro-page">
          <h1 className="retro-page-title">⚠️ Access Denied</h1>
          <div className="retro-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ marginBottom: '16px' }}>You need to be a creator to upload components.</p>
            <Link href="/profile">
              <button className="retro-btn retro-btn-primary">Go to Profile</button>
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="main-card">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Creator Access Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be a creator to upload components.
          </p>
          <Link href="/profile" className="main-btn main-btn-primary">
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));

    addToast('Component uploaded successfully! (Mock)', 'success');
    setIsSubmitting(false);
    router.push('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">📤 Upload Component</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
            <span className="retro-groupbox-title">Basic Information</span>
            <div style={{ padding: '8px' }}>
              <div style={{ marginBottom: '8px' }}>
                <label className="retro-input-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="retro-input"
                  required
                  placeholder="My Awesome Button"
                />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label className="retro-input-label">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="retro-input"
                  rows={3}
                  required
                  placeholder="Describe your component..."
                  style={{ resize: 'vertical' }}
                />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label className="retro-input-label">Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="retro-select"
                  required
                >
                  <option value="">Select category...</option>
                  {mockCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label className="retro-input-label">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="retro-input"
                  placeholder="button, gradient, modern"
                />
              </div>
            </div>
          </div>

          <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
            <span className="retro-groupbox-title">Pricing</span>
            <div style={{ padding: '8px' }}>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    name="isFree"
                    checked={formData.isFree}
                    onChange={handleChange}
                  />
                  Free Component
                </label>
              </div>
              {!formData.isFree && (
                <div>
                  <label className="retro-input-label">Price (USD) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="retro-input"
                    min="1"
                    placeholder="19"
                    required={!formData.isFree}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
            <span className="retro-groupbox-title">Code</span>
            <div style={{ padding: '8px' }}>
              <div style={{ marginBottom: '8px' }}>
                <label className="retro-input-label">HTML Code</label>
                <textarea
                  name="htmlCode"
                  value={formData.htmlCode}
                  onChange={handleChange}
                  className="retro-input"
                  rows={4}
                  placeholder="<button class='my-button'>Click me</button>"
                  style={{ fontFamily: 'monospace', fontSize: '11px' }}
                />
              </div>
              <div>
                <label className="retro-input-label">React Code</label>
                <textarea
                  name="reactCode"
                  value={formData.reactCode}
                  onChange={handleChange}
                  className="retro-input"
                  rows={4}
                  placeholder="export function MyButton() { ... }"
                  style={{ fontFamily: 'monospace', fontSize: '11px' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Link href="/dashboard">
              <button type="button" className="retro-btn">Cancel</button>
            </Link>
            <button
              type="submit"
              className="retro-btn retro-btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Uploading...' : '📤 Upload Component'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Main Layout
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          📤 Upload Component
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your creation with the community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="main-input-label">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="main-input"
                required
                placeholder="My Awesome Button"
              />
            </div>
            <div>
              <label className="main-input-label">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="main-input"
                rows={3}
                required
                placeholder="Describe what makes your component special..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="main-input-label">Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="main-select"
                  required
                >
                  <option value="">Select category...</option>
                  {mockCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="main-input-label">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="main-input"
                  placeholder="button, gradient, modern"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            Pricing
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isFree"
                checked={formData.isFree}
                onChange={handleChange}
                className="w-5 h-5 rounded"
              />
              <span className="text-gray-900 dark:text-white">
                Free Component
              </span>
            </label>
            {!formData.isFree && (
              <div>
                <label className="main-input-label">Price (USD) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="main-input"
                  min="1"
                  placeholder="19"
                  required={!formData.isFree}
                />
              </div>
            )}
          </div>
        </div>

        {/* Code */}
        <div className="main-card">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            Component Code
          </h2>
          <div className="space-y-4">
            <div>
              <label className="main-input-label">HTML Code</label>
              <textarea
                name="htmlCode"
                value={formData.htmlCode}
                onChange={handleChange}
                className="main-input font-mono text-sm"
                rows={5}
                placeholder="<button class='my-button'>Click me</button>"
              />
            </div>
            <div>
              <label className="main-input-label">React Code</label>
              <textarea
                name="reactCode"
                value={formData.reactCode}
                onChange={handleChange}
                className="main-input font-mono text-sm"
                rows={5}
                placeholder="export function MyButton() { ... }"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Link href="/dashboard" className="main-btn main-btn-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="main-btn main-btn-primary"
          >
            {isSubmitting ? 'Uploading...' : '📤 Upload Component'}
          </button>
        </div>
      </form>
    </div>
  );
}
