"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ReportFinance } from "@/types/financeReport";
import { categorizeAndSummarize } from "@/utils/SummarizeReport";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IncomeChartProps {
  report: ReportFinance[];
}

function IncomeChart({ report }: IncomeChartProps) {
  const [yearFilter, setYearFilter] = useState<number>(
    Number(new Date().getFullYear())
  );
  const reportSummarize = categorizeAndSummarize(report);
  const FilterReportSummarize = categorizeAndSummarize(report).filter(
    (e) => e.year === yearFilter
  );

  const options = {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = FilterReportSummarize.map((e) => e.monthName);
  const getYears = reportSummarize
    .map((e) => e.year)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const data = {
    labels,
    datasets: [
      {
        label: "Pemasukan",
        data: FilterReportSummarize.map((e) => e.income),
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Pengeluaran",
        data: FilterReportSummarize.map((e) => e.expense),
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Penghasilan</CardTitle>
      </CardHeader>

      <CardContent>
        <Select onValueChange={(event) => setYearFilter(Number(event))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={yearFilter} />
          </SelectTrigger>
          <SelectContent>
            {getYears.map((e, index) => (
              <SelectItem key={`key-${e}-${index}`} value={e.toString()}>
                {e}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="h-80 w-full">
          <Bar options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}

export default IncomeChart;
