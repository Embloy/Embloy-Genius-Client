"use client"
import {ColumnDef} from "@tanstack/react-table"
import {Checkbox} from "@/app/components/ui/misc/checkbox"
import {DataTableColumnHeader} from "@/app/components/dom/main/datatable/DataTableColumnHeader";
import {Job} from "@/lib/types/job";
import {cast_date_no_null} from "@/lib/utils/cast";

export const jobColumns: ColumnDef<Job>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
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
        accessorKey: "position",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Position"/>
        ),
        enableSorting: false,
        enableHiding: true,
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
        accessorKey: "job_slug",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Jobslug"/>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "integration_type",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Hosted by"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            let bin = (row.getValue('job_slug') as string).split('__');
            let provider = "Embloy"
            if (bin.length > 1) {
                provider = bin[0][0].toUpperCase() + bin[0].slice(1)
            }
            
            return <div>{provider}</div>

        },
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
        accessorKey: "job_status",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Visibility"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            let visibility = ""
            if (row.getValue('job_status') === 'unlisted') {
                visibility = "Unlisted"
            } else if (row.getValue('job_status') === 'listed') {
                visibility = "Public"
            } else if (row.getValue('job_status') === 'archived') {
                visibility = "Archived"
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
            return <div>{cast_date_no_null(row.getValue('start_slot'))}</div>
        },
    },
    {
        accessorKey: "view_count",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Views"/>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "applications_count",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Applications"/>
        ),
        enableSorting: true,
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
            return <div>{cast_date_no_null(row.getValue('created_at'))}</div>
        },
    },


]