import { mockExternalUser } from '../../domain/mocks';
import { LoadUserById } from '../../../src/domain/usecases';

export class LoadUserByIdSpy implements LoadUserById {
  userId?: string;
  async loadById(userId: string): Promise<LoadUserById.Result> {
    this.userId = userId;
    return mockExternalUser();
  }
}
