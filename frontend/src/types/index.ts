import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  handle: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
});

export type RegisterForm = z.infer<typeof UserSchema>;
export type LoginForm = Pick<RegisterForm, "password" | "email">;

export type User = Pick<RegisterForm, "email" | "name" | "handle"> & {
  _id: string;
  description?: string;
};

export type ProfileForm = Pick<User, "description" | "handle">;
