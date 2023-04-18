import { TransformImageToBase64 } from '../../../src/data/protocols';

export const mockTransformImageToBase64Result =
  (): TransformImageToBase64.Result => ({
    hash: 'any_hash',
    imgBase64: 'any_base64',
  });
