import { House } from "./house";
import { User } from "./user";

export interface ReportFinance {
  id?: string;
  renter: string;
  account: string;
  house_name: string;
  amount: number;
  created_at: Date;
  note: string;
  category: string;
  type: string;
  house_id: House;
  renter_id: User;
}
