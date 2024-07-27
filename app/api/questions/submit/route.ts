import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Question from '@/models/question';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  options: Option[];
}

export async function POST(request: Request) {
  const { questionId, selectedOption } = await request.json();
  await connectToDatabase();
  const question: Question | null = await Question.findById(questionId);

  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }

  const correctOption = question.options.find((option: Option) => option.isCorrect);

  if (!correctOption) {
    return NextResponse.json({ error: 'Correct option not found' }, { status: 404 });
  }

  const isCorrect = correctOption.text === selectedOption;
  return NextResponse.json({ correct: isCorrect });
}
