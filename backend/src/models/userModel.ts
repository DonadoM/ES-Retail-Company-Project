// src/models/userModel.ts

import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  [x: string]: any;
  name: string;
  email: string;
  password: string;
  role: string; // Puede ser 'user' o 'admin'
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"], // Solo permite 'user' o 'admin'
    default: "user", // Rol por defecto
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
