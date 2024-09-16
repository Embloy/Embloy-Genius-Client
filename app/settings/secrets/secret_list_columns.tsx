"use client"
import {ColumnDef} from "@tanstack/react-table"
import {Checkbox} from "@/app/components/ui/misc/checkbox"
import {DataTableColumnHeader} from "@/app/components/dom/main/datatable/DataTableColumnHeader";
import {Secret} from "@/lib/types/secret";
import {cast_date} from "@/lib/utils/formats";
import { EmbloyH } from "@/app/components/ui/misc/stuff";
import { EmbloyP } from "@/app/components/ui/misc/text";

export const secretListColumns: ColumnDef<Secret>[] = [
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
        accessorKey: "active",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Status"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            if (row.getValue('expires_at') < new Date().toISOString()) {
                return (
                    <EmbloyH className="gap-1.5 items-center">
                        <div className="h-2 w-2 rounded-full bg-vesuvio dark:bg-vesuvio" />
                        <EmbloyP className="text-xs" >Expired</EmbloyP>
                    </EmbloyH>
                )
            } 
            if (row.getValue('active') === true) {
                return (
                    <EmbloyH className="gap-1.5 items-center">
                        <div className="h-2 w-2 rounded-full bg-lugana dark:bg-lugana" />
                        <EmbloyP className="text-xs" >Active</EmbloyP>
                    </EmbloyH>
                )
            } else {
                return (
                    <EmbloyH className="gap-1.5 items-center">
                        <div className="h-2 w-2 rounded-full bg-primitivo dark:bg-zinfandel" />
                        <EmbloyP className="text-xs" >Inactive</EmbloyP>
                    </EmbloyH>
                )
            }

        },
    },
    {
        accessorKey: "id",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Token ID"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            return <EmbloyP className="text-xs" >{row.getValue('id')}</EmbloyP>
        }
    },
    {
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Name"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            return <EmbloyP className="text-xs" >{row.getValue('name')}</EmbloyP>
        }
    },
    {
        accessorKey: "token_type",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Type"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            let tokenType: string = row.getValue('token_type');
            if (tokenType === "api_key") {
                tokenType = "API Key"
            } else if (tokenType === "refresh_token") {
                tokenType = "Refresh Token"
            } else if (tokenType === "access_token") {
                tokenType = "Access Token"
            } else if (tokenType === "client_token") {
                tokenType = "Client Token"
            } else if (tokenType === "request_token") {
                tokenType = "Request Token"
            }
          
            return <EmbloyP className="text-xs" >{tokenType}</EmbloyP>
                 
        },
    },
    {
        accessorKey: "issuer",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Issuer"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            let issuer: string = row.getValue('issuer');
            issuer = issuer.charAt(0).toUpperCase() + issuer.slice(1);  // Capitalize the first character
            return <EmbloyP className="text-xs" >{issuer}</EmbloyP>

        },
    },
    {
        accessorKey: "issued_at",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Added on"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            const date = cast_date(row.getValue('issued_at'), 'us')
            return <EmbloyP className="text-xs" >{date}</EmbloyP>
        },
    },
    {
        accessorKey: "expires_at",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Expires on"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            const date = cast_date(row.getValue('expires_at'), 'us')
            return <EmbloyP className="text-xs" >{date}</EmbloyP>
        },
    },
    {
        accessorKey: "last_used_at",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Last usage on"/>
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({row}) => {
            const date = cast_date(row.getValue('last_used_at'), 'us')
            return <EmbloyP className="text-xs" >{date}</EmbloyP>
        },
    },
]