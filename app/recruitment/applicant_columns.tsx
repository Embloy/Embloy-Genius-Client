"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/components/ui/misc/checkbox";
import { DataTableColumnHeader } from "@/app/components/dom/main/datatable/DataTableColumnHeader";
import { Applicant, Application } from "@/lib/types/application";
import {cast_date_no_null } from "@/lib/utils/cast";
import { EmbloyP } from "@/app/components/ui/misc/text";
import { EmbloyH } from "@/app/components/ui/misc/stuff";

export const applicantColumns: ColumnDef<Applicant>[] = [
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
    accessorKey: "last_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const value = row.getValue('last_name')
      return <EmbloyP className={`text-xs ${!value && 'text-testaccio dark:text-nebbiolo italic'}`} >{value || "N/A"}</EmbloyP>
    },
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const value = row.getValue('first_name')
      return <EmbloyP className={`text-xs ${!value && 'text-testaccio dark:text-nebbiolo italic'}`} >{value || "N/A"}</EmbloyP>
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="On Embloy since" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const value = cast_date_no_null(row.getValue('created_at'))
      return <EmbloyP className={`text-xs ${!value && 'text-testaccio dark:text-nebbiolo italic'}`} >{value || "N/A"}</EmbloyP>
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last application" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const value = cast_date_no_null(row.getValue('updated_at'))	
      return <EmbloyP className={`text-xs ${!value && 'text-testaccio dark:text-nebbiolo italic'}`} >{value || "N/A"}</EmbloyP>
    },
  },
];
