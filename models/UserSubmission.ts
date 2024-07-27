// models/UserSubmission.ts
import mongoose from 'mongoose';

const UserSubmissionSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  questionsSubmitted: {
    type: Boolean,
    default: false,
  },
  submissionDate: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.UserSubmission || mongoose.model('UserSubmission', UserSubmissionSchema);