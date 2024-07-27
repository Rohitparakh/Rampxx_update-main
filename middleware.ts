// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { parse } from 'cookie';

async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    throw new Error('Invalid token');
  }
}

export async function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.token;

  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (token) {
      try {
        await verifyJWT(token);
        return NextResponse.next();
      } catch {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
