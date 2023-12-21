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

export type AddUserPayload =
  | (z.infer<typeof ModifiedSchema> & {
      is_active: boolean;
      payment_status: boolean;
      amount_remaining: number;
      image_url?: string;
    })
  | {
      image_url?: string;
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
  return await supabase.from("user").select(`*,house_name(*)`).eq("role", "renter");
}

export async function addUser(data: AddUserPayload): Promise<AddUserResponse> {
  const supabase = await createSupabaseServerClient();
  const { data: user, error } = await supabase
    .from("user")
    .insert(data)
    .select()
    .single();

  revalidatePath("/renter-profile");

  return { user, error };
}

export async function uploadUserKtp(
  userId: string,
  file: string,
  fileName: string
) {
  const supabase = await createSupabaseServerClient();
  const buffer = Buffer.from(file.split(",")[1], "base64");

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${userId}/$${fileName}_profile.png`, buffer);

  revalidatePath("/renter-profile");

  return { data, error };
}

export async function deleteRenterById(id?: string) {
  const supabase = await createSupabaseServerClient();
  try {
    const { data, error } = await supabase.from("user").delete().eq("id", id);

    revalidatePath("/renter-profile");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getUserKtpImage(userId: string) {
  const supabase = await createSupabaseServerClient();

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(`${userId}/${userId}_profile.png`);

  revalidatePath("/renter-profile");

  return { data };
}

export async function updateRenterById(id?: string, payload?: AddUserPayload) {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("user")
      .update(payload)
      .eq("id", id)
      .select();

    revalidatePath("/renter-profile");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updateUserKtp(
  userId: string,
  file: string,
  fileName: string
) {
  const supabase = await createSupabaseServerClient();

  await supabase.storage.from("images").remove([`${fileName}`]);

  const { data, error } = await uploadUserKtp(userId, file, fileName);

  revalidatePath("/renter-profile");

  return { data, error };
}

export async function deleteKtpImage(filePath?: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.storage
    .from("images")
    .remove([`${filePath}`]);

  revalidatePath("/renter-profile");

  return { data, error };
}
