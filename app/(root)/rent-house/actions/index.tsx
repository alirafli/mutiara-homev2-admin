"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { House } from "@/types/house";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";

export async function getHouseData(): Promise<
  PostgrestSingleResponse<House[]>
> {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("house_rent").select(`*, user_id(name)`);
}
