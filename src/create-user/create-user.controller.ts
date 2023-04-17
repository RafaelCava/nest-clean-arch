import { Body, Controller, Post, Response } from '@nestjs/common';
import { CreateUserService } from './create-user.service';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() body: any, @Response() res: any) {
    try {
      const user = await this.createUserService.create(body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
