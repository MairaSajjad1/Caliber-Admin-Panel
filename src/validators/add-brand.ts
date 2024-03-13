import { z } from "zod";

export const brandFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    business_id: z.coerce.number(),
});

// generate form types from zod validation schema
export type AddBrandInput = z.infer<typeof brandFormSchema>;
