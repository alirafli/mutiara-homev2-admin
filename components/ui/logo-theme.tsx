"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

function LogoTheme() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === "light" ? "/logo.png" : "/logo_white.png"}
      width={200}
      height={200}
      layout="responsive"
      alt="mutiara home logo"
      priority
    />
  );
}

export default LogoTheme;
