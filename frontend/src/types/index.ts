import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  handle: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
});

export type RegisterForm = z.infer<typeof UserSchema>;
