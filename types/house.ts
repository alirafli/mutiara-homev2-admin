import { User } from "./user";

export interface House {
  name: string;
  address: string;
  map_link: string;
  room: number;
  has_previous: boolean;
  bathroom: number;
  price_per_month: number;
  income: number;
  rent_status: boolean;
  id: string;
  user_id: User;
}
