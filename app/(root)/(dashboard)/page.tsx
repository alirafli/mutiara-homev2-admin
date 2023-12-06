import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

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
    <div className="pl-6">
      <h1>Dashboard</h1>
      <div>
        <form action={logout}>
          <Button>SignOut</Button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
