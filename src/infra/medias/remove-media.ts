import * as fs from 'fs';
import { RemoveMedia } from '../../data/protocols';

export class RemoveMediaFileSystem implements RemoveMedia {
  remove(mediaHash: string) {
    try {
      const imgPath = `/tmp/${mediaHash}.jpg`;
      fs.unlinkSync(imgPath);
    } catch (error) {
      return error.message;
    }
  }
}
