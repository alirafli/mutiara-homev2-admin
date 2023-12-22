import { Metadata } from "next";
import React from "react";
import TestRender from "./components";

export const metadata: Metadata = {
  title: "Laporan Penyewa",
};

function page() {
  return (
    <div className="pl-6">
      renter report page
      <TestRender />
    </div>
  );
}

export default page;
