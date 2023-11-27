"use client"
import {ColumnDef} from "@tanstack/react-table"
import * as inspector from "inspector";
import {ArrowUpDown, MoreHorizontal} from "lucide-react"

import {Button} from "@/app/components/ui/button"
import {Checkbox} from "@/app/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import {DataTableColumnHeader} from "@/app/components/datatable/DataTableColumnHeader";
import {Job} from "@/app/recruitment/job_type";


export const columns: ColumnDef<Job>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
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
            <DataTableColumnHeader column={column} title="Job ID"/>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "job_type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type"/>
        ),
        enableSorting: true,
        enableHiding: true,
    },
]