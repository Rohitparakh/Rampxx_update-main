import { connectToDatabase } from '../../../lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { address } = await req.json();

    const existingUser = await User.findOne({ address });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Create a new user
    const newUser = new User({ address, stickers: [], lastStampPick: null });
    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Failed to register user:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
