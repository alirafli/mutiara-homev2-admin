import React from "react";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";

import LogoContent from "./components/LogoContent";

async function Signin() {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect("/");
  }
  return <LogoContent />;
}

export default Signin;
