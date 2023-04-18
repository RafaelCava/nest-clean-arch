import { HttpException, HttpStatus } from '@nestjs/common';

export const throwException = (): HttpException => {
  return new HttpException('error', HttpStatus.BAD_REQUEST);
};
