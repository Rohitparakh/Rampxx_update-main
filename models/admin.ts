import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  matchPassword(password: string): Promise<boolean>;
}

const AdminSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  }
});

// Hash password before saving the user
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to match password
AdminSchema.methods.matchPassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const Admin: Model<IUser> = mongoose.models.Admin || mongoose.model<IUser>('Admin', AdminSchema);

export default Admin;
