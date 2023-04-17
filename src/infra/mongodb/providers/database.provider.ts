import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://root:root@host.docker.internal:27017/payever-assessment?authSource=admin',
      ),
  },
];
