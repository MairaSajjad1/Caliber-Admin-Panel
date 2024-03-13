import { z } from "zod";

export const unitFormSchema = z.object({
  actual_name: z.string().min(1, { message: "Name is required." }),
  short_name: z.string().min(1, { message: "Short name is required." }),
  allow_decimal: z.coerce.number(),
    business_id: z.coerce.number(),
});

// generate form types from zod validation schema
export type AddUnitInput = z.infer<typeof unitFormSchema>;
