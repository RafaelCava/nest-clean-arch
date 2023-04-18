import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { LoadAvatarByUserId } from '../../domain/usecases/load-avatar-by-user-id';

@Controller('user')
export class LoadAvatarByUserIdController {
  constructor(
    @Inject('LoadAvatarByUserId')
    private readonly loadAvatarByUserId: LoadAvatarByUserId,
  ) {}
  @Get(':id/avatar')
  async load(@Param('id') id: string) {
    try {
      const avatar = await this.loadAvatarByUserId.load(id);
      return avatar;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
