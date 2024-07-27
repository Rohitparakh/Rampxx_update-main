// pages/api/getClientId.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongoose';
import Client from '@/models/Client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { address } = req.query;

    try {
      await connectToDatabase();

      const client = await Client.findOne({ walletAddress: address });

      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      res.status(200).json({ clientId: client.clientId });
    } catch (error) {
      console.error('Error fetching client ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
