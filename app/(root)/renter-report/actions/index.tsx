"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Report } from "@/types/report";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { z } from "zod";
import { FormSchema } from "../components/UpdateReport/schema";

export async function getReportData(): Promise<
  PostgrestSingleResponse<Report[]>
> {
  noStore();
  const supabase = await createSupabaseServerClient();

  return await supabase.from("report_renter").select(`*, user_id(*)`);
}

export async function editReport(
  payload: z.infer<typeof FormSchema>,
  id: string
) {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("report_renter")
      .update(payload)
      .eq("id", id)
      .select();

    revalidatePath("/renter-report");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
