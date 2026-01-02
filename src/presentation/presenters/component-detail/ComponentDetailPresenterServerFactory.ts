// ComponentDetailPresenterServerFactory
import { MockComponentRepository } from '@/src/infrastructure/repositories/mock';
import { ComponentDetailPresenter } from './ComponentDetailPresenter';

export function createServerComponentDetailPresenter(): ComponentDetailPresenter {
  return new ComponentDetailPresenter(new MockComponentRepository());
}
