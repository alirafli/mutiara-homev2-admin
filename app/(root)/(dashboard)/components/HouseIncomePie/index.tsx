"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function HouseIncomePie() {
  return (
    <Card className="ml-0 md:ml-6 w-full md:w-[30%] mt-6 md:mt-0">
      <CardHeader>
        <CardTitle>Pemasukan Rumah Sewa</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-80 w-full bg-red-500"></div>
      </CardContent>
    </Card>
  );
}

export default HouseIncomePie;
