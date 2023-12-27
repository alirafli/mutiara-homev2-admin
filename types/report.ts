import { User } from "./user";

export interface Report {
  id: string;
  created_at: Date;
  title: string;
  type: string;
  status: string;
  note?: string;
  answer?: string;
  image_url?: string;
  user_id: User;
}
