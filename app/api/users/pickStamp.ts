// pages/api/users/pickStamp.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongoose';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { address, stampId } = req.body;

  if (!address || !stampId) {
    return res.status(400).json({ message: 'Address and stampId are required' });
  }

  try {
    await connectToDatabase();
    let user = await User.findOne({ address });

    if (!user) {
      user = await User.create({ address });
    }

    const now = new Date();
    const lastPickDate = user.lastStampPick ? new Date(user.lastStampPick) : new Date(0);

    if (now.toDateString() === lastPickDate.toDateString()) {
      return res.status(400).json({ message: 'You can only pick once per day' });
    }

    // Update the user's sticker collection
    const existingSticker = user?.stickers.find(s => s.id === stampId);
    if (existingSticker) {
      existingSticker.count += 1;
    } else {
      user?.stickers.push({ id: stampId, count: 1 });
    }

    user.lastStampPick = now;
    await user.save();

    return res.status(200).json({ 
      success: true, 
      stickers: user?.stickers,
      newSticker: { id: stampId, count: existingSticker ? existingSticker.count : 1 }
    });
  } catch (error) {
    console.error('Error in pickStamp:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
