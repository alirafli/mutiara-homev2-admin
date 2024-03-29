"use client";

import ActionDataModal from "@/components/ui/actionDataModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import thousandAndDecimalSeparator from "@/utils/NumberFormatter";
import { House } from "@/types/house";
import Photos from "./Photos";
import { deleteHouseById, deletePhotos } from "../../actions";
import { toast } from "@/components/ui/use-toast";
import UpdateHouseModal from "../UpdateHouseModal";
import MapsPopUp from "@/components/ui/MapsPopUp";
import { LuArrowDownUp } from "react-icons/lu";
import AlertActionModal from "@/components/ui/AlertActionModal";

const HouseContent = (houseData: House) => {
  return [
    { title: "nama", value: houseData.name },
    {
      title: "Penyewa",
      value: houseData?.user_id?.name ?? "-",
      id: houseData?.user_id?.id ?? "-",
    },
    { title: "Status Sewa", value: houseData.rent_status },
    { title: "Harga per Bulan", value: houseData.price_per_month },
    { title: "alamat", value: houseData.address },
    { title: "link maps", value: houseData.map_link },
    { title: "Jumlah ruangan", value: houseData.room },
    { title: "apakah ada parabot sebelumnya?", value: houseData.has_previous },
    { title: "Jumlah kamar mandi", value: houseData.bathroom },
    { title: "Pemasukan", value: houseData.income },
  ];
};

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

const renderDetails = (
  title: string,
  value: string | number | boolean,
  houseData: House
) => {
  if (title === "Pemasukan" || title === "Harga per Bulan")
    return `Rp${thousandAndDecimalSeparator(Number(value))}`;

  if (title === "apakah ada parabot sebelumnya?") {
    if (value) return "Ada";
    return "Tidak ada";
  }

  if (title === "Status Sewa") {
    return renderIsActive(value as boolean);
  }

  if (title === "link maps") {
    return <MapsPopUp position={value as string} houseData={houseData} />;
  }

  return value?.toString() ?? "-";
};

export const columns: ColumnDef<House>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Rumah
          <LuArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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

      const deleteHouse = async () => {
        const result = await deleteHouseById(houseData.id);
        await deletePhotos(houseData.photos ?? []);
        if (result.error && result.error.message) {
          toast({
            title: `gagal menghapus ${houseIdSlice}`,
          });
        } else {
          toast({
            title: `berhasil menghapus ${houseIdSlice}`,
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
                title={`${houseData.name}`}
                status={<Badge>View</Badge>}
              >
                <div>
                  <Photos id={houseData.id} photos={houseData.photos ?? []} />
                </div>
                {HouseContent(houseData).map((data) => (
                  <div key={data.title} className="mb-4">
                    <h1 className="scroll-m-20 border-b-2 text-lg font-medium tracking-tight first:mt-0 mb-2">
                      {data.title}
                    </h1>
                    <h2>{renderDetails(data.title, data.value, houseData)}</h2>
                  </div>
                ))}
              </ActionDataModal>

              <ActionDataModal
                trigger="Update"
                title={`${houseData.name}`}
                status={<Badge>Edit</Badge>}
              >
                <UpdateHouseModal
                  house={HouseContent(houseData)}
                  id={houseData.id}
                />
              </ActionDataModal>
            </div>
            <DropdownMenuSeparator />

            <AlertActionModal
              buttonText={`Hapus ${houseIdSlice}`}
              title="apakah anda yakin?"
              description={`Rumah ${houseIdSlice} akan dihapus secara permanen!`}
              onContinue={deleteHouse}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
