export interface User {
  id: string;
  created_at: Date;
  name: string;
  email: string;
  password: string;
  nik: string;
  phone_umber: string;
  payment_status: boolean;
  amount_remaining: number;
  role: string;
  is_active: boolean;
  rent_time: string;
}
