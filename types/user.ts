import { House } from "./house";

export interface User {
  id: string;
  created_at: Date;
  name: string;
  email: string;
  password: string;
  nik: string;
  phone_number: string;
  payment_status: boolean;
  amount_remaining: number;
  role: string;
  is_active: boolean;
  rent_time: string;
  image_url?: string;
  house_name: House;
}
