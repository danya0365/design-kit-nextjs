// Mock Reviews data
export interface Review {
  id: string;
  componentId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: string;
}

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    componentId: 'comp-1',
    userId: 'user-1',
    userName: 'John Designer',
    userAvatar: 'https://i.pravatar.cc/40?u=john',
    rating: 5,
    comment: 'Amazing button pack! The gradients are beautiful and the animations are smooth. Saved me hours of work.',
    helpful: 12,
    createdAt: '2025-12-28',
  },
  {
    id: 'review-2',
    componentId: 'comp-1',
    userId: 'user-3',
    userName: 'Admin User',
    userAvatar: 'https://i.pravatar.cc/40?u=admin',
    rating: 4,
    comment: 'Great quality components. Would love to see more color variants in the future.',
    helpful: 8,
    createdAt: '2025-12-25',
  },
  {
    id: 'review-3',
    componentId: 'comp-2',
    userId: 'user-2',
    userName: 'Sarah Designer',
    userAvatar: 'https://i.pravatar.cc/40?u=sarah',
    rating: 5,
    comment: 'Perfect for my SaaS landing page. The responsive behavior is flawless.',
    helpful: 15,
    createdAt: '2025-12-20',
  },
  {
    id: 'review-4',
    componentId: 'comp-3',
    userId: 'user-1',
    userName: 'John Designer',
    userAvatar: 'https://i.pravatar.cc/40?u=john',
    rating: 5,
    comment: 'Clean and modern design. Easy to customize. Highly recommended!',
    helpful: 6,
    createdAt: '2025-12-18',
  },
];

export const getReviewsForComponent = (componentId: string): Review[] => {
  return mockReviews.filter(r => r.componentId === componentId);
};
