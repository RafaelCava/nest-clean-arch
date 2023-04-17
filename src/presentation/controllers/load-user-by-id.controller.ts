import { Controller, Get, Inject, Param, Response } from '@nestjs/common';
import { LoadUserById } from 'src/domain/usecases/load-user-by-id';

@Controller('user')
export class LoadUserByIdController {
  constructor(
    @Inject('LoadUserById')
    private readonly loadUserById: LoadUserById,
  ) {}

  @Get(':id')
  async loadById(@Param('id') id: string, @Response() res: any) {
    try {
      const user = await this.loadUserById.loadById(id);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
