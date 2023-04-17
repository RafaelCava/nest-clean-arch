import { Inject, Injectable } from '@nestjs/common';
import { LoadUserById } from 'src/domain/usecases/load-user-by-id';
import { LoadUserDataByIdRepository } from '../protocols';

@Injectable()
export class DbLoadUserById implements LoadUserById {
  constructor(
    @Inject('LoadUserDataByIdRepository')
    private readonly loadUserDataByIdRepository: LoadUserDataByIdRepository,
  ) {}
  async loadById(id: string): Promise<LoadUserById.Result> {
    const userData = await this.loadUserDataByIdRepository.loadById(id);
    return userData;
  }
}
