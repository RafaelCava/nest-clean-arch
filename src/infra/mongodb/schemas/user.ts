import { Schema } from 'mongoose';
import { User } from 'src/domain/models/user';

const UserSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default: '',
  },
});

export default UserSchema;
