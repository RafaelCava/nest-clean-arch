import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { TransformImageToBase64 } from '../../data/protocols';

@Injectable()
export class MediaTransformImageToBase64 implements TransformImageToBase64 {
  async transform(url: string, hasher: string) {
    const hash = this.generateHash(hasher);
    const imgPath = `/tmp/${hash}.jpg`;
    const writer = fs.createWriteStream(imgPath);
    const responseStream = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });
    responseStream.data.pipe(writer);
    await new Promise((resolve) => {
      writer.on('finish', resolve);
    });
    const imgBase64 = this.readFileAsBase64(imgPath);
    fs.unlinkSync(imgPath);
    return {
      imgBase64,
      hash,
    };
  }

  private readFileAsBase64(filePath: string) {
    const imgBuffer = fs.readFileSync(filePath);
    return imgBuffer.toString('base64');
  }

  private generateHash(hasher: string) {
    const hash = crypto.createHash('md5').update(hasher).digest('hex');
    return `${hash}_${Date.now()}`;
  }
}
