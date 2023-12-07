import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ReportFinance } from "@/types/financeReport";

export async function getAllFinanceReport(): Promise<
  PostgrestSingleResponse<ReportFinance[]>
> {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("report_finance").select("*");
}
