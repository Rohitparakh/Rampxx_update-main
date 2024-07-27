// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: Request) {
  try {
    
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.headers.append('Set-Cookie', serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), 
      path: '/',
    }));

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}