// ComponentsPresenterServerFactory - Server-side factory
import { MockCategoryRepository, MockComponentRepository } from '@/src/infrastructure/repositories/mock';
import { ComponentsPresenter } from './ComponentsPresenter';

export class ComponentsPresenterServerFactory {
  static create(): ComponentsPresenter {
    const componentRepository = new MockComponentRepository();
    const categoryRepository = new MockCategoryRepository();
    return new ComponentsPresenter(componentRepository, categoryRepository);
  }
}

export function createServerComponentsPresenter(): ComponentsPresenter {
  return ComponentsPresenterServerFactory.create();
}
