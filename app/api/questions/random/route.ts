// app/api/questions/random/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Question from '@/models/question';

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectToDatabase();
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuestion = await Question.findOne().skip(random);
    return NextResponse.json(randomQuestion);
  } catch (error) {
    console.error('Error in GET /api/questions/random:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}