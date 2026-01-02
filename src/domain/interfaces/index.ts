// Repository Interfaces for Design-Kit Component Marketplace
// Following Clean Architecture - these define the contract for data access

import type {
    Category,
    DesignComponent,
    LicenseType,
    Order,
    Platform,
    PricingType,
    StyleSystem,
    User
} from '../entities';

// ============================================
// Pagination Types
// ============================================
export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ============================================
// Filter Types
// ============================================
export interface ComponentFilters {
  categoryId?: string;
  platform?: Platform;
  styleSystem?: StyleSystem;
  pricingType?: PricingType;
  licenseType?: LicenseType;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  creatorId?: string;
  tags?: string[];
  isFree?: boolean;
  isPublished?: boolean;
}

// ============================================
// User Repository Interface
// ============================================
export interface IUserRepository {
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  getCreators(): Promise<User[]>;
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<boolean>;
}

// ============================================
// Category Repository Interface
// ============================================
export interface ICategoryRepository {
  getById(id: string): Promise<Category | null>;
  getBySlug(slug: string): Promise<Category | null>;
  getAll(): Promise<Category[]>;
  create(category: Omit<Category, 'id' | 'componentCount' | 'createdAt' | 'updatedAt'>): Promise<Category>;
  update(id: string, data: Partial<Category>): Promise<Category>;
  delete(id: string): Promise<boolean>;
}

// ============================================
// Component Repository Interface
// ============================================
export interface IComponentRepository {
  getById(id: string): Promise<DesignComponent | null>;
  getAll(filters?: ComponentFilters): Promise<DesignComponent[]>;
  getPaginated(params: PaginationParams, filters?: ComponentFilters): Promise<PaginatedResult<DesignComponent>>;
  getFeatured(limit?: number): Promise<DesignComponent[]>;
  getByCreator(creatorId: string): Promise<DesignComponent[]>;
  getByCategory(categoryId: string): Promise<DesignComponent[]>;
  search(query: string, filters?: ComponentFilters): Promise<DesignComponent[]>;
  create(component: Omit<DesignComponent, 'id' | 'downloadCount' | 'rating' | 'ratingCount' | 'createdAt' | 'updatedAt'>): Promise<DesignComponent>;
  update(id: string, data: Partial<DesignComponent>): Promise<DesignComponent>;
  delete(id: string): Promise<boolean>;
  incrementDownload(id: string): Promise<void>;
  addRating(id: string, rating: number): Promise<void>;
}

// ============================================
// Order Repository Interface
// ============================================
export interface IOrderRepository {
  getById(id: string): Promise<Order | null>;
  getByUser(userId: string): Promise<Order[]>;
  create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order>;
  update(id: string, data: Partial<Order>): Promise<Order>;
  getUserPurchasedComponents(userId: string): Promise<string[]>; // Returns component IDs
}
