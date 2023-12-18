"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { User } from "@/types/user";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { z } from "zod";
import { FormSchema } from "../components/AddRenterForm/schema";

const ModifiedSchema = FormSchema.omit({
  is_active: true,
  payment_status: true,
  ktp_image: true,
});

export type AddUserPayload = z.infer<typeof ModifiedSchema> & {
  is_active: boolean;
  payment_status: boolean;
  amount_remaining: number;
};

export async function getRenterData(): Promise<
  PostgrestSingleResponse<User[]>
> {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("user").select("*").eq("role", "renter");
}

export async function addUser(data: AddUserPayload) {
  const supabase = await createSupabaseServerClient();
  const { data: user, error } = await supabase
    .from("user")
    .insert(data)
    .select();

  return { user, error };
}

export async function uploadUserKtp(userId: string, file: File) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.storage.from("images").upload(userId, file);
  revalidatePath("/");

  return JSON.stringify(result);
}
