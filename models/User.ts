// models/User.ts
import mongoose, { Document, Model } from 'mongoose';

interface ISticker {
  id: number;
  count: number;
}

interface IUser extends Document {
  address: string;
  stickers: ISticker[];
  lastStampPick: Date | null;
  totalStreaks: string
}
  
const StickerSchema = new mongoose.Schema<ISticker>({
  id: { type: Number },
  count: { type: Number, default: 1 }
});

const UserSchema = new mongoose.Schema<IUser>({
  address: {
    type: String,
    required: [true, 'Ethereum address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^0x[a-fA-F0-9]{40}$/, 'Please provide a valid Ethereum address']
  },
  stickers: [StickerSchema],
  lastStampPick: {
    type: Date,
    default: null
  }, 
  totalStreaks: {
    type: String,
    default: "0"
  }
},{
  timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;