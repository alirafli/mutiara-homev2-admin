import React from "react";
import { Metadata } from "next";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";

import LogoContent from "./components/LogoContent";

export const metadata: Metadata = {
  title: "Sign In",
};

async function Signin() {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect("/");
  }
  return <LogoContent />;
}

export default Signin;
