"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { client } from "./queryClient";

function Provider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Provider;
