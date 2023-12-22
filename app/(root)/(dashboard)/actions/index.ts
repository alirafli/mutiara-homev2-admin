"use server";

import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ReportFinance } from "@/types/financeReport";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema } from "../components/AddReportForm/formSchema";

type ReportPayload = {
  id?: string;
  account: string;
  amount: number;
  created_at: Date;
  note: string;
  category: string;
  type: string;
  house_id: string;
  renter_id: string;
};

const ModifiedSchema = formSchema.omit({
  house_name: true,
  renter: true,
  amount: true,
});

export type UpdateReportPayloadProps = z.infer<typeof ModifiedSchema> & {
  amount: number;
  house_id: string;
  renter_id: string;
};

export async function getAllFinanceReport(): Promise<
  PostgrestSingleResponse<ReportFinance[]>
> {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("report_finance")
    .select(`*, renter_id(*), house_id(*)`);
}

export async function createReport(data: ReportPayload) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("report_finance").insert(data);
  revalidatePath("/");

  return JSON.stringify(result);
}

export async function deleteReportById(id?: string) {
  const supabase = await createSupabaseServerClient();
  try {
    const { data, error } = await supabase
      .from("report_finance")
      .delete()
      .eq("id", id);

    revalidatePath("/");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updateReportById(
  id?: string,
  payload?: UpdateReportPayloadProps
) {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("report_finance")
      .update(payload)
      .eq("id", id)
      .select();

    revalidatePath("/");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function incrementHouseAmount(amount: number, houseId: string) {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase.rpc("income_increment", {
      x: amount,
      row_id: houseId,
    });

    revalidatePath("/");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function decrementHouseAmount(amount: number, houseId: string) {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase.rpc("income_decrement", {
      x: amount,
      row_id: houseId,
    });

    revalidatePath("/");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
