import { createSupabaseServerClient } from "@/lib/supabase/server";
import { User } from "@/types/user";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";

export async function getRenterData(): Promise<
  PostgrestSingleResponse<User[]>
> {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("user").select("*").eq("role", "renter");
}
