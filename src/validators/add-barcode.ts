import { z } from "zod";

export const barcodeFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    created_by: z.coerce.number(),
    business_id: z.coerce.number(),
});

// generate form types from zod validation schema
export type AddBarcodeInput = z.infer<typeof barcodeFormSchema>;
