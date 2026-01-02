// HomePresenterServerFactory - Server-side factory for HomePresenter
import { MockCategoryRepository, MockComponentRepository } from '@/src/infrastructure/repositories/mock';
import { HomePresenter } from './HomePresenter';

export class HomePresenterServerFactory {
  static create(): HomePresenter {
    // Using mock repositories for now
    // TODO: Replace with Supabase repositories in Phase 6
    const componentRepository = new MockComponentRepository();
    const categoryRepository = new MockCategoryRepository();
    
    return new HomePresenter(componentRepository, categoryRepository);
  }
}

export function createServerHomePresenter(): HomePresenter {
  return HomePresenterServerFactory.create();
}
