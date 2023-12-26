import { readUserSession } from "@/lib/actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { getReportData } from "./actions";
import ReportTable from "./components/ReportTable";

export const metadata: Metadata = {
  title: "Laporan Penyewa",
};

async function page() {
  const { data } = await readUserSession();
  const { data: report } = await getReportData();

  if (!data.session) {
    return redirect("/sign-in");
  }

  if (!report)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  return (
    <div className="pl-6 px-6">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl mb-8">
        Laporan Penyewa
      </h1>
      <ReportTable report={report} />
    </div>
  );
}

export default page;
