import * as mongoose from 'mongoose';


export const TodoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: String, required: true }
});


export interface Todo {
  _id: string,
  description: string,
  date: string
}
