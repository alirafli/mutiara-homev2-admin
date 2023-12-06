"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useTheme } from "next-themes";

import SigninForm from "./SigninForm";
import { ModeToggle } from "@/components/toggle-theme";
import { ImageWrapper, SigninWrapper } from "../styles";

function LogoContent() {
  const { theme } = useTheme();
  const [themes, setTheme] = useState<string | null>(null);
  const [logo, setLogo] = useState<string>("/logo.png");

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }

    if (theme === "dark") {
      setLogo("/logo_white.png");
    } else {
      setLogo("/logo.png");
    }
  }, [theme]);
  return (
    <SigninWrapper mode={themes}>
      <title>Sign In</title>
      <ModeToggle />
      <ImageWrapper>
        <Image
          src={logo}
          width={200}
          height={200}
          layout="responsive"
          alt="mutiara home logo"
          priority
        />
      </ImageWrapper>

      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl">
        Halaman Admin
      </h1>

      <SigninForm />
    </SigninWrapper>
  );
}

export default LogoContent;
