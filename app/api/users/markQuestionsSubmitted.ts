// pages/api/users/markQuestionsSubmitted.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongoose';
import UserSubmission from '../../../models/UserSubmission';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ message: 'Address is required' });
    }

    await UserSubmission.updateOne(
      { address },
      { 
        $set: { 
          questionsSubmitted: true, 
          submissionDate: new Date() 
        } 
      },
      { upsert: true }
    );

    return res.status(200).json({ message: 'Questions marked as submitted successfully' });
  } catch (error) {
    console.error('Error marking questions as submitted:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}