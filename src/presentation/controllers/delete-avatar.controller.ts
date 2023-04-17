import { Controller, Delete, Param, Response } from '@nestjs/common';
import { DeleteAvatarService } from '../../data/usecases';

@Controller('user')
export class DeleteAvatarController {
  constructor(private readonly deleteAvatarService: DeleteAvatarService) {}
  @Delete(':id/avatar')
  async deleteAvatar(@Param('id') id: string, @Response() res: any) {
    try {
      const { message, error } = await this.deleteAvatarService.deleteAvatar(
        id,
      );
      if (error) {
        return res.status(400).json({ message });
      }
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
