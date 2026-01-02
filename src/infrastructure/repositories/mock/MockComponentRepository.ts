// Mock Component Repository
import { mockComponents } from '@/src/data/mock';
import type { DesignComponent } from '@/src/domain/entities';
import type {
    ComponentFilters,
    IComponentRepository,
    PaginatedResult,
    PaginationParams
} from '@/src/domain/interfaces';

export class MockComponentRepository implements IComponentRepository {
  private components: DesignComponent[] = [...mockComponents];

  async getById(id: string): Promise<DesignComponent | null> {
    return this.components.find(c => c.id === id) || null;
  }

  async getAll(filters?: ComponentFilters): Promise<DesignComponent[]> {
    let result = [...this.components];
    
    if (filters) {
      result = this.applyFilters(result, filters);
    }
    
    return result;
  }

  async getPaginated(
    params: PaginationParams, 
    filters?: ComponentFilters
  ): Promise<PaginatedResult<DesignComponent>> {
    let result = [...this.components];
    
    if (filters) {
      result = this.applyFilters(result, filters);
    }
    
    const total = result.length;
    const totalPages = Math.ceil(total / params.perPage);
    const start = (params.page - 1) * params.perPage;
    const data = result.slice(start, start + params.perPage);
    
    return {
      data,
      total,
      page: params.page,
      perPage: params.perPage,
      totalPages,
    };
  }

  async getFeatured(limit = 6): Promise<DesignComponent[]> {
    return [...this.components]
      .filter(c => c.isPublished)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  async getByCreator(creatorId: string): Promise<DesignComponent[]> {
    return this.components.filter(c => c.creatorId === creatorId);
  }

  async getByCategory(categoryId: string): Promise<DesignComponent[]> {
    return this.components.filter(c => c.categoryId === categoryId && c.isPublished);
  }

  async search(query: string, filters?: ComponentFilters): Promise<DesignComponent[]> {
    const searchLower = query.toLowerCase();
    let result = this.components.filter(c => 
      c.name.toLowerCase().includes(searchLower) ||
      c.description.toLowerCase().includes(searchLower) ||
      c.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
    
    if (filters) {
      result = this.applyFilters(result, filters);
    }
    
    return result;
  }

  async create(
    component: Omit<DesignComponent, 'id' | 'downloadCount' | 'rating' | 'ratingCount' | 'createdAt' | 'updatedAt'>
  ): Promise<DesignComponent> {
    const newComponent: DesignComponent = {
      ...component,
      id: `comp-${Date.now()}`,
      downloadCount: 0,
      rating: 0,
      ratingCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.components.push(newComponent);
    return newComponent;
  }

  async update(id: string, data: Partial<DesignComponent>): Promise<DesignComponent> {
    const index = this.components.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Component with id ${id} not found`);
    }
    
    this.components[index] = {
      ...this.components[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return this.components[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.components.findIndex(c => c.id === id);
    if (index === -1) {
      return false;
    }
    
    this.components.splice(index, 1);
    return true;
  }

  async incrementDownload(id: string): Promise<void> {
    const component = this.components.find(c => c.id === id);
    if (component) {
      component.downloadCount += 1;
    }
  }

  async addRating(id: string, rating: number): Promise<void> {
    const component = this.components.find(c => c.id === id);
    if (component) {
      const totalRating = component.rating * component.ratingCount + rating;
      component.ratingCount += 1;
      component.rating = totalRating / component.ratingCount;
    }
  }

  private applyFilters(components: DesignComponent[], filters: ComponentFilters): DesignComponent[] {
    let result = components;

    if (filters.isPublished !== undefined) {
      result = result.filter(c => c.isPublished === filters.isPublished);
    }

    if (filters.categoryId) {
      result = result.filter(c => c.categoryId === filters.categoryId);
    }

    if (filters.creatorId) {
      result = result.filter(c => c.creatorId === filters.creatorId);
    }

    if (filters.isFree !== undefined) {
      result = result.filter(c => c.isFree === filters.isFree);
    }

    if (filters.pricingType) {
      result = result.filter(c => c.pricingType === filters.pricingType);
    }

    if (filters.licenseType) {
      result = result.filter(c => c.licenseType === filters.licenseType);
    }

    if (filters.minPrice !== undefined) {
      result = result.filter(c => c.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter(c => c.price <= filters.maxPrice!);
    }

    if (filters.minRating !== undefined) {
      result = result.filter(c => c.rating >= filters.minRating!);
    }

    if (filters.platform) {
      result = result.filter(c => 
        c.exports.some(e => e.platform === filters.platform)
      );
    }

    if (filters.styleSystem) {
      result = result.filter(c => 
        c.exports.some(e => e.styleSystem === filters.styleSystem)
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(c => 
        filters.tags!.some(tag => c.tags.includes(tag))
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }
}
