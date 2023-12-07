import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";
import MoneyInformationCard from "./components/MoneyInformationCard";
import { getAllFinanceReport } from "./actions";
import { ReportTable } from "./components/ReportTable";
import HouseIncomePie from "./components/HouseIncomeChart";
import IncomeChart from "./components/IncomeChart";

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

  if (!data.session) {
    return redirect("/sign-in");
  }

  return (
    <div className="px-6">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl mb-8">
        Dashboard
      </h1>
      <div className="flex gap-6 flex-col md:flex-row items-center md:items-start">
        <MoneyInformationCard
          title="Total Penghasilan"
          income={totalIncome() ?? 0}
        />
        {/* TODO: will update this card later */}
        <MoneyInformationCard
          title="Tagihan Penyewa"
          description="this will be the desc"
          income={100000000}
        />
      </div>
      <div className="flex mt-6 flex-col md:flex-row">
        <ReportTable />
        <HouseIncomePie />
      </div>
      <IncomeChart />
    </div>
  );
}

export default Dashboard;
