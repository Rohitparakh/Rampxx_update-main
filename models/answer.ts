import mongoose, { Schema, Document } from 'mongoose';

interface IAnswer extends Document {
  clientId: string;
  questionId: string;
  selectedAnswer: string;
}

const AnswerSchema: Schema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  selectedAnswer: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Answer = mongoose.models.Answer || mongoose.model<IAnswer>('Answer', AnswerSchema);

export default Answer;