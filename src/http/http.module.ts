import { HttpModule as HttpModuleAxios } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LoadUserDataByIdService } from './load-user-data-by-id.service';

@Module({
  imports: [
    HttpModuleAxios.register({
      baseURL: 'https://reqres.in/api',
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [LoadUserDataByIdService],
  exports: [LoadUserDataByIdService],
})
export class HttpModule {}
