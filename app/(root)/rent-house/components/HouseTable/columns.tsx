"use client";

import ActionDataModal from "@/components/ui/actionDataModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { toast } from "@/components/ui/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import thousandAndDecimalSeparator from "@/utils/NumberFormatter";
// import Image from "next/image";
import { House } from "@/types/house";

// const renterContent = (houseData: House) => {
//   return [
//     { title: "nama", value: houseData.name },
//     { title: "email", value: houseData.email },
//     { title: "password", value: houseData.password },
//     { title: "nik", value: houseData.nik },
//     { title: "nomor telpon", value: houseData.phone_number },
//     { title: "status pembayaran", value: houseData.payment_status },
//     { title: "sisa pembayaran", value: houseData.amount_remaining },
//     { title: "status menetap", value: houseData.is_active },
//     { title: "waktu sewa", value: houseData.rent_time },
//     { title: "nama rumah", value: houseData.house_name },
//   ];
// };

const renderIsActive = (value: boolean) => {
  return (
    <div
      className={`w-fit px-2 ${
        value
          ? "bg-green-300 dark:bg-green-700"
          : "bg-zinc-300 dark:bg-zinc-700"
      } text-center rounded-full px-1 capitalize`}
    >
      {value ? "Ditempati" : "Kosong"}
    </div>
  );
};

export const columns: ColumnDef<House>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Nama Rumah",
  },
  {
    accessorKey: "address",
    header: "Alamat",
  },
  {
    accessorKey: "user_id.name",
    header: "Nama Penyewa",
    cell: ({ getValue }) => {
      return getValue() ?? "-";
    },
  },
  {
    accessorKey: "price_per_month",
    header: "Harga per bulan",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return `Rp${thousandAndDecimalSeparator(value)}`;
    },
  },
  {
    accessorKey: "income",
    header: "Pemasukan",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return `Rp${thousandAndDecimalSeparator(value)}`;
    },
  },
  {
    accessorKey: "rent_status",
    header: "Status Sewa",
    cell: ({ getValue }) => {
      return renderIsActive(getValue() as boolean);
    },
  },

  {
    id: "action",

    enableHiding: false,
    cell: ({ row }) => {
      const houseData = row.original;
      const houseIdSlice = houseData.id?.slice(0, 5);

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
                title={`${houseData.name}`}
                status={<Badge>View</Badge>}
              >
                <h1>detail</h1>
              </ActionDataModal>

              <ActionDataModal
                trigger="Update"
                title={`${houseData.name}`}
                status={<Badge>Edit</Badge>}
              >
                <h1>update</h1>
              </ActionDataModal>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form>
                <Button
                  variant="ghost"
                  className="text-red-800 dark:text-red-700 m-0 p-0 w-fit h-fit"
                >
                  Delete {houseIdSlice}
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
