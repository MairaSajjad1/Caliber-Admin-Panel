import { z } from "zod";

export const productFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    sku: z.string().optional(),
    type: z.string().min(1, { message: "Type is required." }),
    unit_id: z.string().min(1, { message: "Unit is required." }),
    tax_type: z.string().min(1, { message: "Tax Type is required." }),
    location_id: z.string().min(1, { message: "Location is required." }),
    manage_stock_status: z.boolean(),
    selling_price: z.string().optional(),
    selling_price_inc_tax: z.string().optional(),
    quantity: z.string().optional(),
    category_id: z.string().min(1, { message: "Category is required." }),
    sub_category_id: z.string().min(1, { message: "SubCategory is required." }),
    brand_id: z.string().min(1, { message: "Brand is required." }),
    barcode_id: z.string().min(1, { message: "Barcode is required." }),
    tax_id: z.string().min(1, { message: "Tax is required." }),
    weight: z.string().min(1, { message: "Weight is required." }),
    price_exclusive_tax: z.string().optional(),
    price_inclusive_tax: z.string().optional(),
    profit_margin: z.string().optional(),
    variation_id: z.string().optional(),
    variation_list: z.array(
      z.object({
        value: z.string().min(1, { message: "Value is required." }),
        price_exclusive_tax: z
          .string()
          .min(1, { message: "Price exclusive tax is required." }),
        price_inclusive_tax: z
          .string()
          .min(1, { message: "Price inclusive tax is required." }),
        profit_margin: z
          .string()
          .min(1, { message: "Profit Margin is required." }),
        selling_price: z
          .string()
          .min(1, { message: "Selling Price is required." }),
        selling_price_inc_tax: z
          .string()
          .min(1, { message: "Selling Price Inc Tax is required." })
          .optional(),
      })
    ),
    business_id: z.coerce.number(),
    product_images:
      typeof window === "undefined"
        ? z.any()
        : z.union([z.array(z.instanceof(File)), z.array(z.string())]),
});

// generate form types from zod validation schema
export type AddProductInput = z.infer<typeof productFormSchema>;
