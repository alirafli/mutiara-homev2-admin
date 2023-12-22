import { readUserSession } from "@/lib/actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Laporan Penyewa",
};

async function page() {
  const { data } = await readUserSession();

  if (!data.session) {
    return redirect("/sign-in");
  }
  return <div className="pl-6">renter report page</div>;
}

export default page;
