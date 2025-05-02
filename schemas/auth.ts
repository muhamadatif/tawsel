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

export const signupSchema = z.object({
  phone: z
    .string({ required_error: "Phone is required" })
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid phone number"),
});

export const forgotPasswordSchema = z.object({
  emailOrPhone: z.union([
    z
      .string({ required_error: "please enter email or phone number" })
      .email("Invalid email or phone number"),
    z.string().regex(/^01[0125][0-9]{8}$/),
  ]),
});

export const newPasswordSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Must include at least one number"),
});
