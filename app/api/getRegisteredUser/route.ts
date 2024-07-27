// pages/api/registries/index.ts

import { connectToDatabase } from '../../../lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');

    if (address) {
      
      const user = await User.findOne({ address: address.toLowerCase() });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user);
    } else {
      // Fetch all users
      const users = await User.find();
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}