import { z } from "zod";

export const signinSchema = z.object({
  emailOrPhone: z.union([
    z
      .string({ required_error: "please enter email or phone number" })
      .email("Invalid email or phone number"),
    z.string().regex(/^01[0125][0-9]{8}$/),
  ]),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Must include at least one number"),
});
