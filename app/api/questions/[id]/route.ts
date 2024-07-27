// app/api/questions/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Question from '@/models/question';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { question, options } = await request.json();
  await connectToDatabase();
  const updatedQuestion = await Question.findByIdAndUpdate(id, { question, options }, { new: true });
  return NextResponse.json(updatedQuestion);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await connectToDatabase();
  await Question.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Question deleted successfully' });
}
