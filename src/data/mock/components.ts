// Mock Components Data
import type { DesignComponent } from '@/src/domain/entities';
import { mockCategories } from './categories';

export const mockComponents: DesignComponent[] = [
  {
    id: 'comp-1',
    creatorId: 'creator-1',
    name: 'Gradient Button Pack',
    description: 'A collection of stunning gradient buttons with hover animations and various sizes. Perfect for modern web applications.',
    categoryId: 'cat-1',
    category: mockCategories[0],
    tags: ['button', 'gradient', 'animation', 'hover'],
    previewUrl: 'https://placehold.co/800x600/6366f1/white?text=Gradient+Buttons',
    previewImages: [
      'https://placehold.co/800x600/6366f1/white?text=Preview+1',
      'https://placehold.co/800x600/8b5cf6/white?text=Preview+2',
    ],
    price: 0,
    isFree: true,
    pricingType: 'free',
    licenseType: 'personal',
    variants: [
      { id: 'v1', name: 'Primary', props: { variant: 'primary' } },
      { id: 'v2', name: 'Secondary', props: { variant: 'secondary' } },
      { id: 'v3', name: 'Outline', props: { variant: 'outline' } },
    ],
    exports: [
      { id: 'e1', componentId: 'comp-1', platform: 'react', styleSystem: 'tailwind', codeTemplate: '// React code...', createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-15T10:00:00Z' },
      { id: 'e2', componentId: 'comp-1', platform: 'html', styleSystem: 'css', codeTemplate: '<!-- HTML code... -->', createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-15T10:00:00Z' },
    ],
    downloadCount: 1250,
    rating: 4.8,
    ratingCount: 89,
    isPublished: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:00:00Z',
  },
  {
    id: 'comp-2',
    creatorId: 'creator-2',
    name: 'Glass Card Collection',
    description: 'Beautiful glassmorphism cards with blur effects. Includes product cards, profile cards, and pricing cards.',
    categoryId: 'cat-3',
    category: mockCategories[2],
    tags: ['card', 'glassmorphism', 'blur', 'modern'],
    previewUrl: 'https://placehold.co/800x600/ec4899/white?text=Glass+Cards',
    previewImages: [
      'https://placehold.co/800x600/ec4899/white?text=Card+1',
      'https://placehold.co/800x600/f43f5e/white?text=Card+2',
    ],
    price: 19,
    isFree: false,
    pricingType: 'paid',
    licenseType: 'commercial',
    variants: [
      { id: 'v1', name: 'Product Card', props: { type: 'product' } },
      { id: 'v2', name: 'Profile Card', props: { type: 'profile' } },
      { id: 'v3', name: 'Pricing Card', props: { type: 'pricing' } },
    ],
    exports: [
      { id: 'e1', componentId: 'comp-2', platform: 'react', styleSystem: 'tailwind', codeTemplate: '// React code...', createdAt: '2024-01-12T10:00:00Z', updatedAt: '2024-01-12T10:00:00Z' },
      { id: 'e2', componentId: 'comp-2', platform: 'nextjs', styleSystem: 'tailwind', codeTemplate: '// Next.js code...', createdAt: '2024-01-12T10:00:00Z', updatedAt: '2024-01-12T10:00:00Z' },
    ],
    downloadCount: 845,
    rating: 4.9,
    ratingCount: 67,
    isPublished: true,
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-18T16:00:00Z',
  },
  {
    id: 'comp-3',
    creatorId: 'creator-3',
    name: 'Modern Form Kit',
    description: 'Complete form components including inputs, selects, checkboxes, and radio buttons with built-in validation.',
    categoryId: 'cat-2',
    category: mockCategories[1],
    tags: ['form', 'input', 'validation', 'accessibility'],
    previewUrl: 'https://placehold.co/800x600/10b981/white?text=Form+Kit',
    previewImages: [
      'https://placehold.co/800x600/10b981/white?text=Form+1',
      'https://placehold.co/800x600/14b8a6/white?text=Form+2',
    ],
    price: 29,
    isFree: false,
    pricingType: 'paid',
    licenseType: 'commercial',
    variants: [
      { id: 'v1', name: 'Light Theme', props: { theme: 'light' } },
      { id: 'v2', name: 'Dark Theme', props: { theme: 'dark' } },
    ],
    exports: [
      { id: 'e1', componentId: 'comp-3', platform: 'react', styleSystem: 'tailwind', codeTemplate: '// React code...', createdAt: '2024-01-10T10:00:00Z', updatedAt: '2024-01-10T10:00:00Z' },
    ],
    downloadCount: 2100,
    rating: 4.7,
    ratingCount: 145,
    isPublished: true,
    createdAt: '2024-01-10T12:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
  },
  {
    id: 'comp-4',
    creatorId: 'creator-1',
    name: 'Dashboard Starter',
    description: 'A complete dashboard layout with sidebar navigation, stats cards, charts placeholder, and data tables.',
    categoryId: 'cat-5',
    category: mockCategories[4],
    tags: ['dashboard', 'admin', 'layout', 'sidebar'],
    previewUrl: 'https://placehold.co/800x600/3b82f6/white?text=Dashboard',
    previewImages: [
      'https://placehold.co/800x600/3b82f6/white?text=Dashboard+1',
      'https://placehold.co/800x600/2563eb/white?text=Dashboard+2',
    ],
    price: 49,
    isFree: false,
    pricingType: 'paid',
    licenseType: 'commercial',
    variants: [
      { id: 'v1', name: 'Default', props: { layout: 'default' } },
      { id: 'v2', name: 'Compact', props: { layout: 'compact' } },
    ],
    exports: [
      { id: 'e1', componentId: 'comp-4', platform: 'nextjs', styleSystem: 'tailwind', codeTemplate: '// Next.js code...', createdAt: '2024-01-08T10:00:00Z', updatedAt: '2024-01-08T10:00:00Z' },
    ],
    downloadCount: 1580,
    rating: 4.9,
    ratingCount: 112,
    isPublished: true,
    createdAt: '2024-01-08T14:00:00Z',
    updatedAt: '2024-01-25T08:00:00Z',
  },
  {
    id: 'comp-5',
    creatorId: 'creator-2',
    name: 'Hero Section Pack',
    description: 'Eye-catching hero sections with gradient backgrounds, animated elements, and responsive layouts.',
    categoryId: 'cat-6',
    category: mockCategories[5],
    tags: ['hero', 'landing', 'animation', 'gradient'],
    previewUrl: 'https://placehold.co/800x600/f59e0b/white?text=Hero+Sections',
    previewImages: [
      'https://placehold.co/800x600/f59e0b/white?text=Hero+1',
      'https://placehold.co/800x600/d97706/white?text=Hero+2',
    ],
    price: 0,
    isFree: true,
    pricingType: 'free',
    licenseType: 'personal',
    variants: [
      { id: 'v1', name: 'Centered', props: { layout: 'centered' } },
      { id: 'v2', name: 'Split', props: { layout: 'split' } },
      { id: 'v3', name: 'Image Background', props: { layout: 'image-bg' } },
    ],
    exports: [
      { id: 'e1', componentId: 'comp-5', platform: 'html', styleSystem: 'tailwind', codeTemplate: '<!-- HTML code... -->', createdAt: '2024-01-05T10:00:00Z', updatedAt: '2024-01-05T10:00:00Z' },
      { id: 'e2', componentId: 'comp-5', platform: 'react', styleSystem: 'tailwind', codeTemplate: '// React code...', createdAt: '2024-01-05T10:00:00Z', updatedAt: '2024-01-05T10:00:00Z' },
    ],
    downloadCount: 3200,
    rating: 4.6,
    ratingCount: 234,
    isPublished: true,
    createdAt: '2024-01-05T16:00:00Z',
    updatedAt: '2024-01-28T12:00:00Z',
  },
  {
    id: 'comp-6',
    creatorId: 'creator-3',
    name: 'Navigation Bar Bundle',
    description: 'Responsive navigation bars with dropdowns, mobile menus, and search integration.',
    categoryId: 'cat-4',
    category: mockCategories[3],
    tags: ['navbar', 'navigation', 'responsive', 'dropdown'],
    previewUrl: 'https://placehold.co/800x600/8b5cf6/white?text=NavBar',
    previewImages: [
      'https://placehold.co/800x600/8b5cf6/white?text=NavBar+1',
      'https://placehold.co/800x600/7c3aed/white?text=NavBar+2',
    ],
    price: 15,
    isFree: false,
    pricingType: 'paid',
    licenseType: 'personal',
    variants: [
      { id: 'v1', name: 'Standard', props: { type: 'standard' } },
      { id: 'v2', name: 'Transparent', props: { type: 'transparent' } },
      { id: 'v3', name: 'Sidebar', props: { type: 'sidebar' } },
    ],
    exports: [
      { id: 'e1', componentId: 'comp-6', platform: 'react', styleSystem: 'tailwind', codeTemplate: '// React code...', createdAt: '2024-01-03T10:00:00Z', updatedAt: '2024-01-03T10:00:00Z' },
    ],
    downloadCount: 920,
    rating: 4.5,
    ratingCount: 78,
    isPublished: true,
    createdAt: '2024-01-03T10:00:00Z',
    updatedAt: '2024-01-20T18:00:00Z',
  },
];

// Helper to get featured components (highest rated)
export const getFeaturedComponents = (limit = 6): DesignComponent[] => {
  return [...mockComponents]
    .filter(c => c.isPublished)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Helper to get free components
export const getFreeComponents = (): DesignComponent[] => {
  return mockComponents.filter(c => c.isFree && c.isPublished);
};

// Helper to get components by category
export const getComponentsByCategory = (categoryId: string): DesignComponent[] => {
  return mockComponents.filter(c => c.categoryId === categoryId && c.isPublished);
};
