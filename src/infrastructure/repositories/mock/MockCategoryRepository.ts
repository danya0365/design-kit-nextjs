// Mock Category Repository
import { mockCategories } from '@/src/data/mock';
import type { Category } from '@/src/domain/entities';
import type { ICategoryRepository } from '@/src/domain/interfaces';

export class MockCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [...mockCategories];

  async getById(id: string): Promise<Category | null> {
    return this.categories.find(c => c.id === id) || null;
  }

  async getBySlug(slug: string): Promise<Category | null> {
    return this.categories.find(c => c.slug === slug) || null;
  }

  async getAll(): Promise<Category[]> {
    return [...this.categories];
  }

  async create(
    category: Omit<Category, 'id' | 'componentCount' | 'createdAt' | 'updatedAt'>
  ): Promise<Category> {
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`,
      componentCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.categories.push(newCategory);
    return newCategory;
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`);
    }
    
    this.categories[index] = {
      ...this.categories[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return this.categories[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) {
      return false;
    }
    
    this.categories.splice(index, 1);
    return true;
  }
}
