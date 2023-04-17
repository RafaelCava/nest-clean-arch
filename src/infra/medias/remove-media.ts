import * as fs from 'fs';

export class RemoveMedia {
  remove(mediaHash: string) {
    try {
      const imgPath = `/tmp/${mediaHash}.jpg`;
      fs.unlinkSync(imgPath);
    } catch (error) {
      return error.message;
    }
  }
}
