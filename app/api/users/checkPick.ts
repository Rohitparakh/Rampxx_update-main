import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongoose';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  try {
    await connectToDatabase();
    let user = await User.findOne({ address });

    if (!user) {
      user = await User.create({ address });
    }

    const now = new Date();
    const lastPickDate = user.lastStampPick ? new Date(user.lastStampPick) : new Date(0);
    const canPick = now.toDateString() !== lastPickDate.toDateString();

    return res.status(200).json({ canPick, stickers: user?.stickers });
  } catch (error) {
    console.error('Error in checkPick:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
