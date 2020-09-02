import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  password: { type: Number, required: true }
});
