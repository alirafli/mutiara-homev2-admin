"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReportFinance } from "@/types/financeReport";
import { formatDate } from "@/utils/DateFormatter";
import thousandAndDecimalSeparator from "@/utils/NumberFormatter";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import ActionDataModal from "@/components/ui/actionDataModal";

const ReportContent = (reportData: ReportFinance) => {
  return [
    {
      title: "Tanggal Dibuat",
      value: formatDate(reportData.created_at.toString(), "long"),
    },
    { title: "Nama Penyewa", value: reportData.renter },
    { title: "Kategori", value: reportData.category },
    { title: "Jenis Catatan", value: reportData.type },
    { title: "Akun Keuangan", value: reportData.account },
    { title: "Nama Rumah", value: reportData.house_name },
    {
      title: "Nominal Pembayaran",
      value: `Rp${thousandAndDecimalSeparator(reportData.amount)}`,
    },
    { title: "Catatan Tambahan", value: reportData.note },
  ];
};

const RenderCaterogy = (value: string) => {
  const isIncomeVariant = value.toLocaleLowerCase() === "pemasukan";
  return (
    <div
      className={` ${
        isIncomeVariant
          ? "bg-green-300 dark:bg-green-700"
          : "bg-red-300 dark:bg-red-700"
      } text-center rounded-full px-1 capitalize`}
    >
      {value}
    </div>
  );
};

export const columns: ColumnDef<ReportFinance>[] = [
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ getValue }) => {
      const value = formatDate(getValue() as string);
      return value;
    },
  },
  {
    accessorKey: "renter",
    header: "Penyewa",
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ getValue }) => {
      return RenderCaterogy(getValue() as string);
    },
  },
  {
    accessorKey: "type",
    header: "Jenis",
  },
  {
    accessorKey: "house_name",
    header: "Nama Rumah",
  },
  {
    accessorKey: "amount",
    header: "nominal",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return `Rp${thousandAndDecimalSeparator(value)}`;
    },
  },

  {
    id: "action",
    enableHiding: false,
    cell: ({ row }) => {
      const report = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <div className="flex flex-col pl-2">
              <ActionDataModal
                trigger="Detail"
                title={`catatan - ${report.id?.slice(0, 5)}`}
                status={
                  <Button disabled variant="outline">
                    View
                  </Button>
                }
              >
                {ReportContent(report).map((data) => (
                  <div key={data.title} className="mb-4">
                    <h1 className="scroll-m-20 border-b-2 text-lg font-medium tracking-tight first:mt-0 mb-2">
                      {data.title}
                    </h1>
                    <h2>{data.value}</h2>
                  </div>
                ))}
              </ActionDataModal>

              <ActionDataModal
                trigger="Update"
                title={`catatan - ${report.id?.slice(0, 5)}`}
                status={
                  <Button disabled variant="outline">
                    Edit
                  </Button>
                }
              >
                <h1>{report.renter}</h1>
              </ActionDataModal>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-800 dark:text-red-00 font-medium">
              Delete {report.id?.slice(0, 4)}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];