import { z } from "zod";

export const locationFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
  landmark: z.string().min(1, { message: "Landmark is required." }),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  business_id: z.coerce.number(),
});

// generate form types from zod validation schema
export type AddLocationInput = z.infer<typeof locationFormSchema>;
