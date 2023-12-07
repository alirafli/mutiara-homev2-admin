import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import MoneyInformationCard from "./components/MoneyInformationCard";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function Dashboard() {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect("/sign-in");
  }

  const logout = async () => {
    "use server";
    const supabse = await createSupabaseServerClient();
    await supabse.auth.signOut();
    redirect("/sign-in");
  };

  return (
    <div className="px-6">
      <div className="flex gap-6 flex-col md:flex-row items-center md:items-start">
        <MoneyInformationCard title="Total Penghasilan" income={100000000} />
        <MoneyInformationCard
          title="Tagihan Penyewa"
          description="this will be the month desc"
          income={100000000}
        />
      </div>

      <div>
        <form action={logout}>
          <Button>SignOut</Button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
