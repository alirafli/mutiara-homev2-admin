"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { decrementHouseAmount, deleteReportById } from "../../actions";
import { toast } from "@/components/ui/use-toast";
import UpdateReportModal from "../UpdateReportModal";
import { Badge } from "@/components/ui/badge";
import { client } from "@/utils/queryClient";
import AlertActionModal from "@/components/ui/AlertActionModal";

const reportContent = (reportData: ReportFinance) => {
  return [
    {
      title: "Tanggal Dibuat",
      value: reportData.created_at,
    },
    {
      title: "Nama Penyewa",
      value: reportData.renter_id.name,
      id: reportData.renter_id.id,
    },
    { title: "Kategori", value: reportData.category },
    { title: "Jenis Catatan", value: reportData.type },
    { title: "Akun Keuangan", value: reportData.account },
    {
      title: "Nama Rumah",
      value: reportData.house_id.name,
      id: reportData.house_id.id,
    },
    {
      title: "Nominal Pembayaran",
      value: reportData.amount,
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
    accessorKey: "renter_id.name",
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
    accessorKey: "house_id.name",
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
      const reportIdSlice = report.id?.slice(0, 5);

      const deleteReport = async () => {
        const result = await deleteReportById(report.id);
        await decrementHouseAmount(report.amount, report.house_id.id);
        client.refetchQueries({
          queryKey: ["houseNameQuery"],
        });

        if (result.error && result.error.message) {
          toast({
            title: `gagal menghapus ${reportIdSlice}`,
          });
        } else {
          toast({
            title: `berhasil menghapus ${reportIdSlice}`,
          });
        }
      };

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
                title={`catatan - ${reportIdSlice}`}
                status={<Badge>View</Badge>}
              >
                {reportContent(report).map((data) => (
                  <div key={data.title} className="mb-4">
                    <h1 className="scroll-m-20 border-b-2 text-lg font-medium tracking-tight first:mt-0 mb-2">
                      {data.title}
                    </h1>
                    <h2>
                      {data.title === "Tanggal Dibuat"
                        ? formatDate(data.value.toString(), "long")
                        : data.title === "Nominal Pembayaran"
                        ? `Rp${thousandAndDecimalSeparator(Number(data.value))}`
                        : data.value.toString()}
                    </h2>
                  </div>
                ))}
              </ActionDataModal>

              <ActionDataModal
                trigger="Update"
                title={`catatan - ${reportIdSlice}`}
                status={<Badge>Edit</Badge>}
              >
                <UpdateReportModal
                  report={reportContent(report)}
                  id={report.id}
                />
              </ActionDataModal>
            </div>

            <DropdownMenuSeparator />
            <AlertActionModal
              buttonText={`Hapus ${reportIdSlice}`}
              title="apakah anda yakin?"
              description={`Laporan ${reportIdSlice} akan dihapus secara permanen!`}
              onContinue={deleteReport}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
