import { Controller, Get, Inject, Param, Response } from '@nestjs/common';
import { LoadAvatarByUserId } from '../../domain/usecases/load-avatar-by-user-id';

@Controller('user')
export class LoadAvatarByUserIdController {
  constructor(
    @Inject('LoadAvatarByUserId')
    private readonly loadAvatarByUserId: LoadAvatarByUserId,
  ) {}
  @Get(':id/avatar')
  async load(@Param('id') id: string, @Response() res: any) {
    try {
      const avatar = await this.loadAvatarByUserId.loadAvatarByUserId(id);
      return res.status(200).json(avatar);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
