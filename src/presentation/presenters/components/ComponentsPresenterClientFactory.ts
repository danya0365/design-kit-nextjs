// ComponentsPresenterClientFactory - Client-side factory
'use client';

import { MockCategoryRepository, MockComponentRepository } from '@/src/infrastructure/repositories/mock';
import { ComponentsPresenter } from './ComponentsPresenter';

export class ComponentsPresenterClientFactory {
  static create(): ComponentsPresenter {
    const componentRepository = new MockComponentRepository();
    const categoryRepository = new MockCategoryRepository();
    return new ComponentsPresenter(componentRepository, categoryRepository);
  }
}

export function createClientComponentsPresenter(): ComponentsPresenter {
  return ComponentsPresenterClientFactory.create();
}
