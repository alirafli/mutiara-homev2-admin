import React from "react";
import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";

async function Dashboard() {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect("/sign-in");
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
