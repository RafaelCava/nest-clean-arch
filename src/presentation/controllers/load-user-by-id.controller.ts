import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { LoadUserById } from 'src/domain/usecases/load-user-by-id';

@Controller('user')
export class LoadUserByIdController {
  constructor(
    @Inject('LoadUserById')
    private readonly loadUserById: LoadUserById,
  ) {}

  @Get(':id')
  async loadById(@Param('id') id: string) {
    try {
      const user = await this.loadUserById.loadById(id);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
