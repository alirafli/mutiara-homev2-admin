import React from "react";
import { ReportFinance } from "@/types/financeReport";
import { Table } from "@tanstack/react-table";
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

type FilterProps = {
  table: Table<ReportFinance>;
};

function Filter({ table }: FilterProps) {
  return (
    <div className="flex gap-6">
      <Input
        placeholder="Filter Penyewa"
        value={
          (table.getColumn("renter_id_name")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("renter_id_name")?.setFilterValue(event.target.value)
        }
        className="max-w-xs mb-6"
      />

      <Select
        defaultValue={
          (table.getColumn("type")?.getFilterValue() as string) ?? ""
        }
        onValueChange={(event) =>
          table
            .getColumn("type")
            ?.setFilterValue(event === "notall" ? "" : event)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter Jenis" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Jenis</SelectLabel>
            <SelectItem value="notall">Semua</SelectItem>
            <SelectItem value="lunas">Lunas</SelectItem>
            <SelectItem value="cicilan">Cicilan</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
