import { Metadata } from "next";
import React from "react";
import RenterTable from "./components/RenterTable";
import { getRenterData } from "./actions";

export const metadata: Metadata = {
  title: "Profile Penyewa",
};

async function page() {
  const { data: users } = await getRenterData();

  if (!users) {
    return <h1>loading</h1>;
  }
  return (
    <div className="px-6">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl mb-8">
        Profile Penyewa
      </h1>

      <RenterTable users={users} />
    </div>
  );
}

export default page;
