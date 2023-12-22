import { Metadata } from "next";
import React from "react";
import HouseTable from "./components/HouseTable";
import { getHouseData } from "./actions";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Rumah Sewa",
};

async function page() {
  const { data } = await readUserSession();
  const { data: Houses } = await getHouseData();

  if (!data.session) {
    return redirect("/sign-in");
  }

  if (!Houses) {
    return <h1>loading</h1>;
  }
  return (
    <div className="pl-6">
      <div className="px-6">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl mb-8">
          Rumah Sewa
        </h1>

        <HouseTable Houses={Houses} />
      </div>
    </div>
  );
}

export default page;
