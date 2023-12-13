"use server";

import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ReportFinance } from "@/types/financeReport";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

interface UpdateReportPayloadProps {
  amount: number;
  created_at: Date;
  house_name: string;
  renter: string;
  category: string;
  type: string;
  account: string;
  note: string;
}

export async function getAllFinanceReport(): Promise<
  PostgrestSingleResponse<ReportFinance[]>
> {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("report_finance").select("*");
}

export async function createReport(data: ReportFinance) {
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

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
