import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "./button";

function LogoutButton() {
  const logout = async () => {
    "use server";
    const supabse = await createSupabaseServerClient();
    await supabse.auth.signOut();
    redirect("/sign-in");
  };
  return (
    <form action={logout}>
      <Button className="w-full">SignOut</Button>
    </form>
  );
}

export default LogoutButton;
