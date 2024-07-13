import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  tokens: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true, 
      unique: false 
    },    
    tokens: { 
      type: Number, 
      default: 10, 
      min: 0,
      max: 10 
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      required: false 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now, 
      required: false 
    },    
  }, {
    timestamps: true
  });

UserSchema.index({ username: 1, password: 1 });

const UserModel  = model<IUser>('User', UserSchema);

export { IUser, UserModel };