import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongoose'; // Adjust import path if necessary

const getAnswers = async () => {
  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;
  return db.collection('answers').find({}).toArray();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const answers = await getAnswers();
      res.status(200).json(answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
      res.status(500).json({ error: 'Failed to fetch answers' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
