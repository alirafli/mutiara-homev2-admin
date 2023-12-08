"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReportFinance } from "@/types/financeReport";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// const data: ReportFinance[] = [
//   {
//     id: "1",
//     created_at: "2021-10-30",
//     nik: "123",
//     renter: "Fiona",
//     category: "Pemasukan",
//     type: "Cicilan",
//     account: "BCA 1",
//     house: "House1",
//     amount: 800000,
//     note: "",
//   },
//   {
//     id: "2",
//     created_at: "2022-01-15",
//     nik: "456",
//     renter: "Alex",
//     category: "Pengeluaran",
//     type: "Pemeliharaan",
//     account: "Mandiri 2",
//     house: "House2",
//     amount: 450000,
//     note: "",
//   },
//   {
//     id: "3",
//     created_at: "2021-08-21",
//     nik: "789",
//     renter: "Maria",
//     category: "Pemasukan",
//     type: "Sewa",
//     account: "BNI 3",
//     house: "House3",
//     amount: 1200000,
//     note: "",
//   },
//   {
//     id: "4",
//     created_at: "2022-05-10",
//     nik: "101",
//     renter: "John",
//     category: "Pengeluaran",
//     type: "Renovasi",
//     account: "BCA 4",
//     house: "House4",
//     amount: 300000,
//     note: "",
//   },
//   {
//     id: "5",
//     created_at: "2022-11-07",
//     nik: "202",
//     renter: "Sara",
//     category: "Pemasukan",
//     type: "Cicilan",
//     account: "Mandiri 5",
//     house: "House5",
//     amount: 950000,
//     note: "",
//   },
//   {
//     id: "6",
//     created_at: "2021-12-30",
//     nik: "303",
//     renter: "Erik",
//     category: "Pengeluaran",
//     type: "Perbaikan",
//     account: "BNI 6",
//     house: "House6",
//     amount: 200000,
//     note: "",
//   },
//   {
//     id: "7",
//     created_at: "2022-03-22",
//     nik: "404",
//     renter: "Chloe",
//     category: "Pemasukan",
//     type: "Sewa",
//     account: "BCA 7",
//     house: "House7",
//     amount: 1100000,
//     note: "",
//   },
//   {
//     id: "8",
//     created_at: "2022-07-19",
//     nik: "505",
//     renter: "Liam",
//     category: "Pengeluaran",
//     type: "Pemeliharaan",
//     account: "Mandiri 8",
//     house: "House8",
//     amount: 500000,
//     note: "",
//   },
//   {
//     id: "9",
//     created_at: "2021-09-05",
//     nik: "606",
//     renter: "Grace",
//     category: "Pemasukan",
//     type: "Cicilan",
//     account: "BNI 9",
//     house: "House9",
//     amount: 700000,
//     note: "",
//   },
//   {
//     id: "10",
//     created_at: "2022-02-18",
//     nik: "707",
//     renter: "Oliver",
//     category: "Pengeluaran",
//     type: "Renovasi",
//     account: "BCA 10",
//     house: "House10",
//     amount: 550000,
//     note: "",
//   },
// ];

interface ReportTableProps {
  report: ReportFinance[];
}

export function ReportTable({ report }: ReportTableProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: report,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });

  return (
    <Card className="w-full md:w-[70%]">
      <CardHeader>
        <CardTitle>Laporan Keuangan</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Filter Penyewa"
          value={(table.getColumn("renter")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("renter")?.setFilterValue(event.target.value)
          }
          className="max-w-xs mb-6"
        />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button size="sm" className="mr-auto">
            Tambah Data
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
