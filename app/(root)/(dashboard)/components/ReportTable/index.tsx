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
import AddDataModal from "@/components/ui/addDataModal";
import AddReportForm from "../AddReportForm";

import Filter from "./Filter";

interface ReportTableProps {
  report: ReportFinance[];
}

export function ReportTable({ report }: ReportTableProps) {
  const [modal, setModal] = React.useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const handleModalOpen = (value: boolean) => {
    setModal(value);
  };
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
        pageSize: 6,
      },
    },
  });

  return (
    <Card className="w-full md:w-[70%]">
      <CardHeader>
        <CardTitle>Laporan Keuangan</CardTitle>
      </CardHeader>
      <CardContent>
        <Filter table={table} />
        <div className="rounded-md border h-[490px] md:h-[440px]">
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
          <AddDataModal
            triggerTitle="Tambah Data"
            title="Tambah Pembukuan"
            modal={modal}
            handleModalOpen={handleModalOpen}
          >
            <AddReportForm handleModalOpen={handleModalOpen} />
          </AddDataModal>

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
