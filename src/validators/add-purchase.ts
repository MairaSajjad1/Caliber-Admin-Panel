import { z } from "zod";

export const brandFormSchema = z.object({
    supplier_id: z.string().min(1, { message: "Supplier is required." }),
    location_id: z.string().min(1, { message: "Location is required." }),
    tax_rate_id: z.string().min(1, { message: "Tax rate is required." }),
    tax_amount: z.string().min(1, { message: "Tax amount is required." }),
    discount_type: z.string().min(1, { message: "Discount type is required." }),
    discount_amount: z
      .string()
      .min(1, { message: "Discount amount is required." }),
    type: z.string().min(1, { message: "Type is required." }),
    purchase_status: z
      .string()
      .min(1, { message: "Purchase Status is required." }),
    payment_status: z
      .string()
      .min(1, { message: "Purchase Status is required." }),
    source: z.string().min(1, { message: "Source is required." }),
    payments: z
      .array(
        z.object({
          method: z.string().min(1, { message: "Method is required." }),
        })
      )
      .nonempty(),
    purchase_date: z.date({
      required_error: "Purchase date is required.",
    }),
    purchase_lines: z.array(
      z.object({
        product_id: z.string().min(1, { message: "Product is required." }),
        product_variation_id: z
          .string()
          .min(1, { message: "Product is required." }),
        quantity: z.string().min(1, { message: "Quantity is required." }),
      })
    ),
    business_id: z.coerce.number(),
    created_by: z.coerce.number(),
});

// generate form types from zod validation schema
export type AddBrandInput = z.infer<typeof brandFormSchema>;
