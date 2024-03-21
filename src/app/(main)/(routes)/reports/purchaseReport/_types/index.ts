export interface PurchaseData {
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
    tax_rate_id: number | null;
    tax_amount: string;
    discount_type: string | null;
    discount_amount: string;
    final_total: string;
    created_by: number;
    source: string;
    payment_note: string | null;
    created_at: string;
    updated_at: string;
    supplier: Supplier;
    purchase_line_item: PurchaseLineItem[];
    payment_lines: PaymentLine[];
}

export interface Supplier {
    id: number;
    email: string | null;
    email_verified_at: string | null;
    mobile_no: string;
    photo: string | null;
    user_type: string;
    role_id: number | null;
    business_id: number;
    created_by: number | null;
    last_updated_by: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface PurchaseLineItem {
    id: number;
    purchase_id: number;
    product_id: number;
    product_variation_id: number;
    product_price_id: number;
    quantity: number;
    pp_without_discount: string;
    discount_type: string | null;
    discount_amount: string;
    purchase_price: string;
    purchase_price_inc_tax: string;
    item_tax: string;
    tax_id: number | null;
    quantity_sold: number;
    user_id: number | null;
    created_at: string;
    updated_at: string;
    product: Product[];
}

export interface Product {
    id: number;
    name: string;
    description: string;
    business_id: number;
    unit_id: number;
    category_id: number;
    sub_category_id: number;
    sku: string;
    type: string;
    vendor_id: number | null;
    brand_id: number | null;
    manage_stock_status: number;
    alerty_quantity: number;
    not_for_selling: number;
    tax_type: string;
    weight: number | null;
    barcode_id: number | null;
    tax_id: number | null;
    created_at: string;
    updated_at: string;
    product_time_id: number | null;
}

export interface PaymentLine {
    id: number;
    order_id: number | null;
    purchase_id: number;
    business_id: number;
    method: string;
    amount: string;
    type: string;
    reference_number: string | null;
    payment_date: string;
    created_at: string;
    updated_at: string;
}