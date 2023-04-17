import { Controller, Get, Param, Response } from '@nestjs/common';
import { LoadUserByIdService } from '../../data/usecases';

@Controller('user')
export class LoadUserByIdController {
  constructor(private readonly loadUserByIdService: LoadUserByIdService) {}

  @Get(':id')
  async loadUserById(@Param('id') id: string, @Response() res: any) {
    try {
      const user = await this.loadUserByIdService.loadById(id);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
