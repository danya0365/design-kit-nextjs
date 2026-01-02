// Mock dashboard data
import type { DesignComponent } from '@/src/domain/entities';
import { mockComponents } from './components';

export interface DashboardStats {
  totalComponents: number;
  totalDownloads: number;
  totalEarnings: number;
  monthlyEarnings: number;
  totalViews: number;
  conversionRate: number;
}

export interface EarningsData {
  month: string;
  earnings: number;
}

export const mockDashboardStats: DashboardStats = {
  totalComponents: 12,
  totalDownloads: 4523,
  totalEarnings: 8790,
  monthlyEarnings: 1250,
  totalViews: 15240,
  conversionRate: 3.2,
};

export const mockEarningsHistory: EarningsData[] = [
  { month: 'Jul', earnings: 890 },
  { month: 'Aug', earnings: 1120 },
  { month: 'Sep', earnings: 980 },
  { month: 'Oct', earnings: 1340 },
  { month: 'Nov', earnings: 1150 },
  { month: 'Dec', earnings: 1250 },
];

export const mockCreatorComponents: DesignComponent[] = mockComponents.filter(
  c => c.creatorId === 'user-2' // Sarah Designer
).concat(
  mockComponents.slice(0, 3).map(c => ({ ...c, creatorId: 'current-user' }))
);

export const mockRecentOrders = [
  { id: 'order-1', component: 'Hero Section Pro', buyer: 'john@example.com', amount: 29, date: '2025-12-30' },
  { id: 'order-2', component: 'Dashboard Kit', buyer: 'jane@example.com', amount: 49, date: '2025-12-29' },
  { id: 'order-3', component: 'Card Collection', buyer: 'bob@example.com', amount: 19, date: '2025-12-28' },
];
