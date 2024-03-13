export interface VariationTemplate {
  id: number;
  tem_name: string;
  business_id: number;
  variation_id: number;
  created_at: string;
  updated_at: string;
}

export interface Variation {
  id: number;
  name: string;
  business_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  variation_template: VariationTemplate[];
}
export interface ProductImage {
  id: number;
  business_id: number;
  product_id: number;
  slug: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export interface ProductVariation {
  id: number;
  product_id: number;
  variation_id: number;
  business_id: number;
  variation_template_id: string;
  last_updated_by: any;
  created_at: string;
  updated_at: string;
  variations: Omit<Variation, "variation_template">;
  variation_template: VariationTemplate;
  product_price: ProductPrice;
}

export interface ProductPrice {
  id: number;
  product_variation_id: number;
  tax_type: string;
  price_exclusive_tax: string;
  price_inclusive_tax: string;
  profit_margin: string;
  selling_price: string;
  selling_price_inc_tax: string;
  business_id: number;
  tax_id: any;
  last_updated_by: any;
  created_at: string;
  updated_at: string;
}

export interface ProductStock {
  id: number;
  business_id: number;
  location_id: number;
  product_id: number;
  product_variation_id: number;
  last_updated_by: any;
  quantity_available: number;
  created_at: string;
  updated_at: string;
}

export interface ProductT {
  id: number;
  name: string;
  description: string;
  business_id: number;
  unit_id: number;
  location_id: number;
  category_id: number;
  sub_category_id: number;
  sku: string;
  type: string;
  vendor_id: any;
  brand_id: any;
  manage_stock_status: number;
  alerty_quantity: number;
  not_for_selling: number;
  tax_type: string;
  weight: any;
  barcode_id: any;
  tax_id: any;
  created_at: string;
  updated_at: string;
  product_time_id: any;
  product_images: ProductImage[];
  product_time: any[];
  product_variations: ProductVariation[];
  product_stock: ProductStock[];
}