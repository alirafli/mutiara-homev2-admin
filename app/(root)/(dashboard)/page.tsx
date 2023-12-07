import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import MoneyInformationCard from "./components/MoneyInformationCard";
import { getAllFinanceReport } from "./actions";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function Dashboard() {
  const { data } = await readUserSession();

  const { data: report } = await getAllFinanceReport();

  const totalIncome = () => {
    const incomes = report?.map((e) => e.amount);
    return incomes?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  };

  const logout = async () => {
    "use server";
    const supabse = await createSupabaseServerClient();
    await supabse.auth.signOut();
    redirect("/sign-in");
  };

  if (!data.session) {
    return redirect("/sign-in");
  }

  return (
    <div className="px-6">
      <div className="flex gap-6 flex-col md:flex-row items-center md:items-start">
        <MoneyInformationCard
          title="Total Penghasilan"
          income={totalIncome() ?? 0}
        />
        {/* TODO: will update this card later */}
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
