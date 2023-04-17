import { Provider } from '@nestjs/common';
import { MediaTransformImageToBase64 } from './transform-image-to-base64';
import { RemoveMediaFileSystem } from './remove-media';

export const mediasProviders: Provider[] = [
  {
    provide: 'TransformImageToBase64',
    useClass: MediaTransformImageToBase64,
  },
  {
    provide: 'RemoveMedia',
    useClass: RemoveMediaFileSystem,
  },
];
