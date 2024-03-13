import { Contact } from "lucide-react";
import { z } from "zod";

export const supplierFormSchema = z.object({
  id: z.unknown().optional(),
  phoneNumber: z.string().min(1, { message: "Phone Number is required." }).optional(),
  contacts: z.object({
    f_name: z.string().min(1, { message: "First name is required." }),
    l_name: z.string().min(1, { message: "Last name is required." }),
    // dob: z.coerce.date({
    //   required_error: "Date of Birth is required",
    // }),
    dob: z.string().min(1, { message: "Date of Birth is required." }),
    gender: z.string().min(1, { message: "Gender is required." }),
  }),
  addresses: z.array(
    z.object({
      id:z.unknown().optional(),
      city: z.string().min(1, { message: "City is required." }),
      country: z.string().min(1, { message: "Country is required." }),
      state: z.string().min(1, { message: "State is required." }),
      address_line_1: z
        .string()
        .min(1, { message: "Address line 1 is required." }),
      address_line_2: z
        .string()
        .min(1, { message: "Address line 2 is required." }),
        zip_code:z
        .string()
        .min(1, { message: "Address line 2 is required." }),
    })
  ).optional(),
  password: z.string().min(1, { message: "Password is required." }),
  business_id: z.number(), 
});

// generate form types from zod validation schema
export type AddSupplierInput = z.infer<typeof supplierFormSchema>;
