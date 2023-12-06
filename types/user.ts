export interface User {
  id: string;
  created_at: string;
  email: string;
  password: string;
  name: string;
  phone_number: string;
  payment_status: boolean;
  amount_remaining: number;
  role: string;
  is_active: boolean;
  nik: string;
}
