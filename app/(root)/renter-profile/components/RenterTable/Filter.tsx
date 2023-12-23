import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { User } from "@/types/user";
import AlertActionModal from "@/components/ui/AlertActionModal";
import { changeUserPaymentStatusToFalse } from "../../actions";
import { toast } from "@/components/ui/use-toast";

type FilterProps = {
  table: Table<User>;
};

function Filter({ table }: FilterProps) {
  const changeUserPaymentStatus = async () => {
    const { error } = await changeUserPaymentStatusToFalse();

    if (error && error.message) {
      toast({
        title: `gagal mengubah status`,
      });
    } else {
      toast({
        title: `berhasil mengubah status`,
      });
    }
  };
  return (
    <div className="flex gap-6">
      <Input
        placeholder="Filter Penyewa"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-xs mb-6"
      />

      <Select
        defaultValue={
          (table.getColumn("is_active")?.getFilterValue() as string) ?? ""
        }
        onValueChange={(event) =>
          table
            .getColumn("is_active")
            ?.setFilterValue(
              event === "notall" ? "" : event === "menetap" ? true : false
            )
        }
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Filter Status Menetap" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Jenis</SelectLabel>
            <SelectItem value="notall">Semua</SelectItem>
            <SelectItem value="menetap">Menetap</SelectItem>
            <SelectItem value="pindah">Pindah</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        defaultValue={
          (table.getColumn("payment_status")?.getFilterValue() as string) ?? ""
        }
        onValueChange={(event) =>
          table
            .getColumn("payment_status")
            ?.setFilterValue(
              event === "notall" ? "" : event === "lunas" ? true : false
            )
        }
      >
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Filter Status Pembayaran" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Jenis</SelectLabel>
            <SelectItem value="notall">Semua</SelectItem>
            <SelectItem value="belum bayar">Belum Bayar</SelectItem>
            <SelectItem value="lunas">lunas</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <AlertActionModal
        buttonText="Ubah semua menjadi Belum Bayar"
        title="apakah anda yakin?"
        description="Semua penyewa akan diubah status pembayarannya menjadi 'Belum Bayar'"
        onContinue={changeUserPaymentStatus}
      />
    </div>
  );
}

export default Filter;
