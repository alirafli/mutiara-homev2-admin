"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function HouseIncomePie() {
  const data = {
    labels: ["Pemasukan", "Pengeluaran"],
    datasets: [
      {
        label: "Rp",
        data: [12, 19],
        backgroundColor: ["rgba(255, 99, 132, 0.3)", "rgba(75, 192, 192, 0.3)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="ml-0 md:ml-6 w-full md:w-[30%] mt-6 md:mt-0">
      <CardHeader>
        <CardTitle>Pemasukan Rumah Sewa</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-80 w-full">
          <Pie data={data} className="mx-auto"/>
        </div>
      </CardContent>
    </Card>
  );
}

export default HouseIncomePie;
