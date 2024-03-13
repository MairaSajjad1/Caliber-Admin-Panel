
export interface VariationT {
  id: number;
  name: string;
  business_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  variation_template: VariationTemplate[];
}

export interface VariationTemplate {
  id: number;
  tem_name: string;
  business_id: number;
  variation_id: number;
  created_at: string;
  updated_at: string;
}
