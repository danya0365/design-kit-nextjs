// HomePresenter - Business logic for Home page
import type { Category, DesignComponent, FeaturedSection, HomeStats } from '@/src/domain/entities';
import type { ICategoryRepository, IComponentRepository } from '@/src/domain/interfaces';

export interface HomeViewModel {
  stats: HomeStats;
  featuredComponents: DesignComponent[];
  freeComponents: DesignComponent[];
  categories: Category[];
  featuredSections: FeaturedSection[];
}

export class HomePresenter {
  constructor(
    private readonly componentRepository: IComponentRepository,
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async getViewModel(): Promise<HomeViewModel> {
    // Fetch data in parallel for better performance
    const [featuredComponents, allComponents, categories] = await Promise.all([
      this.componentRepository.getFeatured(6),
      this.componentRepository.getAll({ isPublished: true }),
      this.categoryRepository.getAll(),
    ]);

    // Calculate stats
    const stats: HomeStats = {
      totalComponents: allComponents.length,
      totalCreators: new Set(allComponents.map(c => c.creatorId)).size,
      totalDownloads: allComponents.reduce((sum, c) => sum + c.downloadCount, 0),
    };

    // Get free components
    const freeComponents = allComponents.filter(c => c.isFree).slice(0, 4);

    // Create featured sections
    const featuredSections: FeaturedSection[] = [
      {
        title: 'Top Rated Components',
        description: 'The highest rated components from our creators',
        components: featuredComponents,
      },
    ];

    return {
      stats,
      featuredComponents,
      freeComponents,
      categories,
      featuredSections,
    };
  }

  generateMetadata() {
    return {
      title: 'Design Kit - Component Marketplace',
      description: 'Discover and export beautiful UI components for HTML, React, and Next.js. Design once, export anywhere.',
      openGraph: {
        title: 'Design Kit - Component Marketplace',
        description: 'Discover and export beautiful UI components for HTML, React, and Next.js.',
        type: 'website',
      },
    };
  }
}
