import { Injectable } from '@nestjs/common';
import { LoadUserDataByIdService } from '../../infra/http/load-user-data-by-id.service';

@Injectable()
export class LoadUserByIdService {
  constructor(
    private readonly loadUserDataByIdService: LoadUserDataByIdService,
  ) {}
  async loadById(id: string) {
    const userData = await this.loadUserDataByIdService.loadById(id);
    return userData;
  }
}
