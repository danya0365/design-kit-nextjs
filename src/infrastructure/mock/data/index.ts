/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Mock Data Tables - Supabase table format
 * Used by MockSupabaseClient
 */

// Categories table
export const categoriesTable = [
  { id: 'cat-1', name: 'Buttons', slug: 'buttons', icon: '🔘', description: 'Button components', created_at: '2025-01-01' },
  { id: 'cat-2', name: 'Cards', slug: 'cards', icon: '🃏', description: 'Card layouts', created_at: '2025-01-01' },
  { id: 'cat-3', name: 'Forms', slug: 'forms', icon: '📝', description: 'Form elements', created_at: '2025-01-01' },
  { id: 'cat-4', name: 'Navigation', slug: 'navigation', icon: '🧭', description: 'Navigation components', created_at: '2025-01-01' },
  { id: 'cat-5', name: 'Hero', slug: 'hero', icon: '🦸', description: 'Hero sections', created_at: '2025-01-01' },
  { id: 'cat-6', name: 'Modals', slug: 'modals', icon: '🪟', description: 'Modal dialogs', created_at: '2025-01-01' },
  { id: 'cat-7', name: 'Tables', slug: 'tables', icon: '📊', description: 'Data tables', created_at: '2025-01-01' },
  { id: 'cat-8', name: 'Charts', slug: 'charts', icon: '📈', description: 'Chart components', created_at: '2025-01-01' },
  { id: 'cat-9', name: 'Footers', slug: 'footers', icon: '🦶', description: 'Footer sections', created_at: '2025-01-01' },
  { id: 'cat-10', name: 'Pricing', slug: 'pricing', icon: '💰', description: 'Pricing tables', created_at: '2025-01-01' },
];

// Components table
export const componentsTable = [
  {
    id: 'comp-1',
    name: 'Gradient Button Pack',
    slug: 'gradient-button-pack',
    description: 'A collection of beautiful gradient buttons with hover animations.',
    category_id: 'cat-1',
    creator_id: 'user-2',
    price: 29,
    is_free: false,
    is_featured: true,
    preview_url: 'https://picsum.photos/seed/comp1/400/300',
    code_html: '<button class="btn-gradient">Click me</button>',
    code_react: 'export const GradientButton = () => <button className="btn-gradient">Click me</button>',
    rating: 4.8,
    download_count: 1250,
    view_count: 5600,
    tags: ['button', 'gradient', 'animation'],
    created_at: '2025-12-01',
    updated_at: '2025-12-15',
  },
  {
    id: 'comp-2',
    name: 'Hero Section Pro',
    slug: 'hero-section-pro',
    description: 'Modern hero section with animated background and CTA buttons.',
    category_id: 'cat-5',
    creator_id: 'user-2',
    price: 49,
    is_free: false,
    is_featured: true,
    preview_url: 'https://picsum.photos/seed/comp2/400/300',
    code_html: '<section class="hero">...</section>',
    code_react: 'export const HeroSection = () => <section className="hero">...</section>',
    rating: 4.9,
    download_count: 890,
    view_count: 4200,
    tags: ['hero', 'landing', 'animation'],
    created_at: '2025-11-20',
    updated_at: '2025-12-10',
  },
  {
    id: 'comp-3',
    name: 'Card Collection',
    slug: 'card-collection',
    description: 'Versatile card components for various use cases.',
    category_id: 'cat-2',
    creator_id: 'user-2',
    price: 0,
    is_free: true,
    is_featured: false,
    preview_url: 'https://picsum.photos/seed/comp3/400/300',
    code_html: '<div class="card">...</div>',
    code_react: 'export const Card = () => <div className="card">...</div>',
    rating: 4.5,
    download_count: 2100,
    view_count: 8500,
    tags: ['card', 'free', 'layout'],
    created_at: '2025-10-15',
    updated_at: '2025-11-20',
  },
  {
    id: 'comp-4',
    name: 'Dashboard Kit',
    slug: 'dashboard-kit',
    description: 'Complete dashboard UI components with charts and tables.',
    category_id: 'cat-8',
    creator_id: 'user-3',
    price: 79,
    is_free: false,
    is_featured: true,
    preview_url: 'https://picsum.photos/seed/comp4/400/300',
    code_html: '<div class="dashboard">...</div>',
    code_react: 'export const Dashboard = () => <div className="dashboard">...</div>',
    rating: 4.7,
    download_count: 650,
    view_count: 3100,
    tags: ['dashboard', 'charts', 'tables'],
    created_at: '2025-11-01',
    updated_at: '2025-12-05',
  },
  {
    id: 'comp-5',
    name: 'Form Builder Pack',
    slug: 'form-builder-pack',
    description: 'Beautiful form components with validation states.',
    category_id: 'cat-3',
    creator_id: 'user-2',
    price: 39,
    is_free: false,
    is_featured: false,
    preview_url: 'https://picsum.photos/seed/comp5/400/300',
    code_html: '<form class="form">...</form>',
    code_react: 'export const Form = () => <form className="form">...</form>',
    rating: 4.6,
    download_count: 780,
    view_count: 3800,
    tags: ['form', 'input', 'validation'],
    created_at: '2025-10-20',
    updated_at: '2025-11-15',
  },
  {
    id: 'comp-6',
    name: 'Navigation Mega Menu',
    slug: 'navigation-mega-menu',
    description: 'Responsive mega menu for complex navigation structures.',
    category_id: 'cat-4',
    creator_id: 'user-3',
    price: 35,
    is_free: false,
    is_featured: false,
    preview_url: 'https://picsum.photos/seed/comp6/400/300',
    code_html: '<nav class="mega-menu">...</nav>',
    code_react: 'export const MegaMenu = () => <nav className="mega-menu">...</nav>',
    rating: 4.4,
    download_count: 520,
    view_count: 2900,
    tags: ['navigation', 'menu', 'responsive'],
    created_at: '2025-09-15',
    updated_at: '2025-10-20',
  },
  {
    id: 'comp-7',
    name: 'Modal Dialog Pro',
    slug: 'modal-dialog-pro',
    description: 'Accessible modal dialogs with animations.',
    category_id: 'cat-6',
    creator_id: 'user-2',
    price: 25,
    is_free: false,
    is_featured: false,
    preview_url: 'https://picsum.photos/seed/comp7/400/300',
    code_html: '<dialog class="modal">...</dialog>',
    code_react: 'export const Modal = () => <dialog className="modal">...</dialog>',
    rating: 4.3,
    download_count: 420,
    view_count: 2100,
    tags: ['modal', 'dialog', 'animation'],
    created_at: '2025-08-10',
    updated_at: '2025-09-15',
  },
  {
    id: 'comp-8',
    name: 'Data Table Advanced',
    slug: 'data-table-advanced',
    description: 'Feature-rich data table with sorting and filtering.',
    category_id: 'cat-7',
    creator_id: 'user-3',
    price: 55,
    is_free: false,
    is_featured: false,
    preview_url: 'https://picsum.photos/seed/comp8/400/300',
    code_html: '<table class="data-table">...</table>',
    code_react: 'export const DataTable = () => <table className="data-table">...</table>',
    rating: 4.8,
    download_count: 380,
    view_count: 1900,
    tags: ['table', 'data', 'sorting'],
    created_at: '2025-07-20',
    updated_at: '2025-08-25',
  },
  {
    id: 'comp-9',
    name: 'Pricing Table',
    slug: 'pricing-table',
    description: 'Modern pricing table with toggle and features list.',
    category_id: 'cat-10',
    creator_id: 'user-2',
    price: 0,
    is_free: true,
    is_featured: false,
    preview_url: 'https://picsum.photos/seed/comp9/400/300',
    code_html: '<div class="pricing">...</div>',
    code_react: 'export const PricingTable = () => <div className="pricing">...</div>',
    rating: 4.5,
    download_count: 1800,
    view_count: 7200,
    tags: ['pricing', 'free', 'layout'],
    created_at: '2025-06-15',
    updated_at: '2025-07-20',
  },
  {
    id: 'comp-10',
    name: 'Footer Mega',
    slug: 'footer-mega',
    description: 'Comprehensive footer with multiple columns and newsletter.',
    category_id: 'cat-9',
    creator_id: 'user-3',
    price: 19,
    is_free: false,
    is_featured: false,
    preview_url: 'https://picsum.photos/seed/comp10/400/300',
    code_html: '<footer class="footer-mega">...</footer>',
    code_react: 'export const Footer = () => <footer className="footer-mega">...</footer>',
    rating: 4.2,
    download_count: 290,
    view_count: 1500,
    tags: ['footer', 'layout', 'newsletter'],
    created_at: '2025-05-10',
    updated_at: '2025-06-15',
  },
];

// Users/Profiles table
export const profilesTable = [
  {
    id: 'user-1',
    email: 'john@designkit.com',
    full_name: 'John Designer',
    username: 'johndesigner',
    avatar_url: 'https://i.pravatar.cc/200?u=john',
    role: 'user',
    created_at: '2025-01-15',
  },
  {
    id: 'user-2',
    email: 'sarah@designkit.com',
    full_name: 'Sarah Creator',
    username: 'sarahcreator',
    avatar_url: 'https://i.pravatar.cc/200?u=sarah',
    role: 'creator',
    bio: 'UI/UX Designer with 10+ years of experience',
    website: 'https://sarah.design',
    total_sales: 245,
    total_earnings: 12500,
    created_at: '2024-06-20',
  },
  {
    id: 'user-3',
    email: 'admin@designkit.com',
    full_name: 'Admin User',
    username: 'admin',
    avatar_url: 'https://i.pravatar.cc/200?u=admin',
    role: 'admin',
    created_at: '2024-01-01',
  },
];

// Purchases table
export const purchasesTable = [
  { id: 'purchase-1', user_id: 'user-1', component_id: 'comp-1', amount: 29, created_at: '2025-12-28' },
  { id: 'purchase-2', user_id: 'user-1', component_id: 'comp-2', amount: 49, created_at: '2025-12-20' },
  { id: 'purchase-3', user_id: 'user-1', component_id: 'comp-4', amount: 79, created_at: '2025-11-15' },
];

// Favorites table
export const favoritesTable = [
  { id: 'fav-1', user_id: 'user-1', component_id: 'comp-1', created_at: '2025-12-25' },
  { id: 'fav-2', user_id: 'user-1', component_id: 'comp-3', created_at: '2025-12-20' },
];

// Reviews table
export const reviewsTable = [
  {
    id: 'review-1',
    component_id: 'comp-1',
    user_id: 'user-1',
    rating: 5,
    comment: 'Amazing button pack! The gradients are beautiful.',
    helpful_count: 12,
    created_at: '2025-12-28',
  },
  {
    id: 'review-2',
    component_id: 'comp-1',
    user_id: 'user-3',
    rating: 4,
    comment: 'Great quality. Would love more color variants.',
    helpful_count: 8,
    created_at: '2025-12-25',
  },
  {
    id: 'review-3',
    component_id: 'comp-2',
    user_id: 'user-1',
    rating: 5,
    comment: 'Perfect for my SaaS landing page!',
    helpful_count: 15,
    created_at: '2025-12-20',
  },
];

// Collections/Bundles table
export const collectionsTable = [
  {
    id: 'collection-1',
    name: 'Landing Page Starter Kit',
    description: 'Everything you need to build a stunning landing page.',
    icon: '🚀',
    component_ids: ['comp-1', 'comp-2', 'comp-3', 'comp-5'],
    original_price: 116,
    discounted_price: 79,
    discount_percent: 32,
    is_featured: true,
    created_at: '2025-12-01',
  },
  {
    id: 'collection-2',
    name: 'Dashboard Essentials',
    description: 'Complete dashboard UI kit with charts and tables.',
    icon: '📊',
    component_ids: ['comp-4', 'comp-6', 'comp-8'],
    original_price: 87,
    discounted_price: 59,
    discount_percent: 32,
    is_featured: true,
    created_at: '2025-11-15',
  },
];

// Blog posts table
export const blogPostsTable = [
  {
    id: 'blog-1',
    title: 'Introducing Design Kit 2.0',
    slug: 'introducing-design-kit-2',
    excerpt: 'We\'re excited to announce the biggest update yet.',
    content: 'Full content here...',
    category: 'news',
    author_id: 'user-3',
    published_at: '2026-01-01',
    read_time: '5 min',
    is_featured: true,
  },
  {
    id: 'blog-2',
    title: 'How to Build a Landing Page in 10 Minutes',
    slug: 'build-landing-page-10-minutes',
    excerpt: 'Learn how to combine our components quickly.',
    content: 'Full content here...',
    category: 'tutorial',
    author_id: 'user-2',
    published_at: '2025-12-28',
    read_time: '8 min',
    is_featured: true,
  },
];

// Notifications table
export const notificationsTable = [
  { id: 'notif-1', user_id: 'user-1', type: 'purchase', message: 'Your purchase is complete!', is_read: false, created_at: '2025-12-30' },
  { id: 'notif-2', user_id: 'user-2', type: 'sale', message: 'You made a sale!', is_read: false, created_at: '2025-12-29' },
  { id: 'notif-3', user_id: 'user-1', type: 'update', message: 'Design Kit v2.0 is here!', is_read: true, created_at: '2025-12-28' },
];

// Export all tables as a single object for MockSupabaseClient
export const mockTables: Record<string, any[]> = {
  categories: categoriesTable,
  components: componentsTable,
  profiles: profilesTable,
  purchases: purchasesTable,
  favorites: favoritesTable,
  reviews: reviewsTable,
  collections: collectionsTable,
  blog_posts: blogPostsTable,
  notifications: notificationsTable,
};

// Helper: Get component with category
export function getComponentsWithCategory() {
  return componentsTable.map(comp => ({
    ...comp,
    category: categoriesTable.find(cat => cat.id === comp.category_id) || null,
  }));
}

// Helper: Get component by ID with category
export function getComponentById(id: string) {
  const comp = componentsTable.find(c => c.id === id);
  if (!comp) return null;
  return {
    ...comp,
    category: categoriesTable.find(cat => cat.id === comp.category_id) || null,
  };
}
