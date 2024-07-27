// models/question.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface IQuestion extends Document {
  question: string;
  options: Option[];
}

const OptionSchema: Schema = new Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const QuestionSchema: Schema = new Schema({
  question: { type: String, required: true },
  options: { type: [OptionSchema], required: true, validate: [arrayLimit, '{PATH} must have exactly 4 options'] },
}, { timestamps: true });

function arrayLimit(val: Option[]) {
  return val.length === 4;
}

// Check if the model already exists before creating a new one
const Question = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;