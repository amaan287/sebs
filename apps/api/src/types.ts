import z from "zod";
export const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  admin: z.boolean().default(false),
});

export const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});
