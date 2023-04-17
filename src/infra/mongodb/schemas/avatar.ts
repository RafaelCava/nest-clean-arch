import { Schema } from 'mongoose';
import { Avatar } from 'src/domain/models/avatar';

const AvatarSchema = new Schema<Avatar>({
  user: String,
  base64: String,
  hash: String,
});

export default AvatarSchema;
