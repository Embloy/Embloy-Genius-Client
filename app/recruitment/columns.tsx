"use client"
import { ColumnDef } from "@tanstack/react-table"
import * as inspector from "inspector";
import { ArrowUpDown,MoreHorizontal } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"

export type Jb = {
    id: number
    type: string
    start: string
    end: string
    status: "inactive" | "active"
    position: string
    salary: number
    currency: number
    address: string
    created_at: string
    view_count: number
    application_count: number
    notification_status: "inactive" | "active"
}

export type Job = {
    id: number
    position: string
    salary: number
    currency: number
}

export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: "position",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Position
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "salary",
        header: "Salary",
    },
    {
        accessorKey: "currency",
        header: "Currency",
        cell: ({row}) => {
            const currencies = {0:"EUR", 1:"CHF", 2:"USD"}
            let new_currency = row.getValue('currency')
            if (currencies[row.getValue('currency')] !== undefined) {
                new_currency = currencies[row.getValue('currency')]
            }
            return <div>{new_currency}</div>
        }
    },
    {
        id: 'actions',
        cell: ({row}) => {
            const job = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="outline-none">
                        <button className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" color="#384051" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(String(job.id))}
                        >
                            Copy Job ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>View job details</DropdownMenuItem>
                        <DropdownMenuItem>Share job</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]