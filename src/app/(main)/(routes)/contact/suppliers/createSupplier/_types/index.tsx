export type AddressT = {
    id: number;
    city: string;
    country: string;
    state: string;
    address_line_1: string;
    address_line_2: string;
    zip_code: string ;
    business_id: number;
    company_id: number | null;
    contact_id: number;
    created_by: number;
    last_updated_by: number | null;
    prospect_id: number | null;
    user_id: number;
    created_at: string;
    updated_at: string;
};
