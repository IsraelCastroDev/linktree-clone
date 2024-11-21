import mongoose, { Document, Schema } from "mongoose";

export type UserModelType = Document & {
  name: string;
  email: string;
  handle: string;
  password: string;
  description?: string;
};

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  handle: { type: String, required: true, trim: true, unique: true },
  description: { type: String, default: "", trim: true },
});

const User = mongoose.model<UserModelType>("User", UserSchema);
export default User;
