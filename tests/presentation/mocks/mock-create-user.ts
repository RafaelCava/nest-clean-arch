import { mockCreateUserResult } from '../../domain/mocks';
import { CreateUser } from '../../../src/domain/usecases';

export class CreateUserSpy implements CreateUser {
  body?: any;
  async create(body: any) {
    this.body = body;
    return mockCreateUserResult();
  }
}
