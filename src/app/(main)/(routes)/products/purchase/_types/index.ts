export type PurchaseT = {
  id: number;
  business_id: number;
  location_id: number;
  supplier_id: number;
  type: string;
  purchase_status: string;
  payment_status: string;
  purchase_date: string;
  discount_type: string;
  discount_amount: number;
  source: string;
  tax_rate_id: number;
  tax_amount: number;
  created_by: number;

  purchase_lines: {
    product_id: number;
    product_variation_id: number;
    quantity: number;
    discount_amount:number;
  }[];

  payments: {
    method: string;
    amount: string;
  }[];

  coupon_code: string;

  purchase_no: string;
  total_before_tax: string;
  final_total: string;
  payment_note: any;
  created_at: string;
  updated_at: string;

};
