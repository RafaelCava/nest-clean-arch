import { CreateUserMongoRepository } from '../repositories/create-user-repository';
import { LoadAvatarByUserIdMongoRepository } from '../repositories/load-avatar-by-user-id-mongo-repository';
import { CreateAvatarMongoRepository } from '../repositories/create-avatar-repository';
import { DeleteAvatarByUserIdMongoRepository } from '../repositories/delete-avatar-by-user-id-repository';
import { Provider } from '@nestjs/common';

export const repositoriesProviders: Provider[] = [
  {
    provide: 'CreateUserRepository',
    useClass: CreateUserMongoRepository,
  },
  {
    provide: 'LoadAvatarByUserIdRepository',
    useClass: LoadAvatarByUserIdMongoRepository,
  },
  {
    provide: 'CreateAvatarRepository',
    useClass: CreateAvatarMongoRepository,
  },
  {
    provide: 'DeleteAvatarByUserIdRepository',
    useClass: DeleteAvatarByUserIdMongoRepository,
  },
];
