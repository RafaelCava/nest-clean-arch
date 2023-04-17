import { Injectable } from '@nestjs/common';
import { LoadUserDataByIdService } from '../../infra/http/load-user-data-by-id.service';
import { LoadUserById } from 'src/domain/usecases/load-user-by-id';

@Injectable()
export class DbLoadUserById implements LoadUserById {
  constructor(
    private readonly loadUserDataByIdService: LoadUserDataByIdService,
  ) {}
  async loadById(id: string): Promise<LoadUserById.Result> {
    const userData = await this.loadUserDataByIdService.loadById(id);
    return userData;
  }
}
