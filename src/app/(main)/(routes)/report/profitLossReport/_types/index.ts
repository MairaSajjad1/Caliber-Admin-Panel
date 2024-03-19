interface OrderLineItem {
    business_id: number;
    unit_price_before_discount: string;
    unit_price_exc_tax: string;
    line_discount_amount: string;
    unit_price_inc_tax: string;
    total_sell: string;
}

interface PurchaseLineItem {
    business_id: number;
    pp_without_discount: string;
    discount_amount: string;
    purchase_price: string;
    purchase_price_inc_tax: string;
    item_tax: string;
    total_purchase: string;
}

export interface OrderT {
    order_line: OrderLineItem[];
    purchase_line: PurchaseLineItem[];
    total_purchase: string;
    total_sell: string;
    Loss: number;
    Profit: number;
}