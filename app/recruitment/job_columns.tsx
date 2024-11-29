"use client"
import {ColumnDef} from "@tanstack/react-table"
import {Checkbox} from "@/app/components/ui/misc/checkbox"
import {DataTableColumnHeader} from "@/app/components/dom/main/datatable/DataTableColumnHeader";
import {Job} from "@/lib/types/job";
import {cast_date_no_null, job_slug_to_host} from "@/lib/utils/cast";
import { EmbloyP } from "../components/ui/misc/text";

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
        cell: ({row}) => {
            let value = row.getValue('position')
            if (!value && row.getValue('job_slug') === "new") {
                value = "Draft"
            } 
            return <EmbloyP className="text-xs" >{value}</EmbloyP>
        },
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "id",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Job ID"/>
        ),
        cell: ({row}) => {
            let value = row.getValue('id')
            if (!value && row.getValue('job_slug') === "new") {
                value = "Draft"
            } 
            return <EmbloyP className="text-xs" >{value}</EmbloyP>
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "job_slug",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Jobslug"/>
        ),
        cell: ({row}) => {
            return <EmbloyP className="text-xs" >{row.getValue('job_slug')}</EmbloyP>
        },
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
            return <EmbloyP className="text-xs" >{job_slug_to_host(row.getValue('job_slug'))}</EmbloyP>

        },
    },
    {
        accessorKey: "job_type",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Category"/>
        ),
        cell: ({row}) => {
            let value = row.getValue('job_type')
            if (!value && row.getValue('job_slug') === "new") {
                value = "Draft"
            } 
            return <EmbloyP className="text-xs" >{value}</EmbloyP>
        },
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
                visibility = "Draft"
            }
            return <EmbloyP className="text-xs" >{visibility}</EmbloyP>

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
            let value = row.getValue('start_slot')
            if (!value && row.getValue('job_slug') === "new") {
                value = "Draft"
            } else {
                value = cast_date_no_null(value)
            }
            return <EmbloyP className="text-xs" >{value}</EmbloyP>
        },
    },
    {
        accessorKey: "view_count",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Views"/>
        ),
        cell: ({row}) => {
            let value = row.getValue('view_count')
            if (!value) {
                value = 0
            }
            return <EmbloyP className="text-xs" >{value}</EmbloyP>
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "applications_count",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Applications"/>
        ),
        cell: ({row}) => {
            let value = row.getValue('applications_count')
            if (!value) {
                value = 0
            }
            return <EmbloyP className="text-xs" >{value}</EmbloyP>
        },
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
            let value = row.getValue('created_at')
            if (!value && row.getValue('job_slug') === "new") {
                value = "Draft"
            } else {
                value = cast_date_no_null(value)
            }
            return <EmbloyP className="text-xs" >{value}</EmbloyP>
        },
    },


]