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
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { deleteRenterById } from "../../actions";

const renderIsActive = (value: boolean) => {
  return (
    <div
      className={` ${
        value
          ? "bg-green-300 dark:bg-green-700"
          : "bg-zinc-300 dark:bg-zinc-700"
      } text-center rounded-full px-1 capitalize`}
    >
      {value ? "Menetap" : "Pindah"}
    </div>
  );
};

const renderStatus = (value: boolean) => {
  return (
    <div
      className={` ${
        value ? "bg-green-300 dark:bg-green-700" : "bg-red-300 dark:bg-red-700"
      } text-center rounded-full px-1 capitalize`}
    >
      {value ? "Lunas" : "Belum Membayar"}
    </div>
  );
};

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
    cell: ({ getValue }) => {
      return renderIsActive(getValue() as boolean);
    },
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
    header: "Status Pembayaran",
    cell: ({ getValue }) => {
      return renderStatus(getValue() as boolean);
    },
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
      const renterIdSlice = renterData.id?.slice(0, 5);

      const deleteRenter = async () => {
        const result = await deleteRenterById(renterData.id);
        if (result.error && result.error.message) {
          toast({
            title: `gagal menghapus ${renterIdSlice}`,
          });
        } else {
          toast({
            title: `berhasil menghapus ${renterIdSlice}`,
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
              <form action={deleteRenter}>
                <Button
                  variant="ghost"
                  className="text-red-800 dark:text-red-700 m-0 p-0 w-fit h-fit"
                >
                  Delete {renterIdSlice}
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
