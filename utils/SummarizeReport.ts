import { ReportFinance } from "@/types/financeReport";

type MonthlySummary = {
  month: number;
  monthName: string;
  year: number;
  income: number;
  expense: number;
};

export function categorizeAndSummarize(
  data: ReportFinance[]
): MonthlySummary[] {
  const summary: Record<string, MonthlySummary> = {};
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  data.forEach((item) => {
    const date = new Date(item.created_at);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    const key = `${year}-${monthIndex + 1}`;

    if (!summary[key]) {
      summary[key] = { month, monthName, year, income: 0, expense: 0 };
    }

    if (item.category === "Pemasukan") {
      summary[key].income += item.amount;
    } else if (item.category === "Pengeluaran") {
      summary[key].expense += item.amount;
    }
  });

  return Object.values(summary);
}
