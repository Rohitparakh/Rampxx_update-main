import mongoose from 'mongoose';

let cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = (global as any).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined in the environment variables');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      dbName: 'RampXRegistration',
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URL, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
};

export default connectToDatabase;
