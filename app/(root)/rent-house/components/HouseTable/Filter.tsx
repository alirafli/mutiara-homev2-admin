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
import { House } from "@/types/house";

type FilterProps = {
  table: Table<House>;
};

function Filter({ table }: FilterProps) {
  return (
    <div className="flex gap-6">
      <Input
        placeholder="Filter Nama Rumah"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-xs mb-6"
      />

      <Select
        defaultValue={
          (table.getColumn("rent_status")?.getFilterValue() as string) ?? ""
        }
        onValueChange={(event) =>
          table
            .getColumn("rent_status")
            ?.setFilterValue(
              event === "notall" ? "" : event === "ditempati" ? true : false
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
            <SelectItem value="kosong">kosong</SelectItem>
            <SelectItem value="ditempati">ditempati</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
