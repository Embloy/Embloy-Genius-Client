"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/components/ui/misc/checkbox";
import { DataTableColumnHeader } from "@/app/components/dom/main/datatable/DataTableColumnHeader";
import { Application } from "@/lib/types/application";
import {cast_date_no_null } from "@/lib/utils/cast";

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
    accessorKey: "job_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job ID" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "user_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "application_text",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Text" />
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "response",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Your Response" />
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => {
      let colorClasses = "";
      if (row.getValue("status") === "rejected") {
        colorClasses = "cursor-text px-4 py-1 bg-red-100 dark:bg-red-950 rounded-full border border-red-600 dark:border-red-500 font-normal text-red-600 dark:text-red-500 text-xs";
      } else if (row.getValue("status") === "accepted") {
        colorClasses = "cursor-text px-4 py-1 bg-emerald-100 dark:bg-emerald-950 rounded-full border border-emerald-600 dark:border-emerald-500 font-normal text-emerald-600 dark:text-emerald-500 text-xs";
      } else if (row.getValue("status") === "pending") {
        colorClasses = "cursor-text px-4 py-1 bg-yellow-100 dark:bg-yellow-950 rounded-full border border-yellow-600 dark:border-yellow-500 font-normal text-yellow-600 dark:text-yellow-500 text-xs";
      } else {
        colorClasses =
          "cursor-text px-4 py-1 bg-gray-100 dark:bg-gray-950 rounded-full border border-gray-600 dark:border-gray-500 font-normal text-gray-600 dark:text-gray-500 text-xs";
      }

      return (
        <div className="flex justify-center space-x-2">
          <span
            className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${colorClasses}`}
          >
            {row.getValue("status")}
          </span>
        </div>
      );
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
      return <div>{cast_date_no_null(row.getValue('created_at'))}</div>
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
      return <div>{cast_date_no_null(row.getValue('updated_at'))}</div>
    },
  },
];
