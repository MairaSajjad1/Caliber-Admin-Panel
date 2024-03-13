import { Contact } from "lucide-react";
import { z } from "zod";

export const userFormSchema = z.object({
  //   addresses: z.array(
  //     z.object({
  id: z.number().optional(),
  city: z.string().min(1, { message: "City is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  state: z.string().min(1, { message: "State is required." }),
  address_line_1: z.string().min(1, { message: "Address line 1 is required." }),
  address_line_2: z.string().min(1, { message: "Address line 2 is required." }),
  zip_code: z
    .string()
    .min(1, { message: "Address line 2 is required." })
    .optional(),
    business_id:z.number().optional(),
    user_id:z.number().optional(),
  //     })
  //   ),
});

// generate form types from Zod validation schema
export type AddUserAddressInput = z.infer<typeof userFormSchema>;
