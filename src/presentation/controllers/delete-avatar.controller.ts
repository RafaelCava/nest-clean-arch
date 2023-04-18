import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { DeleteAvatar } from 'src/domain/usecases/delete-avatar';

@Controller('user')
export class DeleteAvatarController {
  constructor(
    @Inject('DeleteAvatar')
    private readonly deleteAvatar: DeleteAvatar,
  ) {}
  @Delete(':id/avatar')
  async delete(@Param('id') id: string) {
    try {
      const { message, error } = await this.deleteAvatar.deleteAvatar(id);
      if (error) {
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      return { message };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
