// Domain Entities for Design-Kit Component Marketplace

// ============================================
// User Entity
// ============================================
export type UserRole = 'user' | 'creator' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Category Entity
// ============================================
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  componentCount: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Component Entity
// ============================================
export type Platform = 'html' | 'react' | 'nextjs';
export type StyleSystem = 'css' | 'tailwind' | 'css-module';
export type LicenseType = 'personal' | 'commercial';
export type PricingType = 'free' | 'paid' | 'bundle';

export interface ComponentExport {
  id: string;
  componentId: string;
  platform: Platform;
  styleSystem: StyleSystem;
  codeTemplate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComponentVariant {
  id: string;
  name: string;
  props: Record<string, unknown>;
  previewUrl?: string;
}

export interface DesignComponent {
  id: string;
  creatorId: string;
  name: string;
  description: string;
  categoryId: string;
  category?: Category;
  tags: string[];
  previewUrl: string;
  previewImages: string[];
  price: number;
  isFree: boolean;
  pricingType: PricingType;
  licenseType: LicenseType;
  variants: ComponentVariant[];
  exports: ComponentExport[];
  downloadCount: number;
  rating: number;
  ratingCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Order Entity
// ============================================
export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';

export interface OrderItem {
  id: string;
  orderId: string;
  componentId: string;
  component?: DesignComponent;
  price: number;
  licenseType: LicenseType;
}

export interface Order {
  id: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Cart Entity (for client-side state)
// ============================================
export interface CartItem {
  componentId: string;
  component: DesignComponent;
  licenseType: LicenseType;
  price: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}

// ============================================
// Home Page View Models
// ============================================
export interface HomeStats {
  totalComponents: number;
  totalCreators: number;
  totalDownloads: number;
}

export interface FeaturedSection {
  title: string;
  description: string;
  components: DesignComponent[];
}
