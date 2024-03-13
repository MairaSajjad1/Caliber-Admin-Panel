import { z } from "zod";

export const subcategoryFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    parent_id: z.coerce.number(),
    created_by: z.coerce.number(),
    business_id: z.coerce.number(),
});

// generate form types from zod validation schema
export type AddSubCategoryInput = z.infer<typeof subcategoryFormSchema>;
