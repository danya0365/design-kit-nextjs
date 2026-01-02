// ComponentsPresenter - Business logic for Components Browse page
import type { Category, DesignComponent } from '@/src/domain/entities';
import type { ComponentFilters, ICategoryRepository, IComponentRepository } from '@/src/domain/interfaces';

export interface ComponentsViewModel {
  components: DesignComponent[];
  categories: Category[];
  filters: ComponentFilters;
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
  };
  searchQuery: string;
}

export class ComponentsPresenter {
  constructor(
    private readonly componentRepository: IComponentRepository,
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async getViewModel(
    page: number = 1,
    perPage: number = 12,
    filters: ComponentFilters = {},
    searchQuery: string = ''
  ): Promise<ComponentsViewModel> {
    // Apply search to filters
    const appliedFilters: ComponentFilters = {
      ...filters,
      isPublished: true,
      search: searchQuery || undefined,
    };

    // Fetch data in parallel
    const [paginatedResult, categories] = await Promise.all([
      this.componentRepository.getPaginated({ page, perPage }, appliedFilters),
      this.categoryRepository.getAll(),
    ]);

    return {
      components: paginatedResult.data,
      categories,
      filters: appliedFilters,
      pagination: {
        page: paginatedResult.page,
        perPage: paginatedResult.perPage,
        totalPages: paginatedResult.totalPages,
        totalCount: paginatedResult.total,
      },
      searchQuery,
    };
  }

  generateMetadata(categorySlug?: string) {
    const categoryText = categorySlug 
      ? `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Components` 
      : 'All Components';
    
    return {
      title: `${categoryText} | Design Kit`,
      description: 'Browse and export beautiful UI components for HTML, React, and Next.js.',
    };
  }
}
