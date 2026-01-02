// Mock Blog/Changelog data
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'update' | 'tutorial' | 'news' | 'changelog';
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Introducing Design Kit 2.0',
    slug: 'introducing-design-kit-2',
    excerpt: 'We\'re excited to announce the biggest update yet - new export options, improved performance, and a fresh new look.',
    content: 'Full content here...',
    category: 'news',
    author: 'Alex Chen',
    authorAvatar: 'https://i.pravatar.cc/40?u=alex',
    publishedAt: '2026-01-01',
    readTime: '5 min',
    featured: true,
  },
  {
    id: 'blog-2',
    title: 'How to Build a Landing Page in 10 Minutes',
    slug: 'build-landing-page-10-minutes',
    excerpt: 'Learn how to combine our components to create a stunning landing page quickly.',
    content: 'Full content here...',
    category: 'tutorial',
    author: 'Sarah Designer',
    authorAvatar: 'https://i.pravatar.cc/40?u=sarah',
    publishedAt: '2025-12-28',
    readTime: '8 min',
    featured: true,
  },
  {
    id: 'blog-3',
    title: 'December 2025 Changelog',
    slug: 'december-2025-changelog',
    excerpt: 'New components, bug fixes, and performance improvements from this month.',
    content: 'Full content here...',
    category: 'changelog',
    author: 'Maya Patel',
    authorAvatar: 'https://i.pravatar.cc/40?u=maya',
    publishedAt: '2025-12-25',
    readTime: '3 min',
    featured: false,
  },
  {
    id: 'blog-4',
    title: 'Tips for Creating Accessible Components',
    slug: 'accessible-components-tips',
    excerpt: 'Best practices for ensuring your UI components work for everyone.',
    content: 'Full content here...',
    category: 'tutorial',
    author: 'Jordan Lee',
    authorAvatar: 'https://i.pravatar.cc/40?u=jordan',
    publishedAt: '2025-12-20',
    readTime: '6 min',
    featured: false,
  },
  {
    id: 'blog-5',
    title: 'Creator Spotlight: Top Earners of 2025',
    slug: 'creator-spotlight-2025',
    excerpt: 'Meet the creators who made the biggest impact this year.',
    content: 'Full content here...',
    category: 'news',
    author: 'Alex Chen',
    authorAvatar: 'https://i.pravatar.cc/40?u=alex',
    publishedAt: '2025-12-15',
    readTime: '4 min',
    featured: false,
  },
];

export const categoryIcons = {
  update: '🔄',
  tutorial: '📚',
  news: '📰',
  changelog: '📋',
};
