import { connectToDatabase } from '../../../lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const { address, stickers, lastStampPick, totalStreaks } = await req.json();

    const user = await User.findOne({ address: address.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update stickers
    stickers.forEach(({ id, count }: { id: number, count: number }) => {
      const existingSticker = user?.stickers.find(sticker => sticker.id === id);
      if (existingSticker) {
        existingSticker.count += count;
      } else {
        user?.stickers.push({ id, count });
      }
    });

    // Update lastStampPick and totalStreaks
    if (lastStampPick) {
      user.lastStampPick = new Date(lastStampPick);
    }
    if (totalStreaks) {
      user.totalStreaks = totalStreaks;
    }

    await user.save();

    return NextResponse.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
