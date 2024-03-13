export type UserT = {
  id: number;
  email: string | null;
  email_verified_at: string | null;
  mobile_no: string;
  user_type: string;
  role_id: number;
  business_id: number;
  created_by: number | null;
  last_updated_by: number | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  contact: {
    id: number;
    f_name: string;
    l_name: string;
    dob: string;
    gender: string;
    mobile_no: string;
    business_id: number;
    user_id: number;
    created_by: number;
    last_updated_by: number | null;
    created_at: string;
    updated_at: string;
  };
  addresses?: {
    id: number;
    city: string;
    country: string;
    state: string;
    address_line_1: string;
    address_line_2: string;
    zip_code: string;
    business_id: number;
    company_id: number | null;
    contact_id: number;
    created_by: number;
    last_updated_by: number | null;
    prospect_id: number | null;
    user_id: number;
    created_at: string;
    updated_at: string;
  }[];
};

