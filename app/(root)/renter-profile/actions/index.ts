"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { User } from "@/types/user";
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
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

type AddUserResponse = {
  user: User | null;
  error: PostgrestError | null;
};

export async function getRenterData(): Promise<
  PostgrestSingleResponse<User[]>
> {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("user").select("*").eq("role", "renter");
}

export async function addUser(data: AddUserPayload): Promise<AddUserResponse> {
  const supabase = await createSupabaseServerClient();
  const { data: user, error } = await supabase
    .from("user")
    .insert(data)
    .select()
    .single();

  return { user, error };
}

export async function uploadUserKtp(userId: string, file: string) {
  const supabase = await createSupabaseServerClient();
  const buffer = Buffer.from(file.split(",")[1], "base64");

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${userId}/$${userId}_profile.png`, buffer);

  revalidatePath("/renter-profile");

  return { data, error };
}
