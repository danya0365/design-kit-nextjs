// HomePresenterClientFactory - Client-side factory for HomePresenter
'use client';

import { MockCategoryRepository, MockComponentRepository } from '@/src/infrastructure/repositories/mock';
import { HomePresenter } from './HomePresenter';

export class HomePresenterClientFactory {
  static create(): HomePresenter {
    // Using mock repositories for now
    // TODO: Replace with Supabase repositories in Phase 6
    const componentRepository = new MockComponentRepository();
    const categoryRepository = new MockCategoryRepository();
    
    return new HomePresenter(componentRepository, categoryRepository);
  }
}

export function createClientHomePresenter(): HomePresenter {
  return HomePresenterClientFactory.create();
}
