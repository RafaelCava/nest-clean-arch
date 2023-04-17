import { Controller, Delete, Inject, Param, Response } from '@nestjs/common';
import { DeleteAvatar } from 'src/domain/usecases/delete-avatar';

@Controller('user')
export class DeleteAvatarController {
  constructor(
    @Inject('DeleteAvatar')
    private readonly deleteAvatar: DeleteAvatar,
  ) {}
  @Delete(':id/avatar')
  async delete(@Param('id') id: string, @Response() res: any) {
    try {
      const { message, error } = await this.deleteAvatar.deleteAvatar(id);
      if (error) {
        return res.status(400).json({ message });
      }
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
