// app/api/questions/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Question from '@/models/question';

export async function GET() {
  await connectToDatabase();
  const questions = await Question.find();
  return NextResponse.json(questions);
}

export async function POST(request: Request) {
  const { question, options } = await request.json();
  await connectToDatabase();
  const newQuestion = new Question({ question, options });
  const savedQuestion = await newQuestion.save();
  return NextResponse.json(savedQuestion);
}


