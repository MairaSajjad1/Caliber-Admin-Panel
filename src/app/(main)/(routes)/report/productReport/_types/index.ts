interface Customer {
    id: number;
    email: string | null;
    email_verified_at: string | null;
    mobile_no: string;
    photo: string | null;
    user_type: string;
    role_id: number;
    business_id: number;
    created_by: number | null;
    last_updated_by: number | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    business_id: number;
    unit_id: number;
    category_id: number;
    sub_category_id: number | null;
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

interface OrderLine {
    id: number;
    order_id: number;
    business_id: number;
    product_id: number;
    product_variation_id: number;
    qty: number;
    unit_price_before_discount: string;
    unit_price_exc_tax: string;
    line_discount_type: string;
    line_discount_amount: number;
    discount_id: number | null;
    unit_price_inc_tax: string;
    item_tax: string;
    tax_id: number | null;
    created_at: string;
    updated_at: string;
    product: Product;
}

interface PaymentLine {
    id: number;
    order_id: number;
    purchase_id: number | null;
    business_id: number;
    method: string;
    amount: string;
    type: string;
    reference_number: string | null;
    payment_date: string;
    created_at: string;
    updated_at: string;
}

export interface OrderData {
    id: number;
    business_id: number;
    location_id: number;
    order_no: string;
    customer_id: number;
    order_status: string;
    payment_status: string;
    order_type: string;
    total_before_tax: number;
    final_total: number;
    tax_rate_id: number | null;
    tax_amount: number;
    rider_id: number | null;
    invoice_id: number | null;
    source: string;
    discount_type: string;
    discount: number;
    created_at: string;
    updated_at: string;
    type_of_service_id: number | null;
    order_created_time: string;
    order_delivered_time: string | null;
    delivery_charges_type: string | null;
    delivery_amount: string;
    delivery_charge_id: number | null;
    customer: Customer;
    order_lines: OrderLine[];
    payment_lines: PaymentLine[];
}

export interface OrderT {
    data: OrderData[];
}