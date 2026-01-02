// ComponentDetailPresenter - Business logic for Component Detail page
import type { DesignComponent } from '@/src/domain/entities';
import type { IComponentRepository } from '@/src/domain/interfaces';

export interface ComponentDetailViewModel {
  component: DesignComponent | null;
  relatedComponents: DesignComponent[];
}

export class ComponentDetailPresenter {
  constructor(
    private readonly componentRepository: IComponentRepository
  ) {}

  async getViewModel(componentId: string): Promise<ComponentDetailViewModel> {
    const component = await this.componentRepository.getById(componentId);
    
    let relatedComponents: DesignComponent[] = [];
    if (component) {
      // Get related components from same category
      const categoryComponents = await this.componentRepository.getByCategory(component.categoryId);
      relatedComponents = categoryComponents
        .filter(c => c.id !== componentId)
        .slice(0, 3);
    }

    return { component, relatedComponents };
  }

  generateMetadata(component: DesignComponent | null) {
    if (!component) {
      return {
        title: 'Component Not Found | Design Kit',
        description: 'The requested component could not be found.',
      };
    }
    
    return {
      title: `${component.name} | Design Kit`,
      description: component.description,
      openGraph: {
        title: component.name,
        description: component.description,
        images: [component.previewUrl],
      },
    };
  }
}
