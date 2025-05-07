import { z } from "zod";

export const addressSchema = z.object({
  building: z
    .string({ required_error: "Building No./Name is required" })
    .min(1, "Building No./Name must be at least 1 character"),
  flat: z
    .string({ required_error: "Flat No./Name is required" })
    .min(1, "Flat No./Name must be at least 1 character"),
  reach: z.optional(z.string()),
});
