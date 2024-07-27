// pages/api/users/checkQuestionsSubmitted.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongoose';
import UserSubmission from '../../../models/UserSubmission';

const HOURS_24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

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

    const userSubmission = await UserSubmission.findOne({ address });

    if (userSubmission && userSubmission.questionsSubmitted) {
      const currentTime = new Date().getTime();
      const submissionTime = userSubmission.submissionDate.getTime();
      
      if (currentTime - submissionTime < HOURS_24) {
        return res.status(200).json({ questionsSubmitted: true });
      } else {
        // Reset the submission status after 24 hours
        await UserSubmission.updateOne(
          { address },
          { $set: { questionsSubmitted: false, submissionDate: null } }
        );
        return res.status(200).json({ questionsSubmitted: false });
      }
    } else {
      return res.status(200).json({ questionsSubmitted: false });
    }
  } catch (error) {
    console.error('Error checking questions submitted:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}