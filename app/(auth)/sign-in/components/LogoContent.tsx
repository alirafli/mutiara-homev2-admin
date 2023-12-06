"use client";

import React from "react";

import SigninForm from "./SigninForm";
import { ModeToggle } from "@/components/toggle-theme";
import { ImageWrapper, SigninWrapper } from "../styles";
import LogoTheme from "@/components/ui/logo-theme";

function LogoContent() {
  return (
    <SigninWrapper>
      <title>Sign In</title>
      <ModeToggle />
      <ImageWrapper>
        <LogoTheme />
      </ImageWrapper>

      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl">
        Halaman Admin
      </h1>

      <SigninForm />
    </SigninWrapper>
  );
}

export default LogoContent;
