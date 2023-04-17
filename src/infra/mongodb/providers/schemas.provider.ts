import { Connection } from 'mongoose';
import UserSchema from '../schemas/user';
import AvatarSchema from '../schemas/avatar';

export const schemasProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'AVATAR_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Avatar', AvatarSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
