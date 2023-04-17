import { LoadUserDataByIdRepository } from '../../data/protocols/load-user-by-id-repository';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadUserDataByIdHttp implements LoadUserDataByIdRepository {
  constructor(private readonly httpService: HttpService) {}

  async loadById(id: string): Promise<LoadUserDataByIdRepository.Result> {
    const { data } =
      await this.httpService.axiosRef.get<LoadUserDataByIdRepository.Result>(
        `/users/${id}`,
      );
    return data;
  }
}
