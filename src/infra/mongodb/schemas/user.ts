import { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default: '',
  },
});

export default UserSchema;
