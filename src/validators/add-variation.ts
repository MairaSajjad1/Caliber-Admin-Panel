import { z } from "zod";

export const variationFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    variation_templates: z.array(
      z.object({
        tem_name: z.string(),
      })
    ),
    business_id: z.coerce.number(),
    created_by: z.coerce.number(),
});

// generate form types from zod validation schema
export type AddVariationInput = z.infer<typeof variationFormSchema>;
