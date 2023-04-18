import { HttpException, HttpStatus } from '@nestjs/common';

export const throwException = (): never => {
  throw new HttpException('error', HttpStatus.BAD_REQUEST);
};
