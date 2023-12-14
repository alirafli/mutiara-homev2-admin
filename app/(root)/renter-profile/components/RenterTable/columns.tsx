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
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Nama Penyewa",
  },
  {
    accessorKey: "phone_number",
    header: "No Telpon",
  },
  {
    accessorKey: "house_name",
    header: "Rumah Sewa",
  },
  {
    accessorKey: "is_active",
    header: "Status Menetap",
  },
  {
    accessorKey: "nik",
    header: "NIK",
  },
  {
    accessorKey: "rent_time",
    header: "Waktu Sewa",
  },
  {
    accessorKey: "payment_status",
    header: "Nama Penyewa",
  },
  {
    accessorKey: "amount_remaining",
    header: "Sisa Pembayaran",
  },
  {
    id: "action",

    enableHiding: false,
    cell: ({ row }) => {
      const renterData = row.original;

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
                title={`catatan - `}
                status={<Badge>View</Badge>}
              >
                <h1>{renterData.name}</h1>
              </ActionDataModal>

              <ActionDataModal
                trigger="Update"
                title={`catatan -`}
                status={<Badge>Edit</Badge>}
              >
                <h1>bbb</h1>
              </ActionDataModal>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form>
                <Button
                  variant="ghost"
                  className="text-red-800 dark:text-red-700 m-0 p-0 w-fit h-fit"
                >
                  Delete -
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
