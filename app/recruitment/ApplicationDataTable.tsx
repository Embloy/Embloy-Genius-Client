"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ApplicationTableRowExtendable,
} from "@/app/components/ui/misc/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/misc/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DataTablePagination } from "@/app/components/dom/main/datatable/DataTablePagination";
import { extractContent } from "@/lib/utils/helpers";
import { Application } from "@/lib/types/application";
import LoadingScreen from "@/app/components/dom/main/screens/LoadingScreen";
import { useRouter } from "next/navigation";
import { EmbloyH1, EmbloyP } from "../components/ui/misc/text";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import '@/app/globals.css'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleDataReload: () => void;
}

export function ApplicationDataTable<TData extends Application, TValue>({
  columns,
  data,
  handleDataReload,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [filterIsHovered, setFilterIsHovered] = useState(false);
  const [columnsIsHovered, setColumnsIsHovered] = useState(false);

  const handleFilterHover = () => {
    setFilterIsHovered(true);
  };
  const handleFilterNotHover = () => {
    setFilterIsHovered(false);
  };

  const handleColumnsHover = () => {
    setColumnsIsHovered(true);
  };
  const handleColumnsNotHover = () => {
    setColumnsIsHovered(false);
  };

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const default_hides = () => {
    table.getColumn("updated_at").toggleVisibility(false);
  };
  useEffect(() => {
    default_hides();
  }, []);

  const [openRow, setOpenRow] = useState<number>(null);
  const toggle_row = (row) => {
    let new_row = null;
    if (openRow !== Number(row)) {
      new_row = Number(row);
    }
    setOpenRow(new_row);
  };
  const invalidateRowModel = () => {
    handleDataReload();
  };
  const handleUpdateSuccess = () => {
    setRowSelection({});
    invalidateRowModel();
  };

  const getSelectedRows = () => {
    return rowSelection;
  };
  const getApplication = (row_id) => {
    return data.at(Number(row_id));
  };

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <EmbloyV className={"gap-2"}>
      <EmbloyH className={"items-center justify-end px-1.5"}>
        <input
          className={"rounded-lg text-sm bg-white dark:bg-chianti dark:border-chianti text-black dark:text-white h-7 w-48 px-2 placeholder-etna dark:placeholder-amarone border-[1px] border-etna dark:border-none outline-none focus:outline-none focus:ring-2 focus:ring-golfotrieste dark:focus:ring-amarone select-all"}
          type="text"
          name="name"
          placeholder="Filter..."
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange=
              {
                  (event) => {
                      if (window.scrollY !== 0) {
                          window.scrollTo({
                              top: 0,
                              behavior: "smooth"
                          });
                      }
                      table.getColumn("status")?.setFilterValue(event.target.value)
                  }
              }

      />
     
    
      </EmbloyH>
      <div className="text-black dark:text-white w-full border-t border-b border-etna dark:border-biferno">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-etna dark:border-biferno"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  if (
                    typeof header.column.columnDef["accessorKey"] ===
                    "undefined"
                  ) {
                    return (
                      <TableHead className="cursor-default" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  }
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
          <TableBody className="text-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <ApplicationTableRowExtendable
                  className="cursor-pointer border-etna dark:border-biferno hover:bg-ferrara dark:hover:bg-biferno"
                  key={row.id}
                  extended={!!(openRow !== null && openRow === Number(row.id))}
                  application={data.at(Number(row.id))}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(event) => {
                    const target = event.target as HTMLElement;
                    if (target.getAttribute("role") === "checkbox") {
                      return;
                    } else {
                      toggle_row(row.id);
                    }
                  }}
                  onUpdateSuccess={() => handleUpdateSuccess()}
                  onClose={() => setOpenRow(null)}
                  onExtending={() =>
                    table
                      .getAllColumns()
                      .filter((column) => column.getIsVisible()).length
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </ApplicationTableRowExtendable>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <EmbloyP className={"text-xs"}>No applications</EmbloyP>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="p-4 flex flex-row items-center justify-between">
        <div className="flex items-center justify-start space-x-2">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            // If the condition is true
            <p className="text-sm font-normal text-gray-700">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </p>
          )}
        </div>
        <DataTablePagination table={table} />
      </div>
    </EmbloyV>
  );
}
