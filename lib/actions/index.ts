"use server";

import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "../supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import { User } from "@/types/user";

export async function readUserSession() {
  noStore();
  const supabsae = await createSupabaseServerClient();
  return await supabsae.auth.getSession();
}

export async function getUserById(): Promise<PostgrestSingleResponse<User[]>> {
  const { data } = await readUserSession();

  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("user")
    .select("*")
    .eq("id", data.session?.user.id);
}
