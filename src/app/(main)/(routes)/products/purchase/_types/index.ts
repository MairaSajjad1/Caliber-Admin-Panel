export type PurchaseT = {
  id: number;
  business_id: number;
  location_id: number;
  supplier_id: number;
  purchase_no: string;
  type: string;
  purchase_status: string;
  payment_status: string;
  purchase_date: string;
  total_before_tax: string;
  tax_rate_id: any;
  tax_amount: string;
  discount_type: any;
  discount_amount: string;
  final_total: string;
  created_by: number;
  source: string;
  payment_note: any;
  created_at: string;
  updated_at: string;
}