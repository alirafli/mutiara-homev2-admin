"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import useHouseQuery from "@/hooks/useHouses";
import randomColor from "randomcolor";
import IncomeTable from "./components/IncomeTable";

ChartJS.register(ArcElement, Tooltip, Legend);

function HouseIncomePie() {
  const { data: houseData } = useHouseQuery();

  if (!houseData) return <h1>loading...</h1>;

  const colors = randomColor({
    count: houseData.length,
    luminosity: "bright",
    format: "rgba",
    alpha: 0.3,
  });

  const houseDataRecap = () => {
    return houseData.map((e) => ({ name: e.name, income: e.income }));
  };

  const data = {
    labels: houseDataRecap().map((e) => e.name),
    datasets: [
      {
        label: "Rp",
        data: houseDataRecap().map((e) => e.income),
        backgroundColor: colors,
        borderColor: colors,
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
        <div className="h-60 w-full mb-5">
          <Pie
            options={{ plugins: { legend: { display: false } } }}
            data={data}
            className="mx-auto"
          />
        </div>

        <IncomeTable data={houseData} />
      </CardContent>
    </Card>
  );
}

export default HouseIncomePie;
