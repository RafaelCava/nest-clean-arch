import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateUser } from '../../domain/usecases';

@Controller('users')
export class CreateUserController {
  constructor(
    @Inject('CreateUser')
    private readonly createUser: CreateUser,
  ) {}

  @Post()
  async create(@Body() body: CreateUser.Params) {
    try {
      const user = await this.createUser.create(body);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
