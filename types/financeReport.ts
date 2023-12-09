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
}
