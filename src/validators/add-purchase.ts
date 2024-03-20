import { z } from "zod";

export const purchaseFormSchema = z.object({
  id: z.coerce.number().optional(),
  supplier_id: z.coerce.number().min(1, { message: "Supplier is required." }),
  location_id: z.coerce.number().min(1, { message: "Location is required." }),
  tax_rate_id: z.coerce.number().min(1, { message: "Tax rate is required." }),
  tax_amount: z.coerce.number().min(1, { message: "Tax amount is required." }),
  discount_type: z.string().min(1, { message: "Discount type is required." }),
  discount_amount: z.coerce
    .number()
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
        amount: z.string().optional(),
      })
    )
    .nonempty(),
  purchase_date: z.string({
    required_error: "Purchase date is required.",
  }),
  purchase_lines: z.array(
    z.object({
      product_id: z.coerce.number().min(1, { message: "Product is required." }),
      product_variation_id: z.coerce
        .number()
        .min(1, { message: "Variation is required." }),
      quantity: z.coerce.number().min(1, { message: "Quantity is required." }),
      discount_amount:z.coerce.number().optional(),
    })
  ),

  total_before_tax: z.string().optional(),
  purchase_no: z.string().optional(),
  final_total: z.string().optional(),
  payment_note: z.string().optional(),
  business_id: z.coerce.number(),
  created_by: z.coerce.number().optional(),
});

// generate form types from zod validation schema
export type AddPurchaseInput = z.infer<typeof purchaseFormSchema>;
