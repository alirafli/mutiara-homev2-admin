import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";
import MoneyInformationCard from "./components/MoneyInformationCard";
import { getAllFinanceReport } from "./actions";
import { ReportTable } from "./components/ReportTable";
import HouseIncomePie from "./components/HouseIncomeChart";
import IncomeChart from "./components/IncomeChart";
import { getRenterData } from "../renter-profile/actions";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function Dashboard() {
  const { data } = await readUserSession();

  const { data: report } = await getAllFinanceReport();
  const { data: userProfile } = await getRenterData();

  const userAmountRemaining = userProfile
    ?.map((item) => item.amount_remaining)
    .reduce((accumulator, current) => accumulator + current, 0);

  const totalIncome = () => {
    const expense =
      report
        ?.filter((e) => e.category === "Pengeluaran")
        .map((e) => e.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) ??
      0;
    const incomes =
      report
        ?.filter((e) => e.category === "Pemasukan")
        .map((e) => e.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) ??
      0;
    return incomes - expense;
  };

  if (!data.session) {
    return redirect("/sign-in");
  }

  if (!report) {
    return <h1>loading</h1>;
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

        <MoneyInformationCard
          title="Sisa Tagihan Penyewa"
          income={userAmountRemaining ?? 0}
        />
      </div>
      <div className="flex mt-6 flex-col md:flex-row">
        <ReportTable report={report ?? []} />
        <HouseIncomePie />
      </div>
      <IncomeChart report={report} />
    </div>
  );
}

export default Dashboard;
