import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadUserDataByIdService {
  constructor(private readonly httpService: HttpService) {}

  async loadById(id: string) {
    const { data } = await this.httpService.axiosRef.get(`/users/${id}`);
    return data;
  }
}
