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
import {cast_date} from "@/lib/utils/formats";


export const columns: ColumnDef<Job>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
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
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Job ID"/>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "job_type",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Category"/>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "position",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Position"/>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "status",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Visibility"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            let visibility = ""
            if (row.getValue('status') === 0) {
                visibility = "Unlisted"
            } else if (row.getValue('status') === 1) {
                visibility = "Public"
            } else {
                visibility = undefined
            }
            return <div>{visibility}</div>

        },
    },
    {
        accessorKey: "start_slot",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Onboarding On"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            const date = cast_date(row.getValue('start_slot'), 'us')
            return <div>{date}</div>
        },
    },
    {
        accessorKey: "view_count",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Views"/>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "application_count",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Applications"/>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "created_at",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Created On"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            const date = cast_date(row.getValue('created_at'), 'us')
            return <div>{date}</div>
        },
    },


]