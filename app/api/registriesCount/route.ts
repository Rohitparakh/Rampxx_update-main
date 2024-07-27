// pages/api/registries/index.ts

import { connectToDatabase } from '../../../lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.countDocuments();
    
    const response = NextResponse.json(users);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
