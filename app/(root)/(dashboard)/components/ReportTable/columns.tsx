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
  },
  {
    accessorKey: "type",
    header: "Jenis",
  },
  {
    accessorKey: "account",
    header: "Akun",
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
            <DropdownMenuItem>View Detail</DropdownMenuItem>
            <DropdownMenuItem>Update</DropdownMenuItem>
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
