// models/Client.ts

import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);
