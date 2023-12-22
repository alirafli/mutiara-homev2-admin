"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { House } from "@/types/house";
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { z } from "zod";
import { FormSchema } from "../components/HouseForm/schema";

type addHouseResponse = {
  house: House | null;
  error: PostgrestError | null;
};

const ModifiedSchema = FormSchema.omit({
  has_previous: true,
  rent_status: true,
});

export type AddHousePayload =
  | z.infer<typeof ModifiedSchema> & {
      income: number;
      has_previous: boolean;
      rent_status: boolean;
    };

export async function getHouseData(
  hasRented = false,
  id: undefined | string = undefined
): Promise<PostgrestSingleResponse<House[]>> {
  noStore();
  const supabase = await createSupabaseServerClient();

  if (!hasRented) {
    return await supabase.from("house_rent").select(`*, user_id(*)`);
  }

  return await supabase
    .from("house_rent")
    .select(`*, user_id(*)`)
    .or(`${id ? `user_id.eq.${id},` : ""}rent_status.eq.${!hasRented}`);
}

export async function addHouse(
  data: AddHousePayload
): Promise<addHouseResponse> {
  const supabase = await createSupabaseServerClient();
  const { data: house, error } = await supabase
    .from("house_rent")
    .insert(data)
    .select()
    .single();

  revalidatePath("/rent-house");

  return { house, error };
}

export async function uploadHousePhotos(
  houseId: string,
  file: string,
  fileName: string
) {
  const supabase = await createSupabaseServerClient();
  const buffer = Buffer.from(file.split(",")[1], "base64");

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`house/${houseId}/$${fileName}_photo.png`, buffer);

  revalidatePath("/rent-house");

  return { data, error };
}

export async function updateHousePhotos(id?: string, payload?: string[]) {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("house_rent")
      .update({ photos: payload })
      .eq("id", id)
      .select();

    revalidatePath("/rent-house");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getHousePhotoById(id: string) {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase.storage
      .from("images")
      .list(`house/${id}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function deleteHouseById(id?: string) {
  const supabase = await createSupabaseServerClient();
  try {
    const { data, error } = await supabase
      .from("house_rent")
      .delete()
      .eq("id", id);

    revalidatePath("/rent-house");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function deletePhotos(photos: string[]) {
  const supabase = await createSupabaseServerClient();
  try {
    const { data, error } = await supabase.storage
      .from("images")
      .remove(photos);

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updateHouseById(id?: string, payload?: AddHousePayload) {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("house_rent")
      .update(payload)
      .eq("id", id)
      .select();

    revalidatePath("/rent-house");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
