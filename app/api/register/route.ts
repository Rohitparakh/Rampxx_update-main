// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  UserSchema  from '@/models/admin';

export async function POST(request: Request) {
  await connectToDatabase();

  const { username, email, password } = await request.json();

  // Basic input validation
  if (!username || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 400 });
  }

  try {
    // Check if user already exists
    const existingUser = await UserSchema.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return NextResponse.json({ message: 'Username or email already exists' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new UserSchema({ username, email, password: password, role: 'user' });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return NextResponse.json({ token, message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: `Server error: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}