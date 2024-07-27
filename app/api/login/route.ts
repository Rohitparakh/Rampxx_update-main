// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Admin from '@/models/admin';
import { SignJWT } from 'jose';
import { serialize } from 'cookie';

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const { username, password } = await request.json();
    
    
    const user = await Admin.findOne({ username }).select('+password');

    
    if (!user || !(await user.matchPassword(password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = await new SignJWT({ userId: user._id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = NextResponse.json({ message: 'Login successful' });
    response.headers.append('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/',
    }));

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
