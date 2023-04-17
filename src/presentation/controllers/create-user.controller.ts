import { Body, Controller, Inject, Post, Response } from '@nestjs/common';
import { CreateUser } from 'src/domain/usecases';

@Controller('users')
export class CreateUserController {
  constructor(
    @Inject('CreateUser')
    private readonly createUser: CreateUser,
  ) {}

  @Post()
  async create(@Body() body: any, @Response() res: any) {
    try {
      const user = await this.createUser.create(body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
