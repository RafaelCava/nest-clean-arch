import { Controller, Get, Param, Response } from '@nestjs/common';
import { LoadAvatarByUserIdService } from '../../data/usecases';

@Controller('user')
export class LoadAvatarByUserIdController {
  constructor(
    private readonly loadAvatarByUserIdService: LoadAvatarByUserIdService,
  ) {}
  @Get(':id/avatar')
  async loadAvatarByUserId(@Param('id') id: string, @Response() res: any) {
    try {
      const avatar = await this.loadAvatarByUserIdService.loadAvatarByUserId(
        id,
      );
      return res.status(200).json(avatar);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
