import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Answer from '@/models/answer';

interface AnswerData {
  questionId: string;
  selectedAnswer: string;
}

interface SubmitRequest {
  userId: string;
  answers: AnswerData[];
}

export async function POST(request: Request) {
  try {
    const body: SubmitRequest = await request.json();
    console.log('Received request body:', body);

    await connectToDatabase();
    console.log('Connected to database');

    const { userId, answers } = body;

    if (!userId || !Array.isArray(answers) || answers.length === 0) {
      console.log('Invalid input:', { userId, answers });
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    // Save each answer to the database
    const savedAnswers = await Promise.all(
      answers.map(answer =>
        Answer.create({
          clientId: userId,
          questionId: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
        })
      )
    );
    console.log('Saved answers:', savedAnswers);

    return NextResponse.json({ message: 'Answers submitted successfully' });
  } catch (error) {
    console.error('Error processing answers:', error);
    return NextResponse.json({ message: 'Internal server error', }, { status: 500 });
  }
}