import { z } from "zod";

export const taxFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  amount: z.optional(z.coerce.number()),
  business_id: z.coerce.number(),
  created_by: z.coerce.number(),
});

// generate form types from zod validation schema
export type AddTaxInput = z.infer<typeof taxFormSchema>;
