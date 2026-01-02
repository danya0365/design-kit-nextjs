// Mock Collections/Bundles data
import { mockComponents } from './components';

export interface Collection {
  id: string;
  name: string;
  description: string;
  icon: string;
  componentIds: string[];
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  featured: boolean;
}

export const mockCollections: Collection[] = [
  {
    id: 'collection-1',
    name: 'Landing Page Starter Kit',
    description: 'Everything you need to build a stunning landing page. Includes hero sections, CTAs, testimonials, and more.',
    icon: '🚀',
    componentIds: ['comp-1', 'comp-2', 'comp-3', 'comp-5'],
    originalPrice: 116,
    discountedPrice: 79,
    discount: 32,
    featured: true,
  },
  {
    id: 'collection-2',
    name: 'Dashboard Essentials',
    description: 'Complete dashboard UI kit with charts, tables, cards, and navigation components.',
    icon: '📊',
    componentIds: ['comp-4', 'comp-6', 'comp-8'],
    originalPrice: 87,
    discountedPrice: 59,
    discount: 32,
    featured: true,
  },
  {
    id: 'collection-3',
    name: 'Form Builder Pack',
    description: 'Beautiful form components including inputs, selects, checkboxes, and validation states.',
    icon: '📝',
    componentIds: ['comp-7', 'comp-9'],
    originalPrice: 58,
    discountedPrice: 39,
    discount: 33,
    featured: false,
  },
  {
    id: 'collection-4',
    name: 'E-commerce UI Bundle',
    description: 'Product cards, shopping cart, checkout flow, and order confirmation components.',
    icon: '🛍️',
    componentIds: ['comp-1', 'comp-5', 'comp-8', 'comp-10'],
    originalPrice: 127,
    discountedPrice: 89,
    discount: 30,
    featured: true,
  },
];

// Helper to get components for a collection
export const getCollectionComponents = (collectionId: string) => {
  const collection = mockCollections.find(c => c.id === collectionId);
  if (!collection) return [];
  return mockComponents.filter(c => collection.componentIds.includes(c.id));
};
