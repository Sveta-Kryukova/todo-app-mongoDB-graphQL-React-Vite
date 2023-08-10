import mongoose, { Schema, Document } from 'mongoose';

export interface TodoDocument extends Document {
  text: string;
  completed: boolean;
}

const todoSchema = new Schema<TodoDocument>(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = mongoose.model<TodoDocument>('Todo', todoSchema);

export default Todo;
