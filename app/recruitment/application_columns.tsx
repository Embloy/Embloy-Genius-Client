"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/components/ui/misc/checkbox";
import { DataTableColumnHeader } from "@/app/components/dom/main/datatable/DataTableColumnHeader";
import { Application } from "@/lib/types/application";
import {cast_date_no_null } from "@/lib/utils/cast";
import { EmbloyP } from "@/app/components/ui/misc/text";
import { EmbloyH } from "@/app/components/ui/misc/stuff";

export const applicationColumns: ColumnDef<Application>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {

    if (row.getValue('status') === "accepted") {
        return (
            <EmbloyH className="gap-1.5 items-center">
                <div className="h-2 w-2 rounded-full bg-lugana dark:bg-lugana" />
                <EmbloyP className="text-xs" >Offer</EmbloyP>
            </EmbloyH>
        )
    } else if (row.getValue('status') === "rejected") {
        return (
          <EmbloyH className="gap-1.5 items-center">
              <div className="h-2 w-2 rounded-full bg-primitivo dark:bg-zinfandel" />
              <EmbloyP className="text-xs" >Rejected</EmbloyP>
          </EmbloyH>
      )
    } else {
        return (
          <EmbloyH className="gap-1.5 items-center">
              <div className="h-2 w-2 rounded-full bg-capri dark:bg-barbera" />
              <EmbloyP className="text-xs" >Pending</EmbloyP>
          </EmbloyH>
        )
      }
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Submitted On" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      return <EmbloyP className={"text-xs"}>{cast_date_no_null(row.getValue('created_at'))}</EmbloyP>
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Edited On" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      return <EmbloyP className="text-xs">{cast_date_no_null(row.getValue('updated_at'))}</EmbloyP>
    },
  },
];
